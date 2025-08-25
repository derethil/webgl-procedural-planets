import { useThrelte } from "@threlte/core";
import * as Three from "three";

export function useThrelteConfig() {
  const { renderer, scene } = useThrelte();

  scene.background = new Three.Color(0x0a0a0a);

  renderer.toneMapping = Three.ACESFilmicToneMapping;
  renderer.outputColorSpace = Three.SRGBColorSpace;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = Three.PCFSoftShadowMap;
}
