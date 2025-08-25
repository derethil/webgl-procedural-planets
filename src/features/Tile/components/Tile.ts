import type { BufferGeometry } from "three";
import type { Planet } from "@/features/Planet";
import type { Tile as HexTile } from "hexasphere";
import { createInitialAttributes, type TileAttributes } from "./attributes";
import { createTileGeometry } from "./geometry";

export class Tile {
  public readonly attributes: TileAttributes;
  public readonly geometry: BufferGeometry;

  public readonly faceCount: number;
  public readonly tile: HexTile;

  public constructor(_: Planet, tile: HexTile) {
    this.tile = tile;

    this.attributes = createInitialAttributes(tile);
    this.geometry = createTileGeometry(tile, this.attributes);

    this.faceCount = this.geometry.index ? this.geometry.index.count / 3 : 0;
  }

  public handleClick() {
    console.log(this.tile);
  }
}
