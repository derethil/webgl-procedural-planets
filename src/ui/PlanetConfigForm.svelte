<script lang="ts">
  import { makeSeed } from "../util/seeds";
  import { planetParams } from "../stores/planetParams";

  function regenerate() {
    $planetParams.seed = makeSeed(20);
  }
</script>

<btn
  class="btn btn-ghost btn-outline btn-sm m-4"
  on:click={regenerate}
  on:keyup={regenerate}
  role="button"
  tabindex="0"
>
  Generate new planet
</btn>
