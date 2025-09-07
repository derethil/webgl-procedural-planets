<script lang="ts">
  import { T } from "@threlte/core";
  import { calculateSurfaceNormal } from "hexasphere/dist/tile";
  import { Planet } from "@/features/Planet/components/PlanetNew.svelte";
  import TileGeometry from "./TileGeometry.svelte";

  const planet = $derived(new Planet());
  const firstCell = $derived(planet.pentagonalCells[0]);
</script>

{#if firstCell}
  <!-- Show the tile geometry at origin with no rotation -->
  <T.Mesh>
    <TileGeometry cell={firstCell} />
    <T.MeshBasicMaterial color="red" wireframe />
  </T.Mesh>

  <!-- Show the tile at its actual position without calculated rotation -->
  <T.Mesh position={firstCell.position}>
    <TileGeometry cell={firstCell} />
    <T.MeshBasicMaterial color="blue" wireframe />
  </T.Mesh>

  <!-- Show  the tile at its actual position with calculated rotation -->
  <T.Mesh position={firstCell.position} rotation={firstCell.rotation}>
    <TileGeometry cell={firstCell} />
    <T.MeshBasicMaterial color="pink" wireframe />
  </T.Mesh>

  <!-- Show surface normal and expected direction -->
  {@const boundary = firstCell.tile.boundary}
  {@const   rawNormal = calculateSurfaceNormal(boundary[0], boundary[1], boundary[2])}
  {@const center = firstCell.center}

  {@const   normalLength = Math.sqrt(
    rawNormal.x * rawNormal.x + rawNormal.y * rawNormal.y +
      rawNormal.z * rawNormal.z,
  )}
  {@const   normal = {
    x: rawNormal.x / normalLength,
    y: rawNormal.y / normalLength,
    z: rawNormal.z / normalLength,
  }}

  {@const   centerLength = Math.sqrt(
    center[0] * center[0] + center[1] * center[1] + center[2] * center[2],
  )}
  {@const   normalizedCenter = {
    x: center[0] / centerLength,
    y: center[1] / centerLength,
    z: center[2] / centerLength,
  }}

  <!-- Surface normal direction (red cube) -->
  <T.Mesh
    position={[
      center[0] + normal.x * 1.0,
      center[1] + normal.y * 1.0,
      center[2] + normal.z * 1.0,
    ]}
  >
    <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
    <T.MeshBasicMaterial color="red" />
  </T.Mesh>

  <!-- Expected outward direction (green cube) -->
  <T.Mesh
    position={[
      center[0] + normalizedCenter.x * 1.0,
      center[1] + normalizedCenter.y * 1.0,
      center[2] + normalizedCenter.z * 1.0,
    ]}
  >
    <T.BoxGeometry args={[0.5, 0.5, 0.5]} />
    <T.MeshBasicMaterial color="green" />
  </T.Mesh>

  <!-- Center point sphere (yellow) -->
  <T.Mesh position={center}>
    <T.SphereGeometry args={[0.3]} />
    <T.MeshBasicMaterial color="yellow" />
  </T.Mesh>

  <T.AxesHelper args={[10]} />
{/if}
