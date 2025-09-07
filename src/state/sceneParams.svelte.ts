interface SceneParams {
  autorotate: boolean;
}

export const sceneParams = $state<SceneParams>({
  autorotate: false,
});
