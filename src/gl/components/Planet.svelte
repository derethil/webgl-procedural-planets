<script lang="ts">
  import { mergeBufferGeometries } from "three/examples/jsm/utils/BufferGeometryUtils";
  import { tileAttributes } from "../../features/tiles/attributes";
  import { tileGeometry } from "../../features/tiles/geometry";
  import { Hexsphere } from "../../lib/Hexsphere";
  import { planetParams } from "../../stores/planetParams";
  import { T } from "@threlte/core";
  import type { Mesh, MeshStandardMaterial } from "three";

  $: hexsphere = new Hexsphere(
    $planetParams.radius,
    $planetParams.divisions,
    $planetParams.tileSize
  );

  $: tileGeometries = hexsphere.tiles.map((tile) => {
    const attributes = tileAttributes(tile);
    const geometry = tileGeometry(tile, attributes);
    return geometry;
  });

  $: planetGeometry = mergeBufferGeometries(tileGeometries);

  // Imperative Three.js code
  let material: MeshStandardMaterial;
  let mesh: Mesh;
  $: if (material) {
    material.flatShading = true;
  }
  $: if (mesh) {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
  }
</script>

<T.Mesh geometry={planetGeometry} bind:ref={mesh} castShadow receiveShadow>
  <T.MeshStandardMaterial bind:ref={material} vertexColors />
</T.Mesh>
