import OBR, { buildPath, Item } from "@owlbear-rodeo/sdk";
import { ID } from "./main";
import { 
  DISTANCE_METADATA_KEY, 
  PALETTES, 
  getSemiCircleCommands, 
  getSemiRingCommands 
} from "./utils";

export function setupContextMenu() {
  OBR.contextMenu.create({
    id: `${ID}/context-menu-sd-distances`,
    icons: [
      {
        icon: `${window.location.origin}/img/icon.svg`,
        label: "SD Distances",
        filter: {
          every: [
            { key: "layer", value: "CHARACTER", coordinator: "||" },
            { key: "layer", value: "MOUNT", coordinator: "||" },
            { key: "layer", value: "PROP" }
          ],
        },
      },
    ],
    async onClick(context) {
      const tokens = context.items;
      if (tokens.length === 0) return;

      const allItems = await OBR.scene.items.getItems();
      const dpi = await OBR.scene.grid.getDpi();

      // Get current palette from localStorage or default to gray
      const activePaletteId = localStorage.getItem("sd-distances-palette") || "gray";
      const palette = PALETTES[activePaletteId] || PALETTES.gray;

      const itemsToAdd: Item[] = [];
      const itemIdsToDelete: string[] = [];

      for (const token of tokens) {
        // Find if this token already has an attached close distance shape
        const existingClose = allItems.find(
          (item) => item.attachedTo === token.id && item.metadata[DISTANCE_METADATA_KEY] === "close"
        );

        if (existingClose) {
          // Collect the close template and any attachments (near/far shapes)
          const related = allItems.filter(
            (item) => item.attachedTo === existingClose.id || item.id === existingClose.id
          );
          itemIdsToDelete.push(...related.map(item => item.id));
        } else {
          // Calculate Close, Near, Far radii using token size as 5ft reference
          const tokenWidth = token.scale.x * dpi;
          const rClose = tokenWidth;
          const rNear = tokenWidth * 6;
          const rFar = tokenWidth * 7;
          // Generate unique ID for the close shape
          const closeId = `${ID}/close-${token.id}-${Date.now()}`;
          const opacity = 0.35;

          // 1. Close Area (semi-circle) - Selectable parent
          const closeItem = buildPath()
            .commands(getSemiCircleCommands(rClose))
            .fillColor(palette.colors.close)
            .fillOpacity(opacity)
            .strokeColor(palette.colors.close)
            .strokeWidth(1.5)
            .strokeOpacity(opacity * 1.5)
            .name("SD Distances - Close")
            .metadata({ [DISTANCE_METADATA_KEY]: "close" })
            .attachedTo(token.id)
            .position(token.position)
            .rotation(token.rotation)
            .layer("ATTACHMENT")
            .disableAttachmentBehavior(["SCALE"])
            .disableHit(false) // Selectable!
            .id(closeId)
            .build();

          // 2. Near Area (semi-ring) - Attached to Close Area, Non-selectable
          const nearItem = buildPath()
            .commands(getSemiRingCommands(rClose, rNear))
            .fillColor(palette.colors.near)
            .fillOpacity(opacity * 0.9)
            .strokeColor(palette.colors.near)
            .strokeWidth(1.5)
            .strokeOpacity(opacity * 1.7)
            .name("SD Distances - Near")
            .metadata({ [DISTANCE_METADATA_KEY]: "near" })
            .attachedTo(closeId)
            .position(token.position)
            .rotation(token.rotation)
            .layer("ATTACHMENT")
            .disableAttachmentBehavior(["SCALE"])
            .disableHit(true) // Non-selectable!
            .build();

          // 3. Far Area (semi-ring) - Attached to Close Area, Non-selectable
          const farItem = buildPath()
            .commands(getSemiRingCommands(rNear, rFar))
            .fillColor(palette.colors.far)
            .fillOpacity(opacity * 0.7)
            .strokeColor(palette.colors.far)
            .strokeWidth(1.5)
            .strokeOpacity(opacity * 1.5)
            .name("SD Distances - Far")
            .metadata({ [DISTANCE_METADATA_KEY]: "far" })
            .attachedTo(closeId)
            .position(token.position)
            .rotation(token.rotation)
            .layer("ATTACHMENT")
            .disableAttachmentBehavior(["SCALE"])
            .disableHit(true) // Non-selectable!
            .build();

          itemsToAdd.push(closeItem, nearItem, farItem);
        }
      }

      if (itemIdsToDelete.length > 0) {
        await OBR.scene.items.deleteItems(itemIdsToDelete);
      }
      if (itemsToAdd.length > 0) {
        await OBR.scene.items.addItems(itemsToAdd);
      }
    },
  });
}
