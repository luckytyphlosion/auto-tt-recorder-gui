
import { TimelineCategory } from "./components/layout_components/TimelineCategoryLayout";

import { NoTop10Category } from "./components/layout_components/choice_layouts/NoTop10CategoryLayout";

import { FormComplexity } from "./components/layout_components/FormComplexityLayout";

import { AutoTTRecConfig } from "../shared/shared-types";

import { shallowCopy } from "../shared/util-shared";

import { AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES, AutoTTRecConfigFormFields, MINIMAL_FORM_VALUES, DEFAULT_FORM_VALUES } from "./auto-tt-rec-form-field-types";

import { AutoTTRecConfigErrorsAndWarnings } from "./auto-tt-rec-errors-and-warnings";
import { AutoTTRecConfigImportPreprocessor } from "./auto-tt-rec-config-import-preprocessor";
import { validateNoUnsavedFiles, AutoTTRecConfigExporter } from "./auto-tt-rec-config-exporter";
import { BooleanFILLME, ReadTemplateResult, ReadTemplateStatus } from "../shared/shared-types";

export interface ImportTemplateResult {
  newFormData: AutoTTRecConfigFormFields,
  errorsAndWarningsStr: string
}

export interface ReadAndImportTemplateResult {
  readTemplateResult: ReadTemplateResult,
  importTemplateResult?: ImportTemplateResult
}

export function makeMinimalFormData(formComplexity: FormComplexity, timelineCategory: TimelineCategory, noTop10Category: NoTop10Category, expandUnselectedChoiceInputs: BooleanFILLME) {
  let formData: AutoTTRecConfigFormFields = shallowCopy(MINIMAL_FORM_VALUES);
  formData["form-complexity"] = formComplexity;
  formData["timeline-category"] = timelineCategory;
  formData["no-top-10-category"] = noTop10Category;
  formData["extra-gecko-codes-unsaved"] = false;
  formData["top-10-gecko-code-unsaved"] = false;
  console.log("makeMinimalFormData expandUnselectedChoiceInputs:", expandUnselectedChoiceInputs);
  formData["expand-unselected-choice-inputs"] = expandUnselectedChoiceInputs;
  let errorsAndWarnings = new AutoTTRecConfigErrorsAndWarnings();

  for (const argName of AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES) {
    if (typeof formData[argName] === "number") {
      if (!Number.isNaN(formData[argName])) {
        errorsAndWarnings.addWarning(argName, `minimal formData[${argName}] should be NaN! (this is an error within the program itself and not your fault, please contact the developer!)`);
      }
    }
  }

  console.log(errorsAndWarnings.compile());
  return formData;
}

export function makeDefaultFormData(formComplexity: FormComplexity, timelineCategory: TimelineCategory, noTop10Category: NoTop10Category, expandUnselectedChoiceInputs: BooleanFILLME) {
  let formData: AutoTTRecConfigFormFields = shallowCopy(DEFAULT_FORM_VALUES);
  formData["form-complexity"] = formComplexity;
  formData["timeline-category"] = timelineCategory;
  formData["no-top-10-category"] = noTop10Category;
  formData["expand-unselected-choice-inputs"] = expandUnselectedChoiceInputs;
  console.log("makeDefaultFormData formData:", formData);
  return formData;
}

export enum ExportTemplateStatus {
  SUCCESS = 0,
  ERROR_UNSAVED = 1,
  ERROR_ON_EXPORT = 2
}

export interface ExportTemplateResult {
  status: ExportTemplateStatus,
  errorWarningData: string
}

export async function convertAutoTTRecConfigToFormData(autoTTRecConfig: AutoTTRecConfig, autoTTRecConfigFilename: string, oldFormComplexity: FormComplexity): Promise<[AutoTTRecConfigFormFields, string]> {
  let errorsAndWarnings = new AutoTTRecConfigErrorsAndWarnings();
  let autoTTRecConfigPreprocessor = new AutoTTRecConfigImportPreprocessor(autoTTRecConfig, errorsAndWarnings, autoTTRecConfigFilename, oldFormComplexity);
  let autoTTRecConfigImporter = autoTTRecConfigPreprocessor.preprocess();
  let autoTTRecConfigFormFields = await autoTTRecConfigImporter.import();
  let errorsAndWarningsStr = errorsAndWarnings.compile();
  console.log(errorsAndWarningsStr);
  console.log("after import errorsAndWarnings: ", errorsAndWarnings.debug_get_errorsAndWarningsMap());

  return [autoTTRecConfigFormFields, errorsAndWarningsStr];
}


export async function tryImportAutoTTRecConfigTemplate(autoTTRecConfigFilename: string, formComplexity: FormComplexity): Promise<ReadAndImportTemplateResult> {
  let readTemplateResult: ReadTemplateResult = await window.api.importFormTemplate(autoTTRecConfigFilename);
  let readAndImportTemplateResult: ReadAndImportTemplateResult = {
    readTemplateResult: readTemplateResult
  };

  if (readTemplateResult.status === ReadTemplateStatus.SUCCESS) {
    let [newFormData, errorsAndWarningsStr] = await convertAutoTTRecConfigToFormData(readTemplateResult.data, autoTTRecConfigFilename, formComplexity);
    readAndImportTemplateResult.importTemplateResult = {
      newFormData: newFormData,
      errorsAndWarningsStr: errorsAndWarningsStr
    };
  }

  return readAndImportTemplateResult;
}

export async function tryExportAutoTTRecConfigTemplate(formData: AutoTTRecConfigFormFields, autoTTRecConfigFilename: string): Promise<ExportTemplateResult> {
  let errorsAndWarnings = new AutoTTRecConfigErrorsAndWarnings();
  /*if (validateNoUnsavedFiles(formData, errorsAndWarnings)) {
    return {
      status: ExportTemplateStatus.ERROR_UNSAVED,
      errorWarningData: errorsAndWarnings.compile()
    }
  }*/

  let autoTTRecConfigExporter = new AutoTTRecConfigExporter(formData, errorsAndWarnings);
  let autoTTRecExportArgs = autoTTRecConfigExporter.export();

  await window.api.writeObjectToYAML(autoTTRecExportArgs, autoTTRecConfigFilename);

  let status: ExportTemplateStatus;
  if (errorsAndWarnings.hasErrorsOrWarnings()) {
    status = ExportTemplateStatus.ERROR_ON_EXPORT;
  } else {
    status = ExportTemplateStatus.SUCCESS;
  }

  return {
    status: status,
    errorWarningData: errorsAndWarnings.compile()
  }
}
