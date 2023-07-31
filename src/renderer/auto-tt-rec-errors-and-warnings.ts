// A type describing the possible names for both auto-tt-recorder commands (combined extended-only and non-extended)
// and the possible names in AutoTTRecConfigFormFields
type AutoTTRecArgExtendedAndFormFieldName = AutoTTRecArgNameExtended | AutoTTRecConfigFormFieldName;

interface AutoTTRecConfigErrorOrWarningMessage {
  isWarning: boolean,
  message: string
}

const listFormatter = new Intl.ListFormat("en", {style: "long", type: "disjunction"});

class AutoTTRecConfigErrorsAndWarnings {
  private _errorsAndWarnings: Map<AutoTTRecArgExtendedAndFormFieldName, AutoTTRecConfigErrorOrWarningMessage[]>;
  private _errorsAndWarningsInvalidCommands: Map<string, AutoTTRecConfigErrorOrWarningMessage[]>;

  constructor() {
    this._errorsAndWarnings = new Map();
    this._errorsAndWarningsInvalidCommands = new Map();
  }

  private addToErrorsWarningMap<K extends string, M extends Map<K, AutoTTRecConfigErrorOrWarningMessage[]>>(name: K, message: string, isWarning: boolean, errorsAndWarnings: M) {
    let errorsAndWarningsForName = errorsAndWarnings.get(name);
    if (errorsAndWarningsForName === undefined) {
      errorsAndWarningsForName = [];
      errorsAndWarnings.set(name, errorsAndWarningsForName);
    }

    errorsAndWarningsForName.push({
      isWarning: isWarning,
      message: message
    });
  }

  private add(name: AutoTTRecArgExtendedAndFormFieldName, message: string, isWarning: boolean) {
    this.addToErrorsWarningMap(name, message, isWarning, this._errorsAndWarnings);
  }

  public addError(name: AutoTTRecArgExtendedAndFormFieldName, message: string) {
    if (name === "extra-gecko-codes-filename") {
      console.log("extra-gecko-codes-filename error message:", message);
    }
    this.add(name, message, false);
  }

  public addErrorWrongType(name: AutoTTRecArgExtendedAndFormFieldName, expectedTypes: string, value: string | number | boolean | null) {
    this.addError(name, `${name} should be a ${expectedTypes}, but got ${typeof value} instead. Option will be left empty.`);
  }

  public addInvalidChoiceError(name: AutoTTRecArgExtendedAndFormFieldName, validValues: ReadonlyArraySet<string>, actualValue: string, extraMessage: string = "") {
    this.addError(name, `${name} should be one of ${listFormatter.format(validValues.arr)}, but got ${actualValue} instead.${extraMessage}`);
  }

  public addKeyUndefinedWarning(name: AutoTTRecArgExtendedAndFormFieldName, objVariableName: string) {
    this.addWarning(name, `${objVariableName}["${name}"] was not defined! (this is an error within the program itself and not your fault, please contact the developer!)`);
  }

  public addWarning(name: AutoTTRecArgExtendedAndFormFieldName, message: string) {
    this.add(name, message, true);
  }

  public addErrorInvalidCommand(name: string) {
    this.addToErrorsWarningMap(name, `${name} is not a valid auto-tt-recorder command.`, false, this._errorsAndWarningsInvalidCommands);
  }

  public debug_get_errorsAndWarnings() {
    return this._errorsAndWarnings;
  }

  public compile() {
    let output: string[] = [];

    for (const [invalidCommandName, invalidCommandMessages] of this._errorsAndWarningsInvalidCommands.entries()) {
      output.push(`Error with ${invalidCommandName}:`);
      for (const invalidCommandMessage of invalidCommandMessages) {
        let curErrorOrWarningMessage: string;
  
        if (invalidCommandMessage.isWarning) {
          curErrorOrWarningMessage = "  Warning: ";
        } else {
          curErrorOrWarningMessage = "  Error: ";
        }

        curErrorOrWarningMessage += invalidCommandMessage.message;
        output.push(curErrorOrWarningMessage);
      }
    }

    output.push("\n");

    for (const [commandName, commandMessages] of this._errorsAndWarnings.entries()) {
      output.push(`Error with ${commandName}:`);
      for (const commandMessage of commandMessages) {
        let curErrorOrWarningMessage: string;
  
        if (commandMessage.isWarning) {
          curErrorOrWarningMessage = "  Warning: ";
        } else {
          curErrorOrWarningMessage = "  Error: ";
        }

        curErrorOrWarningMessage += commandMessage.message;
        output.push(curErrorOrWarningMessage);
      }
    }

    return output.join("\n");
  }
}