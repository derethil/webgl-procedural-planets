<script lang="ts">
  import { useThrelte, T } from "@threlte/core";
  import { Portal } from "@threlte/extras";
  import { DirectionalLight } from "three";

  const { scene } = useThrelte();

  export let ref: DirectionalLight;
</script>

<Portal object={scene}>
  <T.CameraHelper args={[ref.shadow.camera]} />
</Portal>
