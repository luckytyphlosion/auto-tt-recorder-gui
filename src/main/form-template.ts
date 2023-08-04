import { IpcMainInvokeEvent } from "electron";

import { AutoTTRecConfig, ImportTemplateStatus, ImportTemplateResult } from "../shared/shared-types";
import { readFileEnforceUTF8 } from "./gui2";

import fsPromises from "fs/promises";
import path from "path";
import JSYAML, { YAMLException, JSON_SCHEMA } from "js-yaml";
import YAML from "yaml";

function appendWarning(warnings: string[], warning: string) {
  let warningNum: number = warnings.length + 1;
  let formattedWarning: string = `=== Warning ${warningNum} ===\n${warning}\n`;
  warnings.push(formattedWarning);
}

async function loadYAML_formatErrorsIfErrorOrWarnings(filename: string): Promise<ImportTemplateResult> {
  let templateContents: string = "";
  let errorWarningData: string = "";
  let errors: string[] = [];
  let warnings: string[] = [];
  let status: ImportTemplateStatus = ImportTemplateStatus.INDETERMINATE;
  let autoTTRecConfig: AutoTTRecConfig = {};

  try {
    templateContents = await readFileEnforceUTF8(filename, "Provided template file is not a text file!");
    if (templateContents === "") {
      errorWarningData += `=== Error ===\nProvided template file is empty!\n`;
      status = ImportTemplateStatus.ERROR_ON_READ;
    }
  } catch (e) {
    errorWarningData += `=== Error ===\n${(e as Error).message}\n`;
    status = ImportTemplateStatus.ERROR_ON_READ;
  }

  if (templateContents !== "") {
    let template: unknown = undefined;
    try {
      template = JSYAML.load(templateContents, {
        onWarning: (e: YAMLException) => {appendWarning(warnings, e.message)},
        schema: JSON_SCHEMA
      });
    } catch (e) {
      errors.push((e as Error).message);
    }
  
    // do a double parse for better error messages
    try {
      YAML.parse(templateContents, {prettyErrors: true, strict: true});
    } catch (e) {
      errors.push((e as Error).message);
    }
  
    console.log("form-template template:", template);
    if (template === undefined) {
      if (errors.length === 1) {
        errorWarningData += `=== Error ===\n${errors[0]}\n`;
      } else if (errors.length == 2) {
        errorWarningData += `=== Error ===\n${errors[0]}\n\n== Alternate explanation ==\n${errors[1]}\n`
      } else {
        errorWarningData += "=== Error ===\nUnknown error occurred.\n"; 
      }
      status = ImportTemplateStatus.ERROR_ON_PARSE;
    } else {
      if (template === null || typeof template !== "object") {
        errorWarningData += "=== Error ===\nProvided file is not a config file.\n"
        status = ImportTemplateStatus.ERROR_ON_STRUCTURE;
      } else {
        let badValueTypeErrorMessages = [];
  
        for (const [key, value] of Object.entries(template)) {
          if (value === null || value === undefined) {
            autoTTRecConfig[key] = value;
          } else if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
            autoTTRecConfig[key] = value;
          } else {
            badValueTypeErrorMessages.push(`${key} is not a string, boolean, number, or null/unspecified.\n`);
            autoTTRecConfig[key] = "<FILLME>";
          }
        }
        if (badValueTypeErrorMessages.length !== 0) {
          errorWarningData += `=== Command value errors ===\n${badValueTypeErrorMessages.join()}\n`;
          status = ImportTemplateStatus.ERROR_ON_VALUES;
        } else {
          status = ImportTemplateStatus.SUCCESS;
        }
      }
    }
  
    if (warnings.length !== 0) {
      errorWarningData += warnings.join();
    }
  }

  if (status === ImportTemplateStatus.INDETERMINATE) {
    errorWarningData += "=== Impossible error occurred===\n";
  }

  return {
    status: status,
    errorWarningData: errorWarningData,
    data: autoTTRecConfig,
    hasWarnings: warnings.length !== 0
  }
}

export async function importFormTemplate(event: IpcMainInvokeEvent, filename: string): Promise<ImportTemplateResult> {
  return await loadYAML_formatErrorsIfErrorOrWarnings(filename);
}

export async function writeObjectToYAML(event: IpcMainInvokeEvent, yamlObj: AutoTTRecConfig, filename: string): Promise<void> {
  const yamlObjAsStr = YAML.stringify(yamlObj);
  await fsPromises.writeFile(filename, yamlObjAsStr, "utf8");
}
