<script lang="ts">
  import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
  import { tileAttributes } from "../../features/tiles/attributes";
  import { tileGeometry } from "../../features/tiles/geometry";
  import { Hexsphere } from "../../lib/Hexsphere";
  import { planetParams } from "../../stores/planetParams";
  import { T } from "@threlte/core";

  $: hexsphere = new Hexsphere(
    $planetParams.radius,
    $planetParams.divisions,
    $planetParams.tileSize,
  );

  $: tileGeometries = hexsphere.tiles.map((tile) => {
    const attributes = tileAttributes(tile);
    const geometry = tileGeometry(tile, attributes);
    return geometry;
  });

  $: planetGeometry = mergeGeometries(tileGeometries);
</script>

<T.Mesh geometry={planetGeometry} castShadow receiveShadow>
  <T.MeshPhongMaterial vertexColors flatShading />
</T.Mesh>
