
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
  "template": string
}

export type DialogId = keyof SavedDialogPathnames;

export interface StringOrError {
  result: string,
  hasError: boolean,
  errorCode: string,
  errorMessage: string
}

export interface ExpectedExtensionAndErrorMessage {
  extension: string,
  errorMessage: string
}

export type BooleanFILLME = boolean | "<FILLME>";

export type IfEquals<T, U, Y=unknown, N=never> =
  (<G>() => G extends T ? 1 : 2) extends
  (<G>() => G extends U ? 1 : 2) ? Y : N;

export const chadsoftGhostPageLinkRegex = /^https:\/\/(?:www\.)?chadsoft\.co\.uk\/time-trials\/rkgd\/([0-9A-Fa-f]{2}\/[0-9A-Fa-f]{2}\/[0-9A-Fa-f]{36})\.html/;
