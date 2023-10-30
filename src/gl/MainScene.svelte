<script lang="ts">
  import * as Three from "three";
  import { T, useThrelte } from "@threlte/core";
  import { OrbitControls, Portal } from "@threlte/extras";
  import Planet from "./components/Planet.svelte";

  const cameraDistance = 128;

  const { renderer, scene } = useThrelte();
  renderer.toneMapping = Three.ACESFilmicToneMapping;
  renderer.outputColorSpace = Three.SRGBColorSpace;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = Three.PCFSoftShadowMap;
</script>

<T.PerspectiveCamera
  makeDefault
  position={[cameraDistance, 0, 0]}
  target={[0, 0, 0]}
  fov={24}
>
  <OrbitControls enablePan={false} enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  position={[0, 0, 32]}
  color="#fcd29f"
  intensity={1.5}
  shadow.mapSize={[32, 32]}
  shadow.camera.far={64}
  shadow.camera.near={0.1}
  shadow.camera.left={-32}
  shadow.camera.right={32}
  shadow.camera.top={32}
  shadow.camera.bottom={-32}
  let:ref
>
  <Portal object={scene}>
    <T.CameraHelper args={[ref.shadow.camera]} />
  </Portal>
</T.DirectionalLight>
<T.AmbientLight intensity={0.05} />

<Planet />

<!-- <T.Mesh position={[0, 0, 0]} castShadow receiveShadow>
  <T.BoxGeometry args={[10, 10, 10]} />
  <T.MeshPhongMaterial color="#fcd29f" />
</T.Mesh>

<T.Mesh position={[0, 0, 16]} castShadow receiveShadow>
  <T.PlaneGeometry args={[16, 16, 16]} />
  <T.MeshPhongMaterial color="#fcd29f" side={Three.DoubleSide} />
</T.Mesh> -->
