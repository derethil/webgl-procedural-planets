import Alea from "alea";
import { createNoise3D } from "simplex-noise";
import type { Vector3 } from "../lib/dto/vector";
import type { NoiseParams } from "../stores/planetParams";

// https://cmaher.github.io/posts/working-with-simplex-noise/
export function getNoise(seed: string, position: Vector3, params: NoiseParams) {
  const noise3D = createNoise3D(Alea(seed));

  let { iterations: numIterations, persistence, frequency } = params;
  let { x, y, z } = position;

  let maxAmplitude = 0;
  let amplitude = 1;
  let noise = 0;

  // add successively smaller, higher-frequency terms
  for (let i = 0; i < numIterations; ++i) {
    noise += noise3D(x * frequency, y * frequency, z * frequency) * amplitude;
    maxAmplitude += amplitude;
    amplitude *= persistence;
    frequency *= 2;
  }

  noise = noise / maxAmplitude; // take average value of iterations
  noise = (noise * (1 - 0)) / 2 + (1 + 0) / 2; // normalize to 0-1

  return (noise /= 2);
}
