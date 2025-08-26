import type { Tile } from "hexasphere";
import { Vector3 } from "three";
import { match, P } from "ts-pattern";
import { type Biome, BiomeColors, Biomes } from "@/features/Biomes";
import { getNoise } from "@/features/Noise";
import { type PlanetParams } from "@/state/planetParams.svelte";

const MINIMUM_DEPTH = 1;
export const OCEAN_DEPTH = 1.22;

// A tile may have attributes that are derived from its position
// on the planet.

function tileDepth(tile: Tile, planetParams: PlanetParams) {
  const position = new Vector3().copy(tile.centerPoint);
  const noise = getNoise(planetParams.seed, position, planetParams.noise);
  const depth = Math.max(noise + 1, MINIMUM_DEPTH);
  return Math.round(depth * 100) / 100;
}

function tileBiome(depth: number) {
  return match(depth)
    .with(P.number.lte(1.25), () => BiomeColors[Biomes.BarrenFlat])
    .with(P.number.between(1.25, 1.3), () => BiomeColors[Biomes.BarrenHill])
    .otherwise(() => BiomeColors[Biomes.BarrenMountain]);
}

export interface TileAttributes {
  depth: number;
  biome: Biome;
}

export function createTileAttributes(
  tile: Tile,
  params: PlanetParams,
): TileAttributes {
  const depth = tileDepth(tile, params);
  const biome = tileBiome(depth);
  return { depth, biome };
}
