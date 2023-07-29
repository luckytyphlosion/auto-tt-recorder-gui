
export function shallowCopy<T>(obj: T): T {
  return Object.assign({}, obj);
}
