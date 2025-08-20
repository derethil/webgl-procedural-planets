<script lang="ts">
  import { Canvas } from "@threlte/core";
  import MainScene from "./gl/MainScene.svelte";
  import PlanetConfigForm from "./ui/PlanetConfigForm.svelte";
</script>

<div class="h-screen">
  <Canvas>
    <MainScene />
  </Canvas>
</div>

<div class="absolute top-0 z-10">
  <PlanetConfigForm />
</div>
