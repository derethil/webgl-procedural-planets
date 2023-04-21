<script lang="ts">
  import { InteractiveObject, T } from "@threlte/core";
  import { Tile } from "../../lib/Hexsphere";
  import {
    BufferGeometry,
    Float32BufferAttribute,
    Mesh,
    MeshStandardMaterial,
  } from "three";
  import type { MeshProps } from "@threlte/core/dist/objects/Mesh.svelte";
  import { spring } from "svelte/motion";
  import { scaleDirection } from "../../lib/stores";

  // Props

  export let baseTile: Tile;
  let depth = spring(2);
  export let meshProps: Omit<MeshProps, "geometry" | "material"> = {};
  // State
  $: vertices = computeVertices(baseTile);
  $: geometry = computeGeometry(baseTile);

  // Helpers
  const computeVertices = (tile: Tile) => {
    return tile.boundary.flatMap((vertex) => [
      // Interior Vertices
      vertex.x,
      vertex.y,
      vertex.z,
      // Exterior Vertices
      vertex.x * $depth,
      vertex.y * $depth,
      vertex.z * $depth,
    ]);
  };

  const computeIndices = (tile: Tile): number[] => {
    const isHex = tile.boundary.length === 6;
    const numSideVertices = isHex ? 11 : 9;
    const indices: number[] = [];

    // Side Triangles
    for (let i = 1; i <= numSideVertices; i += 2) {
      const mod = numSideVertices + 1;
      indices.push(i, (i - 1) % mod, (i + 1) % mod);
      indices.push(i, (i + 1) % mod, (i + 2) % mod);
    }

    // Top Triangles
    for (let i = 3; i <= numSideVertices - 2; i += 2) {
      indices.push(1, i, i + 2);
    }

    return indices;
  };

  const computeGeometry = (tile: Tile) => {
    const indices = computeIndices(tile);
    const geometry = new BufferGeometry();

    geometry.setAttribute(
      "position",
      new Float32BufferAttribute(vertices, 3, false)
    );

    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  };

  // Three.js
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

<T.Mesh
  {geometry}
  {...meshProps}
  let:ref={meshObject}
  bind:ref={mesh}
  scale={$depth}
>
  <T.MeshStandardMaterial color="#333" bind:ref={material} />
  <InteractiveObject
    object={meshObject}
    interactive
    on:pointerenter={() => ($depth = $scaleDirection === "in" ? 1.5 : 2.5)}
  />
</T.Mesh>
