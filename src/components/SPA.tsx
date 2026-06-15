import { useEffect, useState } from "react";
import OBR from "@owlbear-rodeo/sdk";
import { setupContextMenu } from "../contextMenu";
import { useTheme } from "../hooks/useTheme";
import { ColorMode } from "../themes";
import { PALETTES, DISTANCE_METADATA_KEY, updateAllDistanceItems } from "../utils";

export default function SPA() {
  const [colorMode, setColorMode] = useState<ColorMode>('dark');
  // Initialize general theme sync (e.g. Dark Fantasy theme classes)
  useTheme(colorMode);
  
  const [activePalette, setActivePalette] = useState<string>(() => {
    return localStorage.getItem("sd-distances-palette") || "gray";
  });
  const [hasTemplates, setHasTemplates] = useState(false);

  const setTheme = (theme: string): void => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      setColorMode('dark');
    } else {
      root.classList.remove('dark');
      setColorMode('light');
    }
  };

  useEffect(() => {
    OBR.onReady(() => {
      // Sync theme with OBR
      OBR.theme.getTheme().then((theme) => {
        setTheme(theme.mode.toLowerCase());
      });
      OBR.theme.onChange((theme) => {
        setTheme(theme.mode.toLowerCase());
      });

      // Initialize token context menu
      setupContextMenu();

      // Check if scene already has active distance templates
      const checkTemplates = async () => {
        const items = await OBR.scene.items.getItems();
        const found = items.some(item => item.metadata[DISTANCE_METADATA_KEY] === true);
        setHasTemplates(found);
      };
      
      checkTemplates();
      
      // Update Clear Map button state dynamically on item additions/deletions
      return OBR.scene.items.onChange((items) => {
        setHasTemplates(items.some(item => item.metadata[DISTANCE_METADATA_KEY] === true));
      });
    });
  }, []);

  const handlePaletteSelect = async (paletteId: string) => {
    setActivePalette(paletteId);
    localStorage.setItem("sd-distances-palette", paletteId);
    await updateAllDistanceItems(paletteId);
  };

  const handleClearAll = async () => {
    const items = await OBR.scene.items.getItems();
    const toDelete = items
      .filter(item => item.metadata[DISTANCE_METADATA_KEY] === true)
      .map(item => item.id);
    
    if (toDelete.length > 0) {
      await OBR.scene.items.deleteItems(toDelete);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-theme-bg text-theme p-3 select-none overflow-hidden justify-between">
      <header className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-md font-bold leading-tight">SD Distances</h1>
          <p className="text-[10px] text-theme-secondary">Shadowdark RPG Measurement</p>
        </div>
        {hasTemplates && (
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 text-[10px] py-1 px-2 rounded bg-theme-danger/25 hover:bg-theme-danger/35 text-theme-danger transition-colors cursor-pointer border border-theme-danger/30 font-semibold"
            title="Clear all distance shapes from active scene"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9m2 2h2v1h-2V5m-3 3h2v10H8V8m4 0h2v10h-2V8m4 0h2v10h-2V8Z"/>
            </svg>
            Clear Map
          </button>
        )}
      </header>

      <div className="flex-1 overflow-y-auto space-y-1.5 pr-0.5">
        {Object.entries(PALETTES).map(([id, palette]) => {
          const isSelected = activePalette === id;
          return (
            <button
              key={id}
              onClick={() => handlePaletteSelect(id)}
              className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition-all duration-150 cursor-pointer ${
                isSelected
                  ? "bg-theme-primary/10 border-theme-primary shadow-sm"
                  : "bg-theme-card border-theme hover:border-theme-primary/40"
              }`}
            >
              <span className={`text-xs font-semibold ${isSelected ? "text-theme-primary" : "text-theme"}`}>
                {palette.name}
              </span>
              <div className="flex gap-1.5">
                {/* Close (inner) color circle */}
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
                  style={{ backgroundColor: palette.colors.close }}
                  title="Close (5ft)"
                />
                {/* Near (middle) color circle */}
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
                  style={{ backgroundColor: palette.colors.near }}
                  title="Near (30ft)"
                />
                {/* Far (outer) color circle */}
                <span
                  className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-sm"
                  style={{ backgroundColor: palette.colors.far }}
                  title="Far (+30ft)"
                />
              </div>
            </button>
          );
        })}
      </div>

      <footer className="mt-3 pt-2 border-t border-theme text-[9px] text-theme-secondary flex justify-between items-center">
        <span>Right-click a token to toggle distance</span>
        <a 
          href="https://github.com/alvarocavalcanti/distanceintheshadows" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:text-theme-primary hover:underline transition-colors"
        >
          v2026-06-15
        </a>
      </footer>
    </div>
  );
}
