<script lang="ts">
  import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
  import { tileAttributes } from "../../features/tiles/attributes";
  import { tileGeometry } from "../../features/tiles/geometry";
  import { Hexsphere } from "../../lib/Hexsphere";
  import { planetParams } from "../../stores/planetParams";
  import { T } from "@threlte/core";

  let hexsphere = $derived(new Hexsphere(
    $planetParams.radius,
    $planetParams.divisions,
    $planetParams.tileSize,
  ));

  let tileGeometries = $derived(hexsphere.tiles.map((tile) => {
    const attributes = tileAttributes(tile);
    const geometry = tileGeometry(tile, attributes);
    return geometry;
  }));

  let planetGeometry = $derived(mergeGeometries(tileGeometries));
</script>

<T.Mesh geometry={planetGeometry} castShadow receiveShadow>
  <T.MeshPhongMaterial vertexColors flatShading />
</T.Mesh>
