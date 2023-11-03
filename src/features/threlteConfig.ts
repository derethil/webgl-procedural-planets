import { useThrelte } from "@threlte/core";
import * as Three from "three";

export function useThrelteConfig() {
  const { renderer } = useThrelte();

  renderer.toneMapping = Three.ACESFilmicToneMapping;
  renderer.outputColorSpace = Three.SRGBColorSpace;

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = Three.PCFSoftShadowMap;
}
