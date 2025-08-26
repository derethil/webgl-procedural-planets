import type { Tile as HexTile } from "hexasphere";
import type { Planet } from "@/features/Planet";

export class Tile {
  public readonly tile: HexTile;
  public readonly faceCount: number;

  public constructor(_: Planet, tile: HexTile, faceCount: number) {
    this.tile = tile;
    this.faceCount = faceCount;
  }

  public handleClick() {
    console.log(this.tile);
  }
}
