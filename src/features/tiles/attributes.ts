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

// A tile may have attributes that are derived from its position
// on the planet.

function tileDepth(tile: Tile) {
  const position = tile.centerPoint;
  const noise = getNoise($planetParams.seed, position, $noiseParams);
  return Math.max(noise, 0.23) + 1;
}

function tileBiome(depth: number) {
  return match(depth)
    .with(P.number.lte(1.23), () => Biomes.Ocean)
    .with(P.number.between(1.23, 1.25), () => Biomes.Sand)
    .with(P.number.between(1.25, 1.3), () => Biomes.Grass)
    .with(P.number.between(1.3, 1.35), () => Biomes.Stone)
    .otherwise(() => Biomes.Snow);
}

export function tileAttributes(tile: Tile): TileAttributes {
  const depth = tileDepth(tile);
  const biome = tileBiome(depth);
  return { depth, biome };
}
