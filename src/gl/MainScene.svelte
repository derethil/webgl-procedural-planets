<script lang="ts">
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";

  import Planet from "./components/Planet.svelte";
  import Sun from "./components/Sun.svelte";
  import { useThrelteConfig } from "../features/threlteConfig";
  import { sceneParams } from "../stores/sceneParams";
  import { injectLookAtPlugin } from "./plugins/lookAt";

  useThrelteConfig();
  injectLookAtPlugin();
</script>

<T.PerspectiveCamera
  makeDefault
  position={[192, 0, 0]}
  target={[0, 0, 0]}
  fov={24}
>
  <OrbitControls
    enablePan={true}
    enableZoom={true}
    enableDamping
    autoRotate
    autoRotateSpeed={$sceneParams.autorotate ? 0.5 : 0}
  />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.05} />

<Sun />

<Planet />
