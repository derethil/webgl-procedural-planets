import type { Tile } from "hexasphere";

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
