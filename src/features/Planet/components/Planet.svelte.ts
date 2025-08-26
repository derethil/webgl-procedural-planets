import type { IntersectionEvent } from "@threlte/extras";
import { SvelteMap } from "svelte/reactivity";
import { BufferGeometry, Float32BufferAttribute } from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { Tile } from "@/features/Tile";
import { planetParams as params } from "@/state/planetParams.svelte";
import {
  type TileData,
  WorkerMessageType,
  type WorkerResponse,
  WorkerResponseType,
} from "./generateWorker";

export class Planet {
  private tileData: TileData[] = [];
  private faceToTileMap: Map<number, Tile> = new SvelteMap();
  private worker: Worker | null = null;

  public loading = $state(false);
  public progress = $state(0);

  public constructor() {
    this.generatePlanet();
  }

  // Getters / Setters

  public get geometry() {
    if (this.tileData.length === 0) return null;

    const geometries = this.tileData.map((tile) => {
      const geometry = new BufferGeometry();

      const p = new Float32BufferAttribute(tile.geometry.vertices, 3, false);
      const c = new Float32BufferAttribute(tile.geometry.colors, 3, false);

      geometry.setAttribute("position", p);
      geometry.setAttribute("color", c);

      geometry.setIndex(tile.geometry.indices);
      geometry.computeVertexNormals();

      return geometry;
    });

    return mergeGeometries(geometries);
  }

  // Public Methods

  public handleClick(event: IntersectionEvent<MouseEvent>) {
    if (!event.faceIndex) return;
    const tile = this.faceToTileMap.get(event.faceIndex);
    tile?.handleClick();
    event.stopPropagation();
  }

  public async regenerate() {
    await this.generatePlanet();
  }

  // Private Helpers

  private instantiateWorker() {
    if (this.worker) this.worker.terminate();
    this.worker = new Worker(
      new URL("./generateWorker.ts", import.meta.url),
      { type: "module" },
    );
  }

  private onWorkerError(reject: (reason?: unknown) => void) {
    return (error: ErrorEvent) => {
      console.error("worker error:", error);
      this.loading = false;
      reject(error);
    };
  }

  private onWorkerMessage(
    event: MessageEvent<WorkerResponse>,
    resolve: () => void,
  ) {
    const { data: message } = event;

    switch (message.type) {
      case WorkerResponseType.Progress: {
        const { current, total } = message;
        this.progress = current / total;
        break;
      }

      case WorkerResponseType.PlanetGenerated: {
        this.tileData = message.data.tiles;

        const tiles = message.data.tiles.map((tile) => {
          return new Tile(this, tile.hexTile, tile.faceCount);
        });

        this.cacheTilesByFace(tiles);

        this.loading = false;
        this.progress = 1;
        resolve();
        break;
      }
    }
  }

  private async generatePlanet() {
    this.loading = true;
    this.progress = 0;

    this.instantiateWorker();

    return new Promise<void>((resolve, reject) => {
      if (!this.worker) return reject(new Error("Failed to create worker"));

      this.worker.onmessage = (e) => this.onWorkerMessage(e, resolve);
      this.worker.onerror = this.onWorkerError(reject);

      this.worker.postMessage({
        type: WorkerMessageType.GeneratePlanet,
        params: $state.snapshot(params),
      });
    });
  }

  private cacheTilesByFace(tiles: Tile[]) {
    let faceOffset = 0;

    tiles.forEach((tile) => {
      for (let i = 0; i < tile.faceCount; i++) {
        this.faceToTileMap.set(faceOffset + i, tile);
      }

      faceOffset += tile.faceCount;
    });
  }
}
