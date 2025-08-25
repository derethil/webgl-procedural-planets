import { BufferGeometry, Float32BufferAttribute } from "three";
import type { Tile } from "@/lib/Hexsphere";
import type { TileAttributes } from "./types";

const tileVertices = (tile: Tile, attributes: TileAttributes) => {
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
export const createTileGeometry = (tile: Tile, attributes: TileAttributes) => {
  const vertices = tileVertices(tile, attributes);
  const indices = tileIndices(tile);
  const geometry = new BufferGeometry();

  const color = attributes.biome.color;
  const colors = new Array(vertices.length / 3).fill(color).flat();

  geometry.setAttribute(
    "position",
    new Float32BufferAttribute(vertices, 3, false),
  );

  geometry.setAttribute("color", new Float32BufferAttribute(colors, 3, false));

  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
};
