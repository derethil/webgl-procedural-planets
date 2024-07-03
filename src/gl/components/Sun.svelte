<script lang="ts">
  import { T, useFrame } from "@threlte/core";
  import { DoubleSide, Vector3 } from "three";
  import { useTexture } from "@threlte/extras";
  import StarTexture from "../../assets/textures/star.png";

  const sunTexture = useTexture(StarTexture);

  const degreesPerSecond = 2.25;
  const radius = 32;

  let position = new Vector3(0, 0, radius);

  const rotateLightOneStep = (delta: number) => {
    const radiansPerSecond = (degreesPerSecond * Math.PI) / 180;
    const radiansToAdd = radiansPerSecond * delta;

    const radians = Math.atan2(position.x, position.z) + radiansToAdd;

    const x = radius * Math.sin(radians);
    const z = radius * Math.cos(radians);

    position = position.set(x, 0, z);
  };

  useFrame((_, delta) => rotateLightOneStep(delta));
</script>

<T.DirectionalLight
  color="#fcd29f"
  castShadow
  position={position.toArray()}
  intensity={1.5}
  shadow.mapSize={[4096, 4096]}
  shadow.camera.far={64}
  shadow.camera.near={0.1}
  shadow.camera.left={-32}
  shadow.camera.right={32}
  shadow.camera.top={32}
  shadow.camera.bottom={-32}
/>

{#await sunTexture then texture}
  <T.Mesh position={position.multiplyScalar(10).toArray()} lookAt={[0, 0, 0]}>
    <T.PlaneGeometry args={[24, 24]} />
    <T.MeshBasicMaterial side={DoubleSide} map={texture} transparent />
  </T.Mesh>
{/await}
