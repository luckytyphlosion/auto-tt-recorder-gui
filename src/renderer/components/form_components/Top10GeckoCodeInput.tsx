import React, { useState } from "react";
import useRenderCounter from "../../RenderCounter";
import { Controller, ValidateResult } from "react-hook-form";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { FilenameAndContents } from "../../../shared/shared-types"
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { EditorView } from "@codemirror/view";

import { ClearableReadonlyTextInput } from "../generic_components/ClearableReadonlyTextInput";

import { isFileReadableAndHasCorrectExtension } from "../../util-renderer";

import CodeMirror from '@uiw/react-codemirror';

import Modal from "react-modal";

import "./styles/Top10GeckoCodeInput.css";

enum SaveModalFrom {
  CLOSING,
  NEW,
  OPEN
}

const borderTheme = EditorView.theme({
  "&": {
      border: "1px solid #c0c0c0"
  },
  "&.cm-editor.cm-focused": {
      outline: "none"
  }
});

const top10RegionDependentGeckoCodes = new Set(["C260BFAC", "C26414CC", "C260B720", "C25FA3CC"]);

// 
export function Top10GeckoCodeInput(props: {isAutoTTRecRunning: boolean}) {
  const {register, getValues, setValue, control, setError} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "Top10GeckoCodeInput");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isGeckoCodeUnsaved, setGeckoCodeUnsaved] = useState(getValues("top-10-gecko-code-unsaved"));
  const [top10GeckoCodeFilename, setTop10GeckoCodeFilename] = useState(getValues("top-10-gecko-code-filename"));
  const [top10GeckoCodeInvalid, setTop10GeckoCodeInvalid] = useState(false);

  const [saveModalFrom, setSaveModalFrom] = useState(SaveModalFrom.CLOSING);

  function updateTop10GeckoCodeFilename(newTop10GeckoCodeFilename: string) {
    setTop10GeckoCodeFilename(newTop10GeckoCodeFilename);
    setValue("top-10-gecko-code-filename", newTop10GeckoCodeFilename, {shouldTouch: true});
  }
  function clearGeckoCodeFields() {
    updateTop10GeckoCodeFilename("");
    setValue("top-10-gecko-code-contents", "", {shouldTouch: true});
    updateGeckoCodeUnsaved(false);
  }

  function updateGeckoCodeUnsaved(newGeckoCodeUnsaved: boolean) {
    setGeckoCodeUnsaved(newGeckoCodeUnsaved);
    setValue("top-10-gecko-code-unsaved", newGeckoCodeUnsaved, {shouldTouch: true});
  }

  function updateTop10GeckoCodeFilenameAfterRightClick(newTop10GeckoCodeFilename: string) {
    if (newTop10GeckoCodeFilename !== top10GeckoCodeFilename) {
      updateGeckoCodeUnsaved(true);
    }
    setTop10GeckoCodeFilename(newTop10GeckoCodeFilename);
  }

  function setSaveModalOpenAndFrom(newModalOpen: boolean, newSaveModalFrom: SaveModalFrom) {
    setModalOpen(newModalOpen);
    setSaveModalFrom(newSaveModalFrom);
  }

  async function createNewFile(event: React.MouseEvent<HTMLButtonElement>) {
    if (isGeckoCodeUnsaved) {
      setSaveModalOpenAndFrom(true, SaveModalFrom.NEW);
    } else {
      clearGeckoCodeFields();
    }
  }

  async function openFile(event: React.MouseEvent<HTMLButtonElement>) {
    if (isGeckoCodeUnsaved) {
      setSaveModalOpenAndFrom(true, SaveModalFrom.OPEN);
    } else {
      await queueOpenDialogAndRead(event, [
        {name: "Text files", extensions: ["txt"]}
      ]);
    }
  }

  async function queueOpenDialogAndRead(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let filenameAndContents: FilenameAndContents = await window.api.openFileDialogAndRead(fileFilters, getValues("top-10-gecko-code-filename"), "top-10-gecko-code", "Top 10 Gecko Code file");
    let newTop10GeckoCodeFilename: string | undefined;
    let newTop10GeckoCodeContents: string | undefined;
    let newGeckoCodeUnsaved: boolean | undefined;

    if (filenameAndContents.errorMessage !== "") {
      // error message that still allows reading in contents
      if (filenameAndContents.contents !== "") {
        newTop10GeckoCodeFilename = "";
        newTop10GeckoCodeContents = filenameAndContents.contents;
        newGeckoCodeUnsaved = true;
      } else {
        newTop10GeckoCodeFilename = "";
        newTop10GeckoCodeContents = "";
        newGeckoCodeUnsaved = true;
      }
      setError("top-10-gecko-code-filename", {
        type: "custom",
        message: filenameAndContents.errorMessage
      });
    } else if (filenameAndContents.filename !== "") {
      newTop10GeckoCodeFilename = filenameAndContents.filename;
      newTop10GeckoCodeContents = filenameAndContents.contents;
      newGeckoCodeUnsaved = false;
    }

    if (newTop10GeckoCodeFilename !== undefined) {
      updateTop10GeckoCodeFilename(newTop10GeckoCodeFilename);
    }

    if (newTop10GeckoCodeContents !== undefined) {
      setValue("top-10-gecko-code-contents", newTop10GeckoCodeContents, {shouldTouch: true});
    }

    if (newGeckoCodeUnsaved !== undefined) {
      updateGeckoCodeUnsaved(newGeckoCodeUnsaved);
    }
  }

  async function queueSaveDialogAndWriteText(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]): Promise<boolean> {
    let defaultPath: string = top10GeckoCodeFilename;
    let output: string = getValues("top-10-gecko-code-contents");
    let success: boolean;

    try {
      let response = await window.api.saveFileDialogAndWriteText(fileFilters, output, defaultPath, "top-10-gecko-code");
      if (response !== "") {
        updateTop10GeckoCodeFilename(response);
        success = true;
      } else {
        success = false;
      }
    } catch (e) {
      alert(`Error when trying to save gecko code file: ${(e as Error).message}`);
      success = false;
    }

    if (success) {
      updateGeckoCodeUnsaved(false);
    }

    return success;
  }

  async function newOrOpenGeckoCodeFile(event: React.MouseEvent<HTMLButtonElement>) {
    if (saveModalFrom == SaveModalFrom.NEW) {
      clearGeckoCodeFields();
    } else if (saveModalFrom == SaveModalFrom.OPEN) {
      await queueOpenDialogAndRead(event, [
        {name: "Text files", extensions: ["txt"]}
      ]);
    }
    setSaveModalOpenAndFrom(false, SaveModalFrom.CLOSING);
  }

  async function saveModal_saveChanges(event: React.MouseEvent<HTMLButtonElement>) {
    let saveSuccess = await queueSaveDialogAndWriteText(event, [
      {name: "Text files", extensions: ["txt"]}
    ]);

    setSaveModalOpenAndFrom(false, SaveModalFrom.CLOSING);

    if (saveSuccess) {
      newOrOpenGeckoCodeFile(event);
    }
  }

  async function saveModal_discardChanges(event: React.MouseEvent<HTMLButtonElement>) {
    await newOrOpenGeckoCodeFile(event);
  }

  function saveModal_cancel(event: React.MouseEvent<HTMLButtonElement>) {
    setSaveModalOpenAndFrom(false, SaveModalFrom.CLOSING);
  }

  async function geckoCodeValidator(): Promise<ValidateResult> {
    setTop10GeckoCodeInvalid(false);
    if (isGeckoCodeUnsaved || top10GeckoCodeFilename === "") {
      return "Please save your gecko code first.";
    } else {
      let isGeckoCodeFilenameReadableAndHasCorrectExtensionValidateResult = await isFileReadableAndHasCorrectExtension(
        top10GeckoCodeFilename, ["txt"],
        { 
          wrongExtensionErrorMessageSingularPrefix: "Top 10 Gecko Code file",
          unreadableErrorMessagePrefix: "Top 10 Gecko Code file"
        }
      );
      if (isGeckoCodeFilenameReadableAndHasCorrectExtensionValidateResult !== true) {
        updateGeckoCodeUnsaved(true);
        return isGeckoCodeFilenameReadableAndHasCorrectExtensionValidateResult;
      }

      let top10GeckoCodeContents = getValues("top-10-gecko-code-contents");
      let lines = top10GeckoCodeContents.split("\n");
      let foundTop10Code = false;
      let top10CodeErrorMsgOrSuccess: boolean | string = "";

      for (const [index, untrimmedLine] of lines.entries()) {
        let lineNum = index + 1;
  
        const line = untrimmedLine.trim();
        if (line === "") {
          continue;
        }
        let isGeckoCodeValid = true;
        let codelineSplit = line.split(/\s+/, 2);
        if (codelineSplit.length !== 2) {
          isGeckoCodeValid = false;
        } else {
          let [codelineFirstHalf, codelineSecondHalf] = codelineSplit;
          codelineFirstHalf = codelineFirstHalf.trim();
          codelineSecondHalf = codelineSecondHalf.trim();
          
          if (!/^[0-9A-Fa-f]{8}$/.test(codelineFirstHalf) || !/^[0-9A-Fa-f]{8}$/.test(codelineSecondHalf)) {
            isGeckoCodeValid = false;
          } else {
            if (top10RegionDependentGeckoCodes.has(codelineFirstHalf.toUpperCase())) {
              if (foundTop10Code) {
                top10CodeErrorMsgOrSuccess = "Broken code provided! Please try creating it again.";
                break;
              }
              foundTop10Code = true;
            }
          }

          if (!isGeckoCodeValid) {
            top10CodeErrorMsgOrSuccess = `Error: bad line \"${line}\" at line ${lineNum}.`;
            break;
          }
        }
      }

      if (top10CodeErrorMsgOrSuccess === "") {
        if (foundTop10Code) {
          top10CodeErrorMsgOrSuccess = true;
        } else {
          top10CodeErrorMsgOrSuccess = "Error: Provided gecko code is not a custom top 10 code.";
        }
      }

      if (top10CodeErrorMsgOrSuccess !== true) {
        setTop10GeckoCodeInvalid(true);
      }
      return top10CodeErrorMsgOrSuccess;
    }
  }

  return (
    <div>
      <div>
        {/*<h4>Top 10 Gecko code (create using <a href="https://tt-rec.com/customtop10">https://tt-rec.com/customtop10</a>)</h4>*/}
        <input type="hidden" {...register("top-10-gecko-code-unsaved")}/>
        <Modal
          overlayClassName="top-10-gecko-code-save-modal"
          className="top-10-gecko-code-save-modal-contents"
          isOpen={isModalOpen}
          onRequestClose={saveModal_cancel}
          shouldCloseOnOverlayClick={false}
          contentLabel="Save Gecko Code Dialog"
        >
          {top10GeckoCodeFilename !== "" ?
            <h4>Save gecko code file "{top10GeckoCodeFilename}"?</h4>
            : <h4>Save Untitled gecko code file?</h4>
          }
          <button type="button" onClick={saveModal_saveChanges}>Yes</button>
          <button type="button" onClick={saveModal_discardChanges}>No</button>
          <button type="button" onClick={saveModal_cancel}>Cancel</button>
        </Modal>

        <div className="like-input-group">
          <div className="grid-contents">
            <label className="start-label" htmlFor="top-10-gecko-code-filename">Top 10 Gecko Code Filename:</label>
            <div className="start-label-contents">
              <ClearableReadonlyTextInput name="top-10-gecko-code-filename" notRequired={true} validate={geckoCodeValidator} setState={updateTop10GeckoCodeFilenameAfterRightClick}/>
              <button type="button" onClick={event => {
                createNewFile(event);
              }}>New</button>


              <button type="button" onClick={event => {
                openFile(event);
              }}>Open&#8230;</button>

              <button type="button" onClick={event => {
                queueSaveDialogAndWriteText(event, [
                  {name: "Text files", extensions: ["txt"]}
                ]);
              }}>Save as&#8230;</button>
            </div>
            <div className="start-label"></div>
            <div className="start-label-contents">
            {
              (isGeckoCodeUnsaved || top10GeckoCodeFilename === "" || top10GeckoCodeInvalid) ?
                <SimpleErrorMessage name="top-10-gecko-code-filename"/>
                : ""
            }
            </div>
          </div>
        </div>
      </div>
      <div className="like-input-group">
        <div className="grid-contents">
        <label className="start-label">Gecko code contents{isGeckoCodeUnsaved ? " (Unsaved)" : ""}:<br/><strong>Create using:<br/><a href="https://tt-rec.com/customtop10">https://tt-rec.com/customtop10</a></strong></label>
        <div className="start-label-contents">
          <Controller
            render={({
              field: {onChange, onBlur, value, ref},
              fieldState: {invalid, isTouched, isDirty, error},
            }) => (
              <CodeMirror
                value={value}
                height="16em"
                width="15em"
                theme={borderTheme}
                editable={!props.isAutoTTRecRunning}
                onChange={(event) => {
                  updateGeckoCodeUnsaved(true);
                  onChange(event);
                }}
                onBlur={onBlur}
                ref={ref}
              />
            )}
            name="top-10-gecko-code-contents"
            control={control}
          />
        </div>
      </div>


          
        {/*<textarea id="top-10-gecko-code-contents"
        cols={20} rows={16} wrap="soft"
        {...register("top-10-gecko-code-contents", {

          
        })}></textarea>*/}

      </div>
      
      {renderCounter}
    </div>
  );
}
