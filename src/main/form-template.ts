import { IpcMainInvokeEvent } from "electron";

import { AutoTTRecConfig, ReadTemplateStatus, ReadTemplateResult, StringOrError } from "../shared/shared-types";
import { readFileEnforceUTF8_returnError } from "./gui2";

import fsPromises from "fs/promises";
import path from "path";
import JSYAML, { YAMLException, JSON_SCHEMA } from "js-yaml";
import YAML from "yaml";

function appendWarning(warnings: string[], warning: string) {
  let warningNum: number = warnings.length + 1;
  let formattedWarning: string = `=== Warning ${warningNum} ===\n${warning}\n`;
  warnings.push(formattedWarning);
}

async function loadYAML_formatErrorsIfErrorOrWarnings(filename: string): Promise<ReadTemplateResult> {
  let templateContents: string = "";
  let errorWarningData: string = "";
  let errors: string[] = [];
  let warnings: string[] = [];
  let status: ReadTemplateStatus = ReadTemplateStatus.INDETERMINATE;
  let autoTTRecConfig: AutoTTRecConfig = {};
  let contentsOrError: StringOrError = await readFileEnforceUTF8_returnError(filename, "Provided template file is not a text file!");

  if (!contentsOrError.hasError) {
    if (contentsOrError.result === "") {
      errorWarningData += `=== Error ===\nProvided template file is empty!\n`;
      status = ReadTemplateStatus.ERROR_ON_READ;
    } else {
      templateContents = contentsOrError.result;
    }
  } else {
    errorWarningData += `=== Error ===\n${contentsOrError.errorMessage}\n`;
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
      status = ReadTemplateStatus.ERROR_ON_PARSE;
    } else {
      if (template === null || typeof template !== "object") {
        errorWarningData += "=== Error ===\nProvided file is not a config file.\n"
        status = ReadTemplateStatus.ERROR_ON_STRUCTURE;
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
          status = ReadTemplateStatus.ERROR_ON_VALUES;
        } else {
          status = ReadTemplateStatus.SUCCESS;
        }
      }
    }
  
    if (warnings.length !== 0) {
      errorWarningData += warnings.join();
    }
  }

  if (status === ReadTemplateStatus.INDETERMINATE) {
    errorWarningData += "=== Impossible error occurred===\n";
  }

  return {
    status: status,
    errorCode: contentsOrError.errorCode,
    errorWarningData: errorWarningData,
    data: autoTTRecConfig,
    hasWarnings: warnings.length !== 0
  }
}

export async function importFormTemplate(event: IpcMainInvokeEvent, filename: string): Promise<ReadTemplateResult> {
  return await loadYAML_formatErrorsIfErrorOrWarnings(filename);
}

export async function writeObjectToYAML(event: IpcMainInvokeEvent, yamlObj: AutoTTRecConfig, filename: string): Promise<void> {
  const yamlObjAsStr = YAML.stringify(yamlObj);
  await fsPromises.writeFile(filename, yamlObjAsStr, "utf8");
}
