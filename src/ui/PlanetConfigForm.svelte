<script lang="ts">
import { planetParams } from "@/state/planetParams.svelte";
  import { newPlanet } from "@/state/planetParams.svelte";
  import { sceneParams } from "@/state/sceneParams.svelte";
</script>

<div class="m-4 flex flex-col gap-2">
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

  <label class="label cursor-pointer">
    <span class="label-text">Radius</span>
    <input
      type="range"
      class="range w-full"
      min={1}
      max={50}
      value={planetParams.radius}
      onchange={(e) => (planetParams.radius = +(e.target as HTMLInputElement).value)}
    />
  </label>


  <label class="label cursor-pointer">
    <span class="label-text">Divisions</span>
    <input
      type="range"
      class="range w-full"
      min={10}
      max={50}
      value={planetParams.divisions}
      onchange={(e) => (planetParams.divisions = +(e.target as HTMLInputElement).value)}
    />
  </label>


</div>
