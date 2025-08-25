<script lang="ts">
  import { T } from "@threlte/core";
  import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
  import { createTile } from "@/features/Tile";
  import { Hexsphere } from "@/lib/Hexsphere";
  import { planetParams } from "@/stores/planetParams";

  const hexsphere = $derived(
    new Hexsphere(
      $planetParams.radius,
      $planetParams.divisions,
      $planetParams.tileSize,
    ),
  );

  const tileGeometries = $derived(hexsphere.tiles.map(createTile));
  const planetGeometry = $derived(mergeGeometries(tileGeometries));
</script>

<T.Mesh geometry={planetGeometry} castShadow receiveShadow>
  <T.MeshPhongMaterial vertexColors flatShading />
</T.Mesh>
