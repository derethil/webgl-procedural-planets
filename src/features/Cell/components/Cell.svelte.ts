import type { Tile as HexTile } from "hexasphere";
import { cubicOut } from "svelte/easing";
import { Tween } from "svelte/motion";
import { Color, Vector3 } from "three";
import { memo } from "../util/memo";

export class Cell {
  public readonly tile: HexTile;
  public readonly pentagon: boolean = false;

  private readonly tween = new Tween(0, { easing: cubicOut, duration: 250 });

  private startColor = new Color("blue");
  private endColor = new Color("yellow");

  public readonly color = $derived(
    this.startColor.clone().lerp(this.endColor, this.tween.current),
  );

  public handlePointerEnter() {
    this.tween.set(1);
  }

  public handlePointerLeave() {
    this.tween.set(0);
  }

  public constructor(tile: HexTile) {
    this.tile = tile;
    this.pentagon = tile.boundary.length === 5;
  }

  @memo
  public get center(): Vector3 {
    const center = new Vector3();
    const count = this.tile.boundary.length;

    this.tile.boundary.forEach((vertex) => {
      center.add(new Vector3(vertex.x, vertex.y, vertex.z));
    });

    return center.divideScalar(count);
  }

}
