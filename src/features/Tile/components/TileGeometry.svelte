<script lang="ts">
  import { T } from "@threlte/core";
  import { BufferGeometry, Float32BufferAttribute, Vector3 } from "three";
  import type { Cell } from "./Cell";
  import { createIndices, createVertices } from "./geometry";

  interface TileGeometryProps {
    cell: Cell;
  }

  const { cell }: TileGeometryProps = $props();

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
