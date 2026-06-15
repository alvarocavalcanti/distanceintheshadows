# CLAUDE.md

This file provides guidance when working with code in this repository.

## Development Commands

All commands are run from the root directory:

```bash
npm install      # Install dependencies
npm run dev      # Start Vite development server
npm run build    # Compile TypeScript and build for production
npm run preview  # Preview the production build locally
```

Verify that all builds pass with no TypeScript compilation errors before committing.

## Project Architecture

This is an Owlbear Rodeo extension for measuring Close, Near, and Far distances for Shadowdark RPG.

### Lifecycle & Modes

- **Plugin Mode**: Triggered when `?obrref` is in the URL. Renders through `<PluginGate>` -> `<App>` -> `<SPA>`.
- **Homepage Mode**: Triggered without `?obrref`. Renders `<Homepage>` (static guide and manifest info).

### Technical Integration Decisions

1. **Single-Item Measurements**:
   To ensure that the Close, Near, and Far areas rotate and move together as a single unit without getting misaligned, they are combined into a single SVG and added as an `Image` item attached to the parent token.
   - Bounding box is centered on the token `(0, 0)`.
   - The bottom half of the SVG is transparent so that rotation occurs cleanly around the token's center.
   - Scale inheritance is disabled so that templates remain at their true grid scale when character tokens are scaled.
2. **CORS-safe Vector Templates**:
   SVGs are encoded as Data URIs (`data:image/svg+xml;...`) and updated dynamically via `OBR.scene.items.updateItems` when the user selects a different color palette.
3. **No Global State**:
   Matches the local-first state patterns of other extensions, using `OBR.scene.items.onChange` and `OBR.theme.onChange` to keep the UI in sync.

## Versioning

Uses date-based versioning (`YYYY-MM-DD`). Make sure to update the version in:
1. `package.json`
2. `public/manifest.json`
