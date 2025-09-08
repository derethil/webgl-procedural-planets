import { type ColorArray, hexToColorArray } from "./util/color";

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
  [Biomes.Ocean]: { color: hexToColorArray("#4287f5") },
  [Biomes.BarrenFlat]: { color: hexToColorArray("#8b7355") },
  [Biomes.BarrenHill]: { color: hexToColorArray("#9d8566") },
  [Biomes.BarrenMountain]: { color: hexToColorArray("#6b5d45") },
  [Biomes.Sand]: { color: hexToColorArray("#feffae") },
  [Biomes.Grass]: { color: hexToColorArray("#31703a") },
  [Biomes.Stone]: { color: hexToColorArray("#83819c") },
  [Biomes.Snow]: { color: hexToColorArray("#ffffff") },
};
