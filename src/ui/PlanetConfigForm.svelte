<script>
  import { makeSeed } from "../util/seeds";
  import { planetParams } from "../stores/planetParams";
  import ToggleScale from "./ToggleScale.svelte";

  function regenerate() {
    $planetParams.seed = makeSeed(20);
  }
</script>

<ToggleScale />
<btn
  class="btn btn-ghost btn-outline btn-sm"
  on:click={regenerate}
  on:keyup={regenerate}
>
  Regenerate
</btn>
