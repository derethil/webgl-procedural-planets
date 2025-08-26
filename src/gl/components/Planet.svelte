<script lang="ts">
  import { T } from "@threlte/core";
  import { Planet } from "@/features/Planet/components/Planet.svelte";
  import { planetParams } from "@/state/planetParams.svelte";

  const planet = $derived(new Planet());
</script>

{#if planet.loading}
  <T.Mesh position={[0, 0, 0]}>
    <T.SphereGeometry args={[planetParams.radius, 16, 16]} />
    <T.MeshBasicMaterial color="#333333" wireframe />
  </T.Mesh>
{:else if planet.geometry}
  <T.Mesh
    geometry={planet.geometry}
    onclick={(e) => planet.handleClick(e)}
    castShadow
    receiveShadow
  >
    <T.MeshPhongMaterial vertexColors flatShading />
  </T.Mesh>
{/if}
