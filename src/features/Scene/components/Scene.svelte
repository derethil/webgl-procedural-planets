<script lang="ts">
  import { T } from "@threlte/core";
  import { interactivity, OrbitControls } from "@threlte/extras";
  import { Planet } from "@/features/Planet";
  import { Sun } from "@/features/Sun";
  import { sceneParams } from "@/state/sceneParams.svelte";
  import { useThrelteConfig } from "../hooks/useThrelteConfig";
  import { injectLookAtPlugin } from "../plugins/lookAt";

  useThrelteConfig();
  injectLookAtPlugin();
  interactivity();
</script>

<T.PerspectiveCamera
  makeDefault
  position={[192, 0, 0]}
  target={[0, 0, 0]}
  fov={24}
>
  <OrbitControls
    enablePan={false}
    enableZoom={true}
    enableDamping
    autoRotate
    autoRotateSpeed={sceneParams.autorotate ? 0.5 : 0}
  />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.2} />

<Sun />

<Planet />
