import type { Tile as HexTile } from "hexasphere";
import { calculateSurfaceNormal } from "hexasphere/dist/tile";
import { cubicOut } from "svelte/easing";
import { Tween } from "svelte/motion";
import { Color, Euler, Matrix4, Vector3 } from "three";
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
    console.log("enter");
    this.tween.set(1);
  }

  public handlePointerLeave() {
    console.log("leave");
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

  @memo
  public get up() {
    const vertex = this.tile.boundary[0];
    const center = new Vector3(...this.center);
    return new Vector3(
      vertex.x - center.x,
      vertex.y - center.y,
      vertex.z - center.z,
    ).normalize();
  }

  @memo
  public get normal() {
    const boundary = this.tile.boundary;

    const normal = calculateSurfaceNormal(
      boundary[0],
      boundary[1],
      boundary[2],
    );

    return new Vector3(normal.x, normal.y, normal.z).normalize();
  }

  @memo
  public get matrix() {
    const matrix = new Matrix4();
    const target = this.center.clone().add(this.normal);
    matrix.lookAt(this.center, target, this.up);
    return matrix;
  }

  @memo
  public get rotation(): [number, number, number] {
    const euler = new Euler();
    euler.setFromRotationMatrix(this.matrix);

    return [euler.x, euler.y, euler.z];
  }
}
