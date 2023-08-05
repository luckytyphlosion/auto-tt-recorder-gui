
import { DEFAULT_FORM_VALUES, AutoTTRecConfigFormFields } from "./auto-tt-rec-form-field-types";
import { shallowCopy } from "../shared/util-shared";
import { tryImportAutoTTRecConfigTemplate } from "./auto-tt-rec-form-data-generators";
import { ReadTemplateStatus, LoadFormInputsType } from "../shared/shared-types";

import { FormComplexity } from "./components/layout_components/FormComplexityLayout";

async function getFormDataFromTemplateFilenameIfNoReadError(autoTTRecConfigFilename: string): Promise<AutoTTRecConfigFormFields | null> {
  let readAndImportTemplateResult = await tryImportAutoTTRecConfigTemplate(autoTTRecConfigFilename, FormComplexity.SIMPLE);
  if (readAndImportTemplateResult.readTemplateResult.status === ReadTemplateStatus.SUCCESS && readAndImportTemplateResult.importTemplateResult !== undefined) {
    return readAndImportTemplateResult.importTemplateResult.newFormData;
  } else {
    return null;
  }
}

async function getLastRecordedTemplateFormData()  {
  let lastRecordedTemplateFilename = await window.api.getLastRecordedTemplateFilename();
  return getFormDataFromTemplateFilenameIfNoReadError(lastRecordedTemplateFilename);
}

async function getLastOpenedTemplateFormData() {
  let lastOpenedTemplateFilename = await window.api.getLastOpenedTemplateFilename();
  if (lastOpenedTemplateFilename === "") {
    return null;
  } else {
    return getFormDataFromTemplateFilenameIfNoReadError(lastOpenedTemplateFilename);
  }
}

export async function getInitialFormData(initialLoadFormInputsType: LoadFormInputsType) {
  let loadSuccess: boolean = false;
  let possibleInitialFormData: AutoTTRecConfigFormFields | null;
  let initialFormData: AutoTTRecConfigFormFields;

  if (initialLoadFormInputsType === "load-form-inputs-select-last-recorded") {
    possibleInitialFormData = await getLastRecordedTemplateFormData();
    if (possibleInitialFormData === null) {
      possibleInitialFormData = await getLastOpenedTemplateFormData();
    }
  } else if (initialLoadFormInputsType === "load-form-inputs-select-last-template") {
    possibleInitialFormData = await getLastOpenedTemplateFormData();
    if (possibleInitialFormData === null) {
      possibleInitialFormData = await getLastRecordedTemplateFormData();
    }
  } else {
    possibleInitialFormData = null;
  }

  if (possibleInitialFormData !== null) {
    initialFormData = shallowCopy(possibleInitialFormData);
  } else {
    initialFormData = shallowCopy(DEFAULT_FORM_VALUES);
  }

  return initialFormData;
}
