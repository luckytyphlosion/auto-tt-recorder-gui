
import { TimelineCategory } from "./components/layout_components/TimelineCategoryLayout";

import { NoTop10Category } from "./components/layout_components/choice_layouts/NoTop10CategoryLayout";

import { FormComplexity } from "./components/layout_components/FormComplexityLayout";

import { AutoTTRecConfig } from "../shared/shared-types";

import { shallowCopy } from "../shared/util-shared";

import { AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES, AutoTTRecConfigFormFields, MINIMAL_FORM_VALUES } from "./auto-tt-rec-form-field-types";

import { AutoTTRecConfigErrorsAndWarnings } from "./auto-tt-rec-errors-and-warnings";
import { AutoTTRecConfigPreprocessor } from "./auto-tt-rec-config-preprocessor";

export function makeMinimalFormData(formComplexity: FormComplexity, timelineCategory: TimelineCategory, noTop10Category: NoTop10Category) {
  let formData: AutoTTRecConfigFormFields = shallowCopy(MINIMAL_FORM_VALUES);
  formData["form-complexity"] = formComplexity;
  formData["timeline-category"] = timelineCategory;
  formData["no-top-10-category"] = noTop10Category;
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

export async function convertAutoTTRecConfigToFormData(autoTTRecConfig: AutoTTRecConfig, autoTTRecConfigFilename: string, oldFormComplexity: FormComplexity): Promise<[AutoTTRecConfigFormFields, string]> {
  let errorsAndWarnings = new AutoTTRecConfigErrorsAndWarnings();
  let autoTTRecConfigPreprocessor = new AutoTTRecConfigPreprocessor(autoTTRecConfig, errorsAndWarnings, autoTTRecConfigFilename, oldFormComplexity);
  let autoTTRecConfigImporter = autoTTRecConfigPreprocessor.preprocess();
  let autoTTRecConfigFormFields = await autoTTRecConfigImporter.import();
  let errorsAndWarningsStr = errorsAndWarnings.compile();
  console.log(errorsAndWarningsStr);
  console.log("after import errorsAndWarnings: ", errorsAndWarnings.debug_get_errorsAndWarningsMap());

  return [autoTTRecConfigFormFields, errorsAndWarningsStr];
}

