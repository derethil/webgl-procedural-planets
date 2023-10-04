import type { Tile } from "../../lib/Hexsphere";
import { planetParams as planetParamsStore } from "../../stores/planetParams";
import { noiseParams } from "../../stores/noiseParams";
import { get } from "svelte/store";
import type { TileAttributes } from "../../lib/dto/tileAttributes";
import { getNoise } from "../noise";
import { P, match } from "ts-pattern";
import { Biomes } from "../../util/biomes";

const $planetParams = get(planetParamsStore);
const $noiseParams = get(noiseParams);

const MINIMUM_DEPTH = 1.22;

// A tile may have attributes that are derived from its position
// on the planet.

function tileDepth(tile: Tile) {
  const position = tile.centerPoint;
  const noise = getNoise($planetParams.seed, position, $noiseParams);
  const depth = Math.max(noise + 1, MINIMUM_DEPTH);
  return Math.round(depth * 100) / 100;
}

function tileBiome(depth: number) {
  return match(depth)
    .with(P.number.lte(MINIMUM_DEPTH), () => Biomes.Ocean)
    .with(P.number.between(MINIMUM_DEPTH, 1.25), () => Biomes.Sand)
    .with(P.number.between(1.25, 1.3), () => Biomes.Grass)
    .with(P.number.between(1.3, 1.35), () => Biomes.Stone)
    .otherwise(() => Biomes.Snow);
}

export function tileAttributes(tile: Tile): TileAttributes {
  const depth = tileDepth(tile);
  const biome = tileBiome(depth);
  return { depth, biome };
}
