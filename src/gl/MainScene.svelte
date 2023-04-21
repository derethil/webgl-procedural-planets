<script>
  import { Canvas, T } from "@threlte/core";
  import { Hexsphere } from "../lib/Hexsphere";
  import { OrbitControls } from "@threlte/core";
  import Tile from "./components/Tile.svelte";

  const hexsphere = new Hexsphere(1, 10, 1);
</script>

<div class="h-full w-full">
  <Canvas>
    <T.PerspectiveCamera makeDefault position={[10, 10, 10]} fov={24}>
      <OrbitControls enableZoom={true} target={{ y: 0.5 }} />
    </T.PerspectiveCamera>

    <T.DirectionalLight castShadow position={[3, 10, 10]} />
    <T.DirectionalLight position={[-3, 10, -10]} intensity={0.2} />
    <T.AmbientLight intensity={0.2} />

    <!-- Tiles -->
    {#each hexsphere.tiles as tile}
      <Tile baseTile={tile} />
    {/each}
  </Canvas>
</div>
