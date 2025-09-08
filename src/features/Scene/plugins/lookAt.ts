import { injectPlugin, useThrelte } from "@threlte/core";
import type { AnyProps } from "node_modules/@threlte/core/dist/plugins/types";
import { Vector3 } from "three";

// Taken from https://threlte.xyz/docs/learn/advanced/plugins
// This plugin allows you to use the lookAt property on any Object3D
// This is useful for cameras, lights, and meshes

export const injectLookAtPlugin = () => {
  injectPlugin("lookAt", ({ ref, props }) => {
    // skip injection if ref is not an Object3D
    if (!ref.isObject3D || !("lookAt" in props)) return;
    // get the invalidate function from the useThrelte hook
    const { invalidate } = useThrelte();
    // create some variables to store the current ref and props
    let currentRef = ref;
    let currentProps = props;
    // create a temp vector to avoid creating new vectors on every iteration
    const tempV3 = new Vector3();
    const applyProps = (p: typeof props, r: typeof ref) => {
      if (!("lookAt" in p)) return;
      const prop = p.lookAt;
      if (prop.isVector3) tempV3.copy(prop);
      if (Array.isArray(prop) && prop.length === 3) {
        tempV3.set(prop[0], prop[1], prop[2]);
      } else if (typeof prop === "object") {
        tempV3.set(prop.x ?? 0, prop.y ?? 0, prop.z ?? 0);
      }
      r.lookAt(tempV3);
      invalidate();
    };
    applyProps(currentProps, currentRef);
    return {
      onRefChange(ref: unknown) {
        currentRef = ref;
        applyProps(currentProps, currentRef);
      },
      onPropsChange(props: AnyProps) {
        currentProps = props;
        applyProps(currentProps, currentRef);
      },
      pluginProps: ["lookAt"],
    };
  });
};
