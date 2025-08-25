<script lang="ts">
  import { newPlanet } from "@/state/planetParams.svelte";
  import { sceneParams } from "@/state/sceneParams.svelte";
</script>

<div class="m-4">
  <div class="px-1 py-2">
    <button
      class="btn btn-ghost btn-outline btn-sm"
      onclick={() => newPlanet()}
    >
      Generate new planet
    </button>
  </div>

  <label class="label cursor-pointer">
    <span class="label-text">Autorotate</span>
    <input
      type="checkbox"
      class="toggle toggle-success"
      checked={sceneParams.autorotate}
      onclick={() => (sceneParams.autorotate = !sceneParams.autorotate)}
    />
  </label>
</div>
