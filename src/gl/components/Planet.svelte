<script lang="ts">
  import { T } from "@threlte/core";
  import { Planet } from "@/features/Planet";

  const planet = new Planet();
</script>

<T.Mesh
  geometry={planet.geometry}
  onclick={(e) => planet.handleClick(e)}
  castShadow
  receiveShadow
>
  <T.MeshPhongMaterial vertexColors flatShading />
</T.Mesh>
