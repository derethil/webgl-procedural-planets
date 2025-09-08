<script lang="ts">
  import { T } from "@threlte/core";
  import { Instance, InstancedMesh } from "@threlte/extras";
  import { type Cell, CellGeometry } from "@/features/Cell";

  interface InstancedTilesProps {
    cells: Cell[];
    color: string;
  }

  const { cells, color }: InstancedTilesProps = $props();
</script>

{#if cells.length > 0}
  <InstancedMesh
    castShadow
    receiveShadow
  >
    <CellGeometry cell={cells[0]} />
    <T.MeshPhongMaterial flatShading />

    {#each cells as cell (cell.tile.toString())}
      <Instance
        {color}
        position={[cell.center.x, cell.center.y, cell.center.z]}
        rotation={cell.rotation}
      />
    {/each}
  </InstancedMesh>
{/if}
