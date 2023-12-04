<script lang="ts">
  import { makeSeed } from "../util/seeds";
  import { planetParams } from "../stores/planetParams";
  import { sceneParams } from "../stores/sceneParams";

  function regenerate() {
    $planetParams.seed = makeSeed(20);
  }
</script>

<div class="m-4">
  <div class="px-1 py-2">
    <btn
      class="btn btn-ghost btn-outline btn-sm"
      on:click={regenerate}
      on:keyup={regenerate}
      role="button"
      tabindex="0"
    >
      Generate new planet
    </btn>
  </div>

  <label class="label cursor-pointer">
    <span class="label-text">Autorotate</span>
    <input
      type="checkbox"
      class="toggle toggle-success"
      checked={$sceneParams.autorotate}
      on:click={() => ($sceneParams.autorotate = !$sceneParams.autorotate)}
    />
  </label>
</div>
