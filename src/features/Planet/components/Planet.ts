import type { IntersectionEvent } from "@threlte/extras";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Tile } from "@/features/Tile";
import { Hexsphere } from "@/lib/Hexsphere";

export class Planet {
  private sphere: Hexsphere;
  private tiles: Tile[];

  private faceToTileMap: Map<number, Tile> = new Map();

  public constructor(radius: number, divisions: number, tileSize: number) {
    this.sphere = new Hexsphere(radius, divisions, tileSize);
    this.tiles = this.sphere.tiles.map((tile) => new Tile(this, tile));

    this.cacheTilesByFace();
  }

  // Getters / Setters

  public get geometry() {
    return mergeGeometries(this.tiles.map((tile) => tile.geometry));
  }

  // Public Methods

  public handleClick(event: IntersectionEvent<MouseEvent>) {
    if (!event.faceIndex) return;
    this.faceToTileMap.get(event.faceIndex)?.handleClick();
    event.stopPropagation();
  }

  // Private Helpers

  private cacheTilesByFace() {
    let faceOffset = 0;

    this.tiles.forEach((tile) => {
      for (let i = 0; i < tile.faceCount; i++) {
        this.faceToTileMap.set(faceOffset + i, tile);
      }

      faceOffset += tile.faceCount;
    });
  }
}
