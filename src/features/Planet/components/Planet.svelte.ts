import { Hexasphere } from "hexasphere";
import { Cell } from "@/features/Cell/components/Cell";
import { planetParams } from "@/state/planetParams.svelte";

export class Planet {
  public readonly sphere = this.constructSphere();

  public hexagonalCells: Cell[] = [];
  public pentagonalCells: Cell[] = [];

  public constructor() {
    this.sphere.tiles.forEach((tile) => {
      const hexagonal = tile.boundary?.length === 6;
      const tileList = hexagonal ? this.hexagonalCells : this.pentagonalCells;
      tileList.push(new Cell(tile));
    });
  }

  private constructSphere() {
    return new Hexasphere(
      planetParams.radius,
      planetParams.divisions,
      planetParams.tileSize,
    );
  }
}
