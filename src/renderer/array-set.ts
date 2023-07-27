
export interface ReadonlyArraySet<T> {
  arr: ReadonlyArray<T | "<FILLME>">,
  set: ReadonlySet<T | "<FILLME>">
}

export type ValidValues<T extends ReadonlyArraySet<any>> = T["arr"][number];

export function makeReadonlyArraySet<T>(arr: ReadonlyArray<T>): ReadonlyArraySet<T> {
  return {
    arr: [...arr, "<FILLME>"] as const,
    set: new Set(arr)
  }
};
