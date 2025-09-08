<script lang="ts">
  import { T } from "@threlte/core";
  import type { Tile } from "hexasphere";
  import { BufferGeometry, Float32BufferAttribute, Vector3 } from "three";
  import type { Cell } from "./Cell";

  interface TileGeometryProps {
    cell: Cell;
  }

  const { cell }: TileGeometryProps = $props();

  export const createVertices = (tile: Tile) => {
    return tile.boundary.flatMap((vertex) => [
      // Interior Vertices
      vertex.x,
      vertex.y,
      vertex.z,
      // Exterior Vertices
      vertex.x * 1,
      vertex.y * 1,
      vertex.z * 1,
    ]);
  };

  export const createIndices = (tile: Tile): number[] => {
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

  const geometry = $derived(() => {
    const raw = createVertices(cell.tile);
    const indices = createIndices(cell.tile);
    const rotationMatrix = cell.matrix.clone().invert();

    const vertices: number[] = [];

    for (let i = 0; i < raw.length; i += 3) {
      const vertex = new Vector3(raw[i], raw[i + 1], raw[i + 2]);
      const translated = vertex.sub(cell.center);
      translated.applyMatrix4(rotationMatrix);
      vertices.push(translated.x, translated.y, translated.z);
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
