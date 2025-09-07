<script lang="ts">
  import { T } from "@threlte/core";
  import { Planet } from "@/features/Planet/components/PlanetNew.svelte";
  import InstancedCells from "@/features/Tile/components/InstancedCells.svelte";
  import SingleTileTest from "@/features/Tile/components/SingleTileTest.svelte";
  import TileDebugFlat from "@/features/Tile/components/TileDebugFlat.svelte";

  const planet = $derived(new Planet());
</script>

<InstancedCells cells={planet.pentagonalCells} color="yellow" />
<InstancedCells cells={planet.hexagonalCells} color="green" />

<T.AxesHelper args={[2]} />
