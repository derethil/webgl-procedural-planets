import { get } from "svelte/store";
import { Vector3 } from "three";
import { match, P } from "ts-pattern";
import { getNoise } from "@/features/Noise";
import type { Tile } from "@/lib/Hexsphere";
import { noiseParams } from "@/stores/noiseParams";
import {
  type NoiseParams,
  type PlanetParams,
  planetParams as planetParamsStore,
} from "@/stores/planetParams";
import { type Biome, BiomeColors, Biomes } from "@/util/biomes";

const MINIMUM_DEPTH = 1;
export const OCEAN_DEPTH = 1.22;

// A tile may have attributes that are derived from its position
// on the planet.

function tileDepth(
  tile: Tile,
  planetParams: PlanetParams,
  noiseParams: NoiseParams,
) {
  const position = new Vector3().copy(tile.centerPoint);
  const noise = getNoise(planetParams.seed, position, noiseParams);
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

export function createInitialAttributes(tile: Tile): TileAttributes {
  const $planetParams = get(planetParamsStore);
  const $noiseParams = get(noiseParams);
  const depth = tileDepth(tile, $planetParams, $noiseParams);
  const biome = tileBiome(depth);
  return { depth, biome };
}
