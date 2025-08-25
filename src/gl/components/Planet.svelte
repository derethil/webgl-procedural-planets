<script lang="ts">
  import { T } from "@threlte/core";
  import { Planet } from "@/features/Planet";
  import { planetParams } from "@/stores/planetParams";

  const planet = $derived(
    new Planet(
      $planetParams.radius,
      $planetParams.divisions,
      $planetParams.tileSize,
    ),
  );
</script>

<T.Mesh
  geometry={planet.geometry}
  onclick={(e) => planet.handleClick(e)}
  castShadow
  receiveShadow
>
  <T.MeshPhongMaterial vertexColors flatShading />
</T.Mesh>
