<script lang="ts">
  import { T,useThrelte } from "@threlte/core";
  import { Portal } from "@threlte/extras";
  import { DirectionalLight } from "three";

  const { scene } = useThrelte();

  interface Props {
    ref: DirectionalLight;
  }

  let { ref }: Props = $props();
</script>

<Portal object={scene}>
  <T.CameraHelper args={[ref.shadow.camera]} />
</Portal>
