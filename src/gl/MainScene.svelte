<script>
  import { Canvas, T } from "@threlte/core";
  import { OrbitControls } from "@threlte/core";
  import Planet from "./components/Planet.svelte";

  const cameraDistance = 256;
</script>

<div class="h-full w-full">
  <Canvas>
    <T.PerspectiveCamera makeDefault position={[cameraDistance, 0, 0]} fov={24}>
      <OrbitControls target={{ y: 0.5 }} enablePan={false} enableDamping />
    </T.PerspectiveCamera>

    <T.DirectionalLight
      castShadow
      position={[0, 512, 512]}
      color="#fcd29f"
      intensity={0.5}
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
