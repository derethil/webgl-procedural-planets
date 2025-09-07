import type { Tile as HexTile } from "hexasphere";
import { calculateSurfaceNormal } from "hexasphere/dist/tile";
import { Euler, Matrix4, Vector3 } from "three";

export class Cell {
  public readonly tile: HexTile;
  public readonly pentagon: boolean = false;

  public constructor(tile: HexTile) {
    this.tile = tile;
    this.pentagon = tile.boundary.length === 5;
  }

  public get center(): [number, number, number] {
    let x = 0, y = 0, z = 0;
    const count = this.tile.boundary.length;

    this.tile.boundary.forEach((vertex) => {
      x += vertex.x;
      y += vertex.y;
      z += vertex.z;
    });

    return [x / count, y / count, z / count];
  }

  public get position(): [number, number, number] {
    return this.center;
  }

  public get rotation(): [number, number, number] {
    const boundary = this.tile.boundary;
    const normal = calculateSurfaceNormal(
      boundary[0],
      boundary[1],
      boundary[2],
    );

    const matrix = new Matrix4();
    const center = new Vector3(...this.center);
    const surfaceVector = new Vector3(normal.x, normal.y, normal.z);
    const target = center.clone().add(surfaceVector);

    matrix.lookAt(center, target, new Vector3(0, 1, 0));

    const euler = new Euler();
    euler.setFromRotationMatrix(matrix);

    return [euler.x, euler.y, euler.z];
  }
}
