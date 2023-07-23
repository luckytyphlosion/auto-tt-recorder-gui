
export interface ReadonlyArraySet<T> {
  arr: ReadonlyArray<T>,
  set: ReadonlySet<T>
}

export type ValidValues<T extends ReadonlyArraySet<any>> = T["arr"][number];

export function makeReadonlyArraySet<T>(arr: ReadonlyArray<T>): ReadonlyArraySet<T> {
  return {
    arr: arr,
    set: new Set(arr)
  }
};
