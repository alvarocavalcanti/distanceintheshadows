# AGENTS.md

This file documents agentic modifications, tools, and developer interactions on this project.

## Agent Persona
*   **Agent**: Antigravity (Advanced Agentic Coding team, Google DeepMind)
*   **System Prompt Style**: Concise responses, strict Markdown format, file/symbol linking via `file://` scheme.

## Interaction Log

### 2026-06-15 — Repository Initialization & Setup
*   **Task**: Initialize a personal repository as a native Owlbear Rodeo extension for Shadowdark RPG distance measurements.
*   **Completed Work**:
    1.  Bootstrapped Vite + React + TypeScript + Tailwind CSS v4 environment matching other personal extensions in `../my-owlbear-extensions`.
    2.  Implemented [setupContextMenu](file:///Users/alvaro.cavalcanti/Projects/Personal/distanceintheshadows/src/contextMenu.ts#L5) to toggle distance templates on `CHARACTER`, `MOUNT`, and `PROP` layers.
    3.  Engineered a parent-child vector path attachment system to ensure synchronized rotation of nested zones (Close, Near, Far) while keeping only the Close area selectable.
    4.  Created [getSemiCircleCommands](file:///Users/alvaro.cavalcanti/Projects/Personal/distanceintheshadows/src/utils.ts#L61) and [getSemiRingCommands](file:///Users/alvaro.cavalcanti/Projects/Personal/distanceintheshadows/src/utils.ts#L78) to draw vector shapes natively, resolving CORS/image sandboxing issues in OBR.
    5.  Made template sizes scale proportionally based on the target token's scale.
    6.  Added color palette controls (5 options) with real-time updates for active scene templates.
    7.  Created documentation ([CLAUDE.md](file:///Users/alvaro.cavalcanti/Projects/Personal/distanceintheshadows/CLAUDE.md), [README.md](file:///Users/alvaro.cavalcanti/Projects/Personal/distanceintheshadows/README.md)).

## Architecture Summary
*   **Vector Engine**: Directly leverages `@owlbear-rodeo/sdk`'s `buildPath` instead of SVGs.
*   **Attachment Rules**: Close path is attached to the Token (inherits position). Near and Far paths are attached to the Close path (inherit position and rotation). Near/Far are configured with `disableHit(true)` to prevent accidental selection/movement.
*   **State**: LocalStorage tracks selected colors; OBR SDK handles live scene state.
