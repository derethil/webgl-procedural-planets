<script lang="ts">
  import { T } from "@threlte/core";
  import type { Cell } from "@/features/Cell";
  import { CellGeometry } from "@/features/Cell";

  interface CellsProps {
    cells: Cell[];
  }

  const { cells }: CellsProps = $props();

  console.log(cells.length);
</script>

{#each cells as cell (cell.tile.toString())}
  <T.Mesh
    castShadow
    receiveShadow
    onpointerenter={() => cell.handlePointerEnter()}
    onpointerleave={() => cell.handlePointerLeave()}
  >
    <CellGeometry {cell} />
    <T.MeshPhongMaterial flatShading color={cell.color} />
  </T.Mesh>
{/each}
