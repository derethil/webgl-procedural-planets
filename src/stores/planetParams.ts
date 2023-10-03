import { derived, writable } from "svelte/store";

export interface PlanetParams {
  seed: string;
  radius: number;
  divisions: number;
  tileSize: number;
  noise: {
    frequency: number;
    iterations: number;
    persistence: number;
    noiseRadius: number;
  };
}

export type NoiseParams = PlanetParams["noise"];

const DEFAULT_PARAMS: PlanetParams = {
  seed: "default",
  radius: 20,
  divisions: 20,
  tileSize: 1,
  noise: {
    frequency: 0.048,
    iterations: 8,
    persistence: 0.5,
    noiseRadius: 15,
  },
};

export const planetParams = writable<PlanetParams>(DEFAULT_PARAMS);
