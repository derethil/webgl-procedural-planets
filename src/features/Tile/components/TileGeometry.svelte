<script lang="ts">
  import { T } from "@threlte/core";
  import { calculateSurfaceNormal } from "hexasphere/dist/tile";
  import {
    BufferGeometry,
    Float32BufferAttribute,
    Matrix4,
    Vector3,
  } from "three";
  import type { Cell } from "./Cell";
  import { createIndices, createVertices } from "./geometry";

  interface TileGeometryProps {
    cell: Cell;
  }

  const { cell }: TileGeometryProps = $props();

  function calculateTileNormal(cell: Cell) {
    const boundary = cell.tile.boundary;
    return calculateSurfaceNormal(boundary[0], boundary[1], boundary[2]);
  }

  const geometry = $derived(() => {
    const rawVertices = createVertices(cell.tile);
    const indices = createIndices(cell.tile);

    const centerPoint = cell.center;
    const normal = calculateTileNormal(cell);

    const matrix = new Matrix4();
    const center = new Vector3(...centerPoint);
    const target = center.clone().add(
      new Vector3(normal.x, normal.y, normal.z),
    );

    matrix.lookAt(center, target, cell.up);

    const rotationMatrix = matrix.clone().invert();

    const vertices: number[] = [];

    for (let i = 0; i < rawVertices.length; i += 3) {
      // Translate to center at origin
      const vertex = new Vector3(
        rawVertices[i] - centerPoint[0],
        rawVertices[i + 1] - centerPoint[1],
        rawVertices[i + 2] - centerPoint[2],
      );

      // Apply rotation to align with +Z axis
      vertex.applyMatrix4(rotationMatrix);

      vertices.push(vertex.x, vertex.y, vertex.z);
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
