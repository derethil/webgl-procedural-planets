export function memo(
  _: unknown,
  __: string,
  descriptor: PropertyDescriptor,
) {
  const getter = descriptor.get!;
  const cache = new WeakMap();

  descriptor.get = function () {
    if (!cache.has(this)) {
      cache.set(this, getter.call(this));
    }
    return cache.get(this);
  };

  return descriptor;
}
