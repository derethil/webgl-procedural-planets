// Create a derived store that scales the frequency of the noise
// based on the radius of the planet. This is so that the noise
// looks the same regardless of the size of the planet.

import { derived } from "svelte/store";
import { planetParams } from "./planetParams";

export const noiseParams = derived(planetParams, ($planetParams) => {
  const {
    radius: planetRadius,
    noise: { frequency, noiseRadius },
  } = $planetParams;

  const scaledFrequency = frequency * noiseRadius * (1 / planetRadius);

  return {
    ...$planetParams.noise,
    frequency: scaledFrequency,
  };
});
