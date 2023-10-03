import { writable } from "svelte/store";

export enum ScaleDirection {
  OUT = 1,
  IN = -1,
}

export const scaleDirection = writable<ScaleDirection>(ScaleDirection.OUT);
