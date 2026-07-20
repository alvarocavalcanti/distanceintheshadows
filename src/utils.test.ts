import { describe, it, expect, vi } from 'vitest';
import { updateAllDistanceItems, getSemiCircleCommands, PALETTES } from './utils';
import OBR from '@owlbear-rodeo/sdk';

// Mock OBR SDK
vi.mock('@owlbear-rodeo/sdk', () => ({
  default: {
    scene: {
      items: {
        updateItems: vi.fn(),
      }
    }
  },
}));

describe('Distance Utils', () => {
  it('contains expected predefined color palettes', () => {
    expect(PALETTES.gray).toBeDefined();
    expect(PALETTES.violet).toBeDefined();
    expect(PALETTES.emerald).toBeDefined();
    expect(PALETTES.ocean).toBeDefined();
    expect(PALETTES.amber).toBeDefined();

    expect(PALETTES.gray.colors.close).toBe('#4A5568');
  });

  it('generates correct commands for a semi circle', () => {
    const commands = getSemiCircleCommands(5, 4);
    // Move command
    expect(commands[0]).toEqual([0, -5, 0]);
    // It should end with close command
    expect(commands[commands.length - 1]).toEqual([5]);
  });

  it('calls OBR.scene.items.updateItems on updateAllDistanceItems', async () => {
    await updateAllDistanceItems('violet');
    expect(OBR.scene.items.updateItems).toHaveBeenCalled();
  });
});
