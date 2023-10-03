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
  import { tileAttributes } from "../../features/tiles/attributes";
  import type { TileAttributes } from "../../lib/dto/tileAttributes";

  // Props
  export let baseTile: Tile;
  export let meshProps: Omit<MeshProps, "geometry" | "material"> = {};

  // State
  $: attributes = tileAttributes(baseTile);
  $: vertices = tileVertices(baseTile);
  $: geometry = tileGeometry(baseTile);

  const tileVertices = (tile: Tile) => {
    return tile.boundary.flatMap((vertex) => [
      // Interior Vertices
      vertex.x,
      vertex.y,
      vertex.z,
      // Exterior Vertices
      vertex.x * attributes.depth,
      vertex.y * attributes.depth,
      vertex.z * attributes.depth,
    ]);
  };

  // Calculate indices for tile geometry (triangles)
  // Because we're using BufferGeometry, we need to specify the indices
  const tileIndices = (tile: Tile): number[] => {
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

  // Calculate the geometry for a tile
  // We use BufferGeometry here because the  tiles give us
  // arrays of vertices, and BufferGeometry is more efficient
  const tileGeometry = (tile: Tile) => {
    const indices = tileIndices(tile);
    const geometry = new BufferGeometry();

    const color = attributes.biome.color;
    const colors = new Array(vertices.length / 3).fill(color).flat();

    geometry.setAttribute(
      "position",
      new Float32BufferAttribute(vertices, 3, false)
    );

    geometry.setAttribute(
      "color",
      new Float32BufferAttribute(colors, 3, false)
    );

    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  };

  // Three.js objects
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
  scale={attributes.depth}
>
  <T.MeshStandardMaterial bind:ref={material} vertexColors />
  <InteractiveObject object={meshObject} interactive />
</T.Mesh>
