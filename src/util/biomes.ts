export type ColorArray = [number, number, number];

function hexToRGB(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)!;
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}

function hexToRGBFloatArray(hex: string): ColorArray {
  const rgb = hexToRGB(hex);
  return [rgb.r / 255, rgb.g / 255, rgb.b / 255];
}

// Convert colors to an array of floats. This transformation is necessary
// because BufferGeometry expects this format for colors, but it's easier
// to work with hex colors in the code.

export interface Biome {
  color: ColorArray;
}

export enum Biomes {
  Ocean = "Ocean",
  BarrenFlat = "BarrenFlat",
  BarrenHill = "BarrenHill",
  BarrenMountain = "BarrenMountain",
  Sand = "Sand",
  Grass = "Grass",
  Stone = "Stone",
  Snow = "Snow",
}

export const BiomeColors: Record<Biomes, Biome> = {
  [Biomes.Ocean]: { color: hexToRGBFloatArray("#4287f5") },
  [Biomes.BarrenFlat]: { color: hexToRGBFloatArray("#8b7355") },
  [Biomes.BarrenHill]: { color: hexToRGBFloatArray("#9d8566") },
  [Biomes.BarrenMountain]: { color: hexToRGBFloatArray("#6b5d45") },
  [Biomes.Sand]: { color: hexToRGBFloatArray("#feffae") },
  [Biomes.Grass]: { color: hexToRGBFloatArray("#31703a") },
  [Biomes.Stone]: { color: hexToRGBFloatArray("#83819c") },
  [Biomes.Snow]: { color: hexToRGBFloatArray("#ffffff") },
};
