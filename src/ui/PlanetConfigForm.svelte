<script lang="ts">
  import { Checkbox, Slider } from "@/components";
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

  <Checkbox
    label="Autorotate"
    checked={sceneParams.autorotate}
    onchange={(value) => (sceneParams.autorotate = value)}
  />

  <Slider
    label="Radius"
    min={1}
    max={50}
    value={planetParams.radius}
    onchange={(value) => (planetParams.radius = value)}
  />

  <Slider
    label="Divisions"
    min={2}
    max={50}
    value={planetParams.divisions}
    onchange={(value) => (planetParams.divisions = value)}
  />

  <Slider
    label="tileSize"
    min={0}
    max={1}
    step={0.1}
    value={planetParams.tileSize}
    onchange={(value) => (planetParams.tileSize = value)}
  />
</div>
