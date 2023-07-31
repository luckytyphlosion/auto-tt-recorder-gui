
export function shallowCopy<T>(obj: T): T {
  return Object.assign({}, obj);
}

export function isInSet<T>(values: ReadonlySet<T>, x: any): x is T {
  return values.has(x);
}

export function deleteFromSet<T>(values: Set<T>, x: any): boolean {
  return values.delete(x);
}
