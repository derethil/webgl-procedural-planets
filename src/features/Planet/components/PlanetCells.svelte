<script lang="ts">
  import Cells from "./Cells.svelte";
  import { Planet } from "./Planet.svelte";

  const planet = $derived(new Planet());
</script>

<Cells cells={planet.pentagonalCells} />
<Cells cells={planet.hexagonalCells} />
