import OBR from "@owlbear-rodeo/sdk";

export const DISTANCE_METADATA_KEY = "es.memorablenaton.distanceintheshadows/distance-shape";

export interface PaletteColors {
  close: string;
  near: string;
  far: string;
}

export interface Palette {
  name: string;
  colors: PaletteColors;
}

export const PALETTES: Record<string, Palette> = {
  gray: {
    name: "Classic Gray",
    colors: {
      close: "#4A5568", // Dark slate
      near: "#718096",  // Medium gray
      far: "#CBD5E0",   // Light gray
    }
  },
  violet: {
    name: "Royal Violet",
    colors: {
      close: "#6D28D9", // Deep violet
      near: "#8B5CF6",  // Vibrant purple
      far: "#C4B5FD",   // Light lavender
    }
  },
  emerald: {
    name: "Emerald Forest",
    colors: {
      close: "#047857", // Forest green
      near: "#10B981",  // Bright emerald
      far: "#A7F3D0",   // Mint
    }
  },
  ocean: {
    name: "Ocean Blue",
    colors: {
      close: "#1D4ED8", // Deep blue
      near: "#3B82F6",  // Sky blue
      far: "#93C5FD",   // Ice blue
    }
  },
  amber: {
    name: "Fiery Amber",
    colors: {
      close: "#B91C1C", // Deep crimson
      near: "#F59E0B",  // Warm amber
      far: "#FDE047",   // Soft yellow
    }
  }
};

/**
 * Generates path commands for a semi-circle of the given radius in the upper half (y <= 0)
 */
export function getSemiCircleCommands(radius: number, segments: number = 30): any[] {
  const commands: any[] = [];
  // Move to start of arc: (-radius, 0)
  commands.push([0, -radius, 0]); // Command.MOVE is 0
  
  // Draw the arc
  for (let i = 1; i <= segments; i++) {
    const theta = Math.PI + (i / segments) * Math.PI; // from PI to 2*PI
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    commands.push([1, x, y]); // Command.LINE is 1
  }
  
  commands.push([5]); // Command.CLOSE is 5
  return commands;
}

/**
 * Generates path commands for a semi-ring in the upper half (y <= 0)
 */
export function getSemiRingCommands(innerRadius: number, outerRadius: number, segments: number = 30): any[] {
  const commands: any[] = [];
  // Move to start of outer arc: (-outerRadius, 0)
  commands.push([0, -outerRadius, 0]);
  
  // Draw outer arc
  for (let i = 1; i <= segments; i++) {
    const theta = Math.PI + (i / segments) * Math.PI;
    const x = outerRadius * Math.cos(theta);
    const y = outerRadius * Math.sin(theta);
    commands.push([1, x, y]);
  }
  
  // Line to start of inner arc
  commands.push([1, innerRadius, 0]);
  
  // Draw inner arc in reverse (from 2*PI down to PI)
  for (let i = 1; i <= segments; i++) {
    const theta = 2 * Math.PI - (i / segments) * Math.PI;
    const x = innerRadius * Math.cos(theta);
    const y = innerRadius * Math.sin(theta);
    commands.push([1, x, y]);
  }
  
  commands.push([5]);
  return commands;
}

/**
 * Updates all active distance template items on the scene with the new palette colors
 */
export async function updateAllDistanceItems(paletteId: string) {
  const palette = PALETTES[paletteId] || PALETTES.gray;

  await OBR.scene.items.updateItems(
    (item) => item.metadata[DISTANCE_METADATA_KEY] !== undefined,
    (items) => {
      for (const item of items) {
        const role = item.metadata[DISTANCE_METADATA_KEY];
        const pathItem = item as any;
        if (pathItem.type === "PATH" && pathItem.style) {
          if (role === "close") {
            pathItem.style.fillColor = palette.colors.close;
            pathItem.style.strokeColor = palette.colors.close;
          } else if (role === "near") {
            pathItem.style.fillColor = palette.colors.near;
            pathItem.style.strokeColor = palette.colors.near;
          } else if (role === "far") {
            pathItem.style.fillColor = palette.colors.far;
            pathItem.style.strokeColor = palette.colors.far;
          }
        }
      }
    }
  );
}
