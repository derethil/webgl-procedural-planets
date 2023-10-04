<script lang="ts">
  import * as Three from "three";
  import { T, useThrelte } from "@threlte/core";
  import { OrbitControls, Suspense, TransformControls } from "@threlte/extras";
  import Planet from "./components/Planet.svelte";

  const cameraDistance = 128;

  const { renderer } = useThrelte();
  renderer.toneMapping = Three.ACESFilmicToneMapping;
  renderer.outputColorSpace = Three.SRGBColorSpace;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = Three.PCFSoftShadowMap;
</script>

<T.PerspectiveCamera makeDefault position={[cameraDistance, 0, 0]} fov={24}>
  <OrbitControls enablePan={false} enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow={true}
  position={[0, 1, 1]}
  color="#fcd29f"
  intensity={3}
  shadow.mapSize={[2048, 2048]}
  shadow.camera.far={512}
  shadow.camera.near={0.1}
  shadow.camera.left={-500}
  shadow.camera.right={500}
  shadow.camera.top={500}
  shadow.camera.bottom={-500}
/>
<T.AmbientLight intensity={0.025} />

<Planet />
