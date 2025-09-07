<script lang="ts">
  import { T } from "@threlte/core";
  import { BufferGeometry, Float32BufferAttribute } from "three";
  import type { Cell } from "./Cell";

  interface FlatTileGeometryProps {
    cell: Cell;
  }

  const { cell }: FlatTileGeometryProps = $props();

  const geometry = $derived(() => {
    const boundary = cell.tile.boundary;
    const vertices: number[] = [];
    const indices: number[] = [];

    // Add only boundary vertices
    boundary.forEach((vertex) => {
      vertices.push(vertex.x, vertex.y, vertex.z);
    });

    // Create triangular faces (simple fan triangulation from vertex 0)
    for (let i = 1; i < boundary.length - 1; i++) {
      indices.push(0, i, i + 1);
    }

    const position = new Float32BufferAttribute(vertices, 3, false);

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", position);
    geometry.setIndex(indices);
    geometry.computeVertexNormals();

    return geometry;
  });
</script>

<T is={geometry()} />

