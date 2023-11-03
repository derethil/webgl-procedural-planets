<script lang="ts">
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";

  import Planet from "./components/Planet.svelte";
  import { useThrelteConfig } from "../features/threlteConfig";

  useThrelteConfig();
</script>

<T.PerspectiveCamera
  makeDefault
  position={[128, 0, 0]}
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
/>
<T.AmbientLight intensity={0.05} />

<Planet />
