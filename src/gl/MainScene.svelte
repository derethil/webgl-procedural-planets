<script>
  import { Canvas, T } from "@threlte/core";
  import { Hexsphere } from "../lib/Hexsphere";
  import { OrbitControls } from "@threlte/core";
  import Tile from "./components/Tile.svelte";
  import { planetParams } from "../stores/planetParams";

  $: hexsphere = new Hexsphere(
    $planetParams.radius,
    $planetParams.divisions,
    $planetParams.tileSize
  );

  $: console.log($planetParams.noise.frequency);

  const cameraDistance = 256;
</script>

<div class="h-full w-full">
  <Canvas>
    <T.PerspectiveCamera makeDefault position={[cameraDistance, 0, 0]} fov={24}>
      <OrbitControls enableZoom={true} target={{ y: 0.5 }} />
    </T.PerspectiveCamera>

    <T.DirectionalLight castShadow position={[3, 10, 10]} />
    <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
    <T.AmbientLight intensity={0.2} />

    <!-- Tiles -->
    {#each hexsphere.tiles as tile}
      <Tile baseTile={tile} />
    {/each}

    <!-- <Tile baseTile={hexsphere.tiles[0]} /> -->
  </Canvas>
</div>
