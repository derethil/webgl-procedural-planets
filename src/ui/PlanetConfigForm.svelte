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
    <button
      class="btn btn-ghost btn-outline btn-sm"
      onclick={regenerate}
      onkeyup={regenerate}
    >
      Generate new planet
    </button>
  </div>

  <label class="label cursor-pointer">
    <span class="label-text">Autorotate</span>
    <input
      type="checkbox"
      class="toggle toggle-success"
      checked={$sceneParams.autorotate}
      onclick={() => ($sceneParams.autorotate = !$sceneParams.autorotate)}
    />
  </label>
</div>
