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

export const planetParams = $state({
  seed: "default",
  radius: 20,
  divisions: 10,
  tileSize: 1,
  noise: {
    get frequency() {
      const baseFrequency = 0.048;
      return baseFrequency * this.noiseRadius * (1 / planetParams.radius);
    },
    iterations: 16,
    persistence: 0.5,
    noiseRadius: 15,
  },
});

export function newPlanet() {
  planetParams.seed = crypto.randomUUID();
}
