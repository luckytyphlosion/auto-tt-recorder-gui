
class AutoTTRecConfigPreprocessor {
  private autoTTRecConfig: AutoTTRecConfig;
  private errorsAndWarnings: AutoTTRecConfigErrorsAndWarnings;
  private autoTTRecConfigImporter: AutoTTRecConfigImporter | null;
  private autoTTRecConfigFilename: string;

  constructor(autoTTRecConfig: AutoTTRecConfig, errorsAndWarnings: AutoTTRecConfigErrorsAndWarnings, autoTTRecConfigFilename: string) {
    this.autoTTRecConfigImporter = null;
    this.autoTTRecConfig = shallowCopy(autoTTRecConfig);
    this.errorsAndWarnings = errorsAndWarnings;
    this.autoTTRecConfigFilename = autoTTRecConfigFilename;
  }

  private isAutoTTRecArgValueString_ignoreOnNullOrEmpty<K extends AutoTTRecArgNameExtended>(argName: K): string {
    let value = this.autoTTRecConfig[argName];
    if (value === null || value === "") {
      return "";
    } else {
      if (typeof value === "string") {
        return value;
      } else {
        this.errorsAndWarnings.addError(argName, `${argName} should be a string, but got ${typeof value} instead.`);
        return "";
      }
    }
  }

  private isAutoTTRecArgValueBoolean_ignoreNull<K extends AutoTTRecArgNameExtended>(argName: K): (boolean | null) {
    let value = this.autoTTRecConfig[argName];
    if (value === null) {
      return null;
    } else {
      if (typeof value === "boolean") {
        return value;
      } else {
        this.errorsAndWarnings.addError(argName, `${argName} should be a boolean, but got ${typeof value} instead.`);
        return null;
      }
    }
  }
  
  private findInvalidNamesAndFillInMissing() {
    let missingAutoTTRecArgNames = new Set([...AUTO_TT_REC_ARG_NAMES_EXTENDED.arr]);

    for (const [name, value] of Object.entries(this.autoTTRecConfig)) {
      let isAutoTTRecArgName = deleteFromSet(missingAutoTTRecArgNames, name);
      if (isAutoTTRecArgName) {
        if (typeof value === "string" && value.startsWith("<FILLME") && value.charAt(value.length - 1) == ">") {
          this.autoTTRecConfig[name] = "<FILLME>";
        } else {
          this.autoTTRecConfig[name] = value;
        }  
      } else {
        this.errorsAndWarnings.addErrorInvalidCommand(name);
      }
    }

    missingAutoTTRecArgNames.forEach((autoTTRecArgName) => {
      this.autoTTRecConfig[autoTTRecArgName] = null;
    });
  }

  private convertGhostAuto(ghostAutoOptionName: GhostAutoArgName,
    ghostFilenameOptionName: "main-ghost-filename" | "comparison-ghost-filename",
    ghostLinkOptionName: "chadsoft-ghost-page" | "chadsoft-comparison-ghost-page"
  ) {
    let ghostAutoValue = this.isAutoTTRecArgValueString_ignoreOnNullOrEmpty(ghostAutoOptionName);
    
    if (ghostAutoValue !== "") {
      let isGhostFilenameOptionValueOverridable = isFILLMEOrEmptyOrNull(this.autoTTRecConfig[ghostFilenameOptionName]);
      let isGhostLinkOptionValueOverridable = isFILLMEOrEmptyOrNull(this.autoTTRecConfig[ghostLinkOptionName]);

      if (!isGhostFilenameOptionValueOverridable && !isGhostLinkOptionValueOverridable) {
        this.errorsAndWarnings.addError(ghostAutoOptionName, `${ghostAutoOptionName} cannot be specified if ${ghostFilenameOptionName} and ${ghostLinkOptionName} are not <FILLME>, "", or null/unspecified. Option will be ignored.`);
      } else {
        if (ghostAutoValue === "<FILLME>") {
          this.autoTTRecConfig[ghostFilenameOptionName] = "<FILLME>";
          this.autoTTRecConfig[ghostLinkOptionName] = "<FILLME>";
        } else if (ghostAutoValue.match(chadsoftGhostPageLinkRegex)) {
          this.autoTTRecConfig[ghostLinkOptionName] = ghostAutoValue;
        } else {
          this.autoTTRecConfig[ghostFilenameOptionName] = ghostAutoValue;
        }
      }
    }
  }

  private convertNo200cc() {
    let no200cc = this.isAutoTTRecArgValueBoolean_ignoreNull("no-200cc");
    if (no200cc !== null) {
      let on200cc = this.autoTTRecConfig["on-200cc"];
      if (on200cc !== null) {
        if (typeof on200cc === "boolean") {
          if (on200cc && no200cc) {
            this.errorsAndWarnings.addError("no-200cc", "no-200cc cannot be true if on-200cc is true. Option will be ignored.");
          } else {
            this.autoTTRecConfig["on-200cc"] = !no200cc;
          }
        } else {
          this.errorsAndWarnings.addError("no-200cc", "no-200cc cannot be specified if on-200cc is not a boolean (true/false). Option will be ignored.");
        }
      } else {
        this.autoTTRecConfig["on-200cc"] = !no200cc;
      }
    } else {
      this.autoTTRecConfig["on-200cc"] = false;
    }

    this.autoTTRecConfig["set-200cc"] = this.autoTTRecConfig["on-200cc"] ? "on-200cc" : "no-200cc";
  }

  private fixAspectRatio16By9Type() {
    let aspectRatio16By9 = this.autoTTRecConfig["aspect-ratio-16-by-9"];
    if (aspectRatio16By9 !== null && aspectRatio16By9 !== "<FILLME>") {
      if (typeof aspectRatio16By9 === "string") {
        this.autoTTRecConfig["aspect-ratio-16-by-9"] = aspectRatio16By9.toLowerCase();
      } else if (typeof aspectRatio16By9 === "boolean") {
        this.autoTTRecConfig["aspect-ratio-16-by-9"] = aspectRatio16By9.toString().toLowerCase();
      } else {
        this.errorsAndWarnings.addErrorWrongType("aspect-ratio-16-by-9", "string or boolean", aspectRatio16By9);
        this.autoTTRecConfig["aspect-ratio-16-by-9"] = "<FILLME>";
      }
    }
  }

  private convertStringOrNumArgToString(stringOrNumArgName: "chadsoft-cache-expiry" | "speedometer-decimal-places" | "form-complexity", newArgName?: "speedometer-decimal-places-str") {
    let stringOrNumArgValue = this.autoTTRecConfig[stringOrNumArgName];
    let destValue: string | null;
    let destArgName: typeof stringOrNumArgName | Exclude<typeof newArgName, undefined>
    if (newArgName === undefined) {
      destArgName = stringOrNumArgName;
    } else {
      destArgName = newArgName;
    }

    if (stringOrNumArgValue === null) {
      destValue = null;
    } else if (stringOrNumArgValue === "<FILLME>") {
      destValue = "<FILLME>";
    } else {
      if (typeof stringOrNumArgValue !== "string") {
        if (typeof stringOrNumArgValue === "number") {
          destValue = stringOrNumArgValue.toString();
        } else {
          this.errorsAndWarnings.addErrorWrongType(stringOrNumArgName, "string or number", stringOrNumArgValue);
          destValue = "<FILLME>";
        }
      } else {
        destValue = stringOrNumArgValue;
      }
    }

    this.autoTTRecConfig[destArgName] = destValue;
  }

  private convertDifferingArgNames() {
    this.autoTTRecConfig["speedometer-style"] = this.autoTTRecConfig["speedometer"];
    this.autoTTRecConfig["output-width-custom"] = this.autoTTRecConfig["output-width"];
  }

  private removeFFmpegFFprobeArgs() {
    delete this.autoTTRecConfig["ffmpeg-filename"];
    delete this.autoTTRecConfig["ffprobe-filename"];
  }

  private warnUnsupportedArg(autoTTRecUnsupportedArgName: AutoTTRecUnsupportedArgName) {
    if (this.autoTTRecConfig[autoTTRecUnsupportedArgName] !== null) {
      this.errorsAndWarnings.addWarning(autoTTRecUnsupportedArgName, `${autoTTRecUnsupportedArgName} is not currently supported, will be ignored.`);
    }
  }

  public preprocess() {
    if (this.autoTTRecConfigImporter === null) {
      this.findInvalidNamesAndFillInMissing();
      this.convertGhostAuto("main-ghost-auto", "main-ghost-filename", "chadsoft-ghost-page");
      this.convertGhostAuto("comparison-ghost-auto", "comparison-ghost-filename", "chadsoft-comparison-ghost-page");
      this.convertNo200cc();
      this.fixAspectRatio16By9Type();
      this.convertStringOrNumArgToString("chadsoft-cache-expiry");
      this.convertStringOrNumArgToString("speedometer-decimal-places", "speedometer-decimal-places-str");
      this.convertStringOrNumArgToString("form-complexity");
      this.convertDifferingArgNames();
      this.removeFFmpegFFprobeArgs();
      for (const unsupportedArgName of UNSUPPORTED_ARG_NAMES.arr)  {
        this.warnUnsupportedArg(unsupportedArgName);
      }
      this.autoTTRecConfigImporter = new AutoTTRecConfigImporter(this.autoTTRecConfig, this.errorsAndWarnings, this.autoTTRecConfigFilename);
    }

    return this.autoTTRecConfigImporter;
  }
}
