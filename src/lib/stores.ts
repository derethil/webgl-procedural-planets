import { writable } from "svelte/store";

type ScaleDirection = "out" | "in";
export const scaleDirection = writable<ScaleDirection>("out");
