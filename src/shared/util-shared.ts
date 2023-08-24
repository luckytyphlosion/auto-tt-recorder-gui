
export function shallowCopy<T>(obj: T): T {
  return Object.assign({}, obj);
}

export function isInSet<T>(values: ReadonlySet<T>, x: any): x is T {
  return values.has(x);
}

export function deleteFromSet<T>(values: Set<T>, x: any): boolean {
  return values.delete(x);
}

export function undefinedToNullStr(value: string | undefined): string {
  return value !== undefined ? value : "";
}

const FILE_EXTENSION_FIRST_SYLLABLE_IS_PHONETIC_VOWEL_TABLE: {[key: string]: boolean} = {
  mp4: true,
  webm: false,
  mkv: true,
  rkg: true,
  iso: true,
  wbfs: false,
  szs: true,
  txt: false,
  ini: true
}

export function getIndefiniteArticleForFileExtension(fileExtension: string): "a" | "an" | "a(n)" {
  let isFileExtensionFirstSyllablePhoneticVowel = FILE_EXTENSION_FIRST_SYLLABLE_IS_PHONETIC_VOWEL_TABLE[fileExtension];
  if (isFileExtensionFirstSyllablePhoneticVowel === undefined) {
    return "a(n)";
  } else if (isFileExtensionFirstSyllablePhoneticVowel === true) {
    return "an";
  } else {
    return "a";
  }
}
