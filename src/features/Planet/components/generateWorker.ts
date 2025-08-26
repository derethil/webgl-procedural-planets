import { Hexasphere, type Tile } from "hexasphere";
import {
  createTileAttributes,
  mapTileToIndexArray,
  mapTileToVertexArray,
} from "@/features/Tile";
import type { PlanetParams } from "@/state/planetParams.svelte";

interface TileGeometryData {
  vertices: number[];
  indices: number[];
  colors: number[];
  faceCount: number;
}

export interface TileData {
  hexTile: Tile;
  faceCount: number;
  geometry: TileGeometryData;
}

interface PlanetData {
  tiles: TileData[];
  tileCount: number;
}

export enum WorkerMessageType {
  GeneratePlanet = "generatePlanet",
}

export enum WorkerResponseType {
  PlanetGenerated = "planetGenerated",
  Progress = "progress",
}

// Worker message types
export interface GeneratePlanetMessage {
  type: WorkerMessageType.GeneratePlanet;
  params: PlanetParams;
}

export interface PlanetGeneratedMessage {
  type: WorkerResponseType.PlanetGenerated;
  data: PlanetData;
}

export interface ProgressMessage {
  type: WorkerResponseType.Progress;
  current: number;
  total: number;
}

export type WorkerMessage = GeneratePlanetMessage;
export type WorkerResponse = PlanetGeneratedMessage | ProgressMessage;

function createTileData(tile: Tile, params: PlanetParams): TileGeometryData {
  const attributes = createTileAttributes(tile, params);
  const vertices = mapTileToVertexArray(tile, attributes);
  const indices = mapTileToIndexArray(tile);

  const color = attributes.biome.color;
  const colors = new Array(vertices.length / 3).fill(color).flat();

  const faceCount = indices.length / 3;

  return {
    vertices,
    indices,
    colors,
    faceCount,
  };
}

function generatePlanet(params: PlanetParams): PlanetData {
  const sphere = new Hexasphere(
    params.radius,
    params.divisions,
    params.tileSize,
  );
  const tiles: TileData[] = [];

  sphere.tiles.forEach((tile, i) => {
    const geometryData = createTileData(tile, params);

    tiles.push({
      hexTile: tile,
      faceCount: geometryData.faceCount,
      geometry: geometryData,
    });

    if (i % 50 === 0) {
      self.postMessage({
        type: WorkerResponseType.Progress,
        current: i,
        total: sphere.tiles.length,
      });
    }
  });

  return {
    tiles,
    tileCount: sphere.tiles.length,
  };
}

function handleMessage(event: MessageEvent) {
  const { type } = event.data;

  switch (type) {
    case WorkerMessageType.GeneratePlanet: {
      const { params } = event.data;

      try {
        const data = generatePlanet(params);
        const m = { type: WorkerResponseType.PlanetGenerated, data };
        self.postMessage(m);
      } catch (error) {
        console.error("Planet generation failed:", error);
      }
      break;
    }

    default:
      console.warn("Unknown message type:", type);
  }
}

self.onmessage = handleMessage;
