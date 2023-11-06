<script lang="ts">
  import { T } from "@threlte/core";
  import { OrbitControls } from "@threlte/extras";

  import Planet from "./components/Planet.svelte";
  import Sun from "./components/Sun.svelte";
  import { useThrelteConfig } from "../features/threlteConfig";
  import { injectLookAtPlugin } from "./plugins/lookAt";

  useThrelteConfig();
  injectLookAtPlugin();
</script>

<T.PerspectiveCamera
  makeDefault
  position={[128, 0, 0]}
  target={[0, 0, 0]}
  fov={24}
>
  <OrbitControls enablePan={false} enableDamping />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.05} />

<Sun />

<Planet />
