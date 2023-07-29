
export interface AutoTTRecConfig {
  [key: string]: string | number | boolean | null;
}

export interface FilenameAndContents {
  filename: string,
  contents: string
}

export enum ImportTemplateStatus {
  INDETERMINATE = -1,
  SUCCESS = 0,
  ERROR_ON_READ = 1,
  ERROR_ON_PARSE = 2,
  ERROR_ON_STRUCTURE = 3,
  ERROR_ON_VALUES = 4,
}

export interface ImportTemplateResult {
  status: ImportTemplateStatus,
  errorWarningData: string,
  data: AutoTTRecConfig,
  hasWarnings: boolean
}

export interface SavedDialogPathnames {
  "iso-wbfs": string,
  "music": string,
  "rkgs": string,
  "extra-gecko-codes": string,
  "extra-hq-textures": string,
  "output-video": string,
  "szs": string,
  "top-10-gecko-code": string,
}

export type DialogId = keyof SavedDialogPathnames;
