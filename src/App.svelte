<script lang="ts">
  import { Canvas } from "@threlte/core";
  import { PlanetConfigForm } from "@/features/PlanetConfigForm";
  import { Scene } from "@/features/Scene";
</script>

<div class="h-screen">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<div class="absolute top-0 z-10">
  <PlanetConfigForm />
</div>
