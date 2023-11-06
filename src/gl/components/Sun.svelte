<script lang="ts">
  import { T, useFrame } from "@threlte/core";

  const degreesPerSecond = 2.25;
  const radius = 32;

  const position = [0, 0, radius];

  const rotateLightOneStep = (delta: number) => {
    const radiansPerSecond = (degreesPerSecond * Math.PI) / 180;
    const radiansToAdd = radiansPerSecond * delta;

    const radians = Math.atan2(position[0], position[2]) + radiansToAdd;

    const x = radius * Math.sin(radians);
    const z = radius * Math.cos(radians);

    position[0] = x;
    position[2] = z;
  };

  useFrame((_, delta) => rotateLightOneStep(delta));
</script>

<T.DirectionalLight
  castShadow
  {position}
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
