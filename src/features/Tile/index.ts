import type { Tile } from "@/lib/Hexsphere";
import { createInitialAttributes } from "./attributes";
import { createTileGeometry } from "./geometry";

export function createTile(tile: Tile) {
  const attributes = createInitialAttributes(tile);
  return createTileGeometry(tile, attributes);
}
