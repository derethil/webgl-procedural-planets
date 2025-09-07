<script lang="ts">
  import { T } from "@threlte/core";
  import { Planet } from "@/features/Planet/components/PlanetNew.svelte";
  import FlatTileGeometry from "./FlatTileGeometry.svelte";

  const planet = $derived(new Planet());
</script>

<!-- Show all pentagon tiles as flat surfaces -->
{#each planet.pentagonalCells as cell (cell.tile.toString())}
  <T.Mesh>
    <FlatTileGeometry {cell} />
    <T.MeshPhongMaterial color="yellow" flatShading />
  </T.Mesh>

  <!-- Show center point -->
  <T.Mesh
    position={cell.center}
  >
    <T.SphereGeometry args={[0.1]} />
    <T.MeshBasicMaterial color="red" />
  </T.Mesh>
{/each}

<!-- Show all hexagon tiles as flat surfaces -->
{#each planet.hexagonalCells as cell (cell.tile.toString())}
  <T.Mesh>
    <FlatTileGeometry {cell} />
    <T.MeshPhongMaterial color="green" flatShading />
  </T.Mesh>

  <!-- Show center point -->
  <T.Mesh position={cell.center}>
    <T.SphereGeometry args={[0.1]} />
    <T.MeshBasicMaterial color="red" />
  </T.Mesh>
{/each}
