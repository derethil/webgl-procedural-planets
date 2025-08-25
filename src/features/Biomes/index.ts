import { type ColorArray, hexToRGBFloatArray } from "@/gl/util";

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
