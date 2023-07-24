
export interface AutoTTRecConfig {
  [key: string]: string | number | boolean | null | undefined;
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

