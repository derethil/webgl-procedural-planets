<script lang="ts">
  import InstancedCells from "./InstancedCells.svelte";
  import { Planet } from "./Planet.svelte";

  const planet = $derived(new Planet());
</script>

<InstancedCells cells={planet.pentagonalCells} color="yellow" />
<InstancedCells cells={planet.hexagonalCells} color="green" />
