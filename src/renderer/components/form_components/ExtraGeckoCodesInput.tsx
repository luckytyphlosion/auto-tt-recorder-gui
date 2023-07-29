import React, { useState } from "react";
import useRenderCounter from "../../RenderCounter";
import { Controller, ValidateResult } from "react-hook-form";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { FilenameAndContents } from "../../../shared/shared-types"
import { SimpleErrorMessage } from "../SimpleErrorMessage";
import { EditorView } from "@codemirror/view";

import CodeMirror from '@uiw/react-codemirror';

import Modal from "react-modal";

import "./styles/ExtraGeckoCodesInput.css";

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

export function ExtraGeckoCodesInput(props: {isAutoTTRecRunning: boolean}) {
  const {register, getValues, setValue, control, formState} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "ExtraGeckoCodesInput");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isGeckoCodeUnsaved, setGeckoCodeUnsaved] = useState(getValues("extra-gecko-codes-unsaved"));
  const [extraGeckoCodesFilename, setExtraGeckoCodesFilename] = useState(getValues("extra-gecko-codes-filename"));

  const [saveModalFrom, setSaveModalFrom] = useState(SaveModalFrom.CLOSING);

  function updateExtraGeckoCodesFilename(newExtraGeckoCodesFilename: string) {
    setExtraGeckoCodesFilename(newExtraGeckoCodesFilename);
    setValue("extra-gecko-codes-filename", newExtraGeckoCodesFilename, {shouldTouch: true});
  }

  function clearGeckoCodeFields() {
    updateExtraGeckoCodesFilename("");
    setValue("extra-gecko-codes-contents", "", {shouldTouch: true});
    updateGeckoCodeUnsaved(false);
  }

  function updateGeckoCodeUnsaved(newGeckoCodeUnsaved: boolean) {
    setGeckoCodeUnsaved(newGeckoCodeUnsaved);
    setValue("extra-gecko-codes-unsaved", newGeckoCodeUnsaved, {shouldTouch: true});
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
        {name: "ini files", extensions: ["ini"]}
      ]);
    }
  }

  async function queueOpenDialogAndRead(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let filenameAndContents: FilenameAndContents = await window.api.openFileDialogAndRead(fileFilters, getValues("extra-gecko-codes-filename"), "extra-gecko-codes");
    if (filenameAndContents.filename !== "") {
      updateExtraGeckoCodesFilename(filenameAndContents.filename);
      setValue("extra-gecko-codes-contents", filenameAndContents.contents, {shouldTouch: true});
      updateGeckoCodeUnsaved(false);
    } else if (filenameAndContents.contents !== "") {
      // read error occurred
      updateExtraGeckoCodesFilename("");
      setValue("extra-gecko-codes-contents", filenameAndContents.contents, {shouldTouch: true});
      updateGeckoCodeUnsaved(true);
    }
  }

  async function queueSaveDialogAndWriteText(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]): Promise<boolean> {
    let defaultPath: string = getValues("extra-gecko-codes-filename");
    let output: string = getValues("extra-gecko-codes-contents");
    let success: boolean;

    try {
      let response = await window.api.saveFileDialogAndWriteText(fileFilters, output, defaultPath, "extra-gecko-codes");
      if (response !== "") {
        updateExtraGeckoCodesFilename(response);
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
      console.log("extra gecko queueSaveDialogAndWriteText formState.errors:", formState);
    }

    return success;
  }

  async function newOrOpenGeckoCodeFile(event: React.MouseEvent<HTMLButtonElement>) {
    if (saveModalFrom == SaveModalFrom.NEW) {
      clearGeckoCodeFields();
    } else if (saveModalFrom == SaveModalFrom.OPEN) {
      await queueOpenDialogAndRead(event, [
        {name: "ini files", extensions: ["ini"]}
      ]);
    }
    setSaveModalOpenAndFrom(false, SaveModalFrom.CLOSING);
  }

  async function saveModal_saveChanges(event: React.MouseEvent<HTMLButtonElement>) {
    let saveSuccess = await queueSaveDialogAndWriteText(event, [
      {name: "ini files", extensions: ["ini"]}
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
    if (isGeckoCodeUnsaved || extraGeckoCodesFilename === "") {
      return "Please save your gecko code first.";
    } else if (getValues("extra-gecko-codes-contents").length === 0) {
      return "Gecko code file can't be empty!";
    } else {
      let geckoCodeFilename = getValues("extra-gecko-codes-filename");
      if (await window.api.isFileReadable(geckoCodeFilename)) {
        return true;
      } else {
        updateGeckoCodeUnsaved(true);
        return "Gecko code file does not exist (deleted or renamed outside of the program) or is not readable."
      }
    }
  }

  return (
    <div>
      <div>
        <h3>Extra gecko codes</h3>
        <input type="hidden" {...register("extra-gecko-codes-unsaved")}/>
        <Modal
          overlayClassName="extra-gecko-codes-save-modal"
          className="extra-gecko-codes-save-modal-contents"
          isOpen={isModalOpen}
          onRequestClose={saveModal_cancel}
          shouldCloseOnOverlayClick={false}
          contentLabel="Save Gecko Code Dialog"
        >
          {extraGeckoCodesFilename !== "" ?
            <h4>Save gecko code file "{extraGeckoCodesFilename}"?</h4>
            : <h4>Save Untitled gecko code file?

            </h4>
          }
          <button onClick={saveModal_saveChanges}>Yes</button>
          <button onClick={saveModal_discardChanges}>No</button>
          <button onClick={saveModal_cancel}>Cancel</button>
        </Modal>

        <label htmlFor="extra-gecko-codes-filename">Filename:</label>
        <input type="text" readOnly
          {...register("extra-gecko-codes-filename", {validate: geckoCodeValidator})}
        ></input>

        <button onClick={event => {
          createNewFile(event);
        }} type="button">New</button>
        

        <button onClick={event => {
          openFile(event);
        }} type="button">Open&#8230;</button>

        <button onClick={event => {
          queueSaveDialogAndWriteText(event, [
            {name: "ini files", extensions: ["ini"]}
          ]);
        }} type="button">Save as&#8230;</button>
      </div>
      <div>
        {
          (isGeckoCodeUnsaved || extraGeckoCodesFilename === "") ?
            <SimpleErrorMessage name="extra-gecko-codes-filename"/> : ""
        }
        <h4>Gecko code {isGeckoCodeUnsaved ? "(Unsaved)" : ""}</h4>
        <Controller
          render={({
            field: {onChange, onBlur, value, ref},
            fieldState: {invalid, isTouched, isDirty, error},
          }) => (
            <CodeMirror
              value={value}
              height="16em"
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
          name="extra-gecko-codes-contents"
          control={control}
        />
      </div>
      
      {renderCounter}
    </div>
  );
}
