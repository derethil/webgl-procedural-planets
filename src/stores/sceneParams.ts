import { writable } from "svelte/store";

interface SceneParams {
  autorotate: boolean;
}

export const sceneParams = writable<SceneParams>({
  autorotate: true,
});
