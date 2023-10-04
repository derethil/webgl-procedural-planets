<script lang="ts">
  import { Canvas, T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";
  import Planet from "./components/Planet.svelte";

  const cameraDistance = 128;
</script>

<div class="h-full w-full">
  <Canvas>
    <T.PerspectiveCamera makeDefault position={[cameraDistance, 0, 0]} fov={24}>
      <OrbitControls enablePan={false} enableDamping />
    </T.PerspectiveCamera>

    <T.DirectionalLight
      castShadow={true}
      position={[0, 1, 1]}
      color="#fcd29f"
      intensity={3}
      shadow.mapSize={[2048, 2048]}
      shadow.camera.far={100}
      shadow.camera.near={0.1}
      shadow.camera.left={-50}
      shadow.camera.right={50}
      shadow.camera.top={50}
      shadow.camera.bottom={-50}
    />
    <T.AmbientLight intensity={0.025} />

    <Planet />
  </Canvas>
</div>
