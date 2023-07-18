import React, { useState } from "react";
import useRenderCounter from "../../RenderCounter";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { FilenameAndContents } from "../../../shared-types"
import { SimpleErrorMessage } from "../SimpleErrorMessage";

import Modal from "react-modal";

import "./styles/Top10GeckoCodeInput.css";

enum SaveModalFrom {
  CLOSING,
  NEW,
  OPEN
}

export function Top10GeckoCodeInput() {
  const {register, getValues, setValue, formState} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "Top10GeckoCodeInput");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isGeckoCodeUnsaved, setGeckoCodeUnsaved] = useState(false);

  const [saveModalFrom, setSaveModalFrom] = useState(SaveModalFrom.CLOSING);

  function clearGeckoCodeFields() {
    setValue("top-10-gecko-code-filename", "", {shouldTouch: true});
    setValue("top-10-gecko-code-contents", "", {shouldTouch: true});
    setGeckoCodeUnsaved(false);
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
    let filenameAndContents: FilenameAndContents = await window.api.openFileDialogAndRead(fileFilters);
    if (filenameAndContents.filename !== "") {
      setValue("top-10-gecko-code-filename", filenameAndContents.filename, {shouldTouch: true});
      setValue("top-10-gecko-code-contents", filenameAndContents.contents, {shouldTouch: true});
      setGeckoCodeUnsaved(false);
    }
  }

  async function saveGeckoCodeContents(event: React.MouseEvent<HTMLButtonElement>): Promise<boolean> {
    let top10GeckoCodeFilename = getValues("top-10-gecko-code-filename");
    let top10GeckoCodeContents = getValues("top-10-gecko-code-contents");
    let success: boolean;
    if (top10GeckoCodeFilename === "") {
      success = await queueSaveDialogAndWriteText(event, [
        {name: "Text files", extensions: ["txt"]}
      ]);
    } else {
      try {
        await window.api.overwriteTextFile(top10GeckoCodeFilename, top10GeckoCodeContents);
        success = true;
      } catch (e) {
        alert(`Error when trying to save gecko code file: ${(e as Error).message}`);
        success = false;
      }
    }

    if (success) {
      setGeckoCodeUnsaved(false);
    }
  
    return success;
  }

  async function queueSaveDialogAndWriteText(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]): Promise<boolean> {
    let defaultPath: string = getValues("top-10-gecko-code-filename");
    let output: string = getValues("top-10-gecko-code-contents");
    let success: boolean;

    try {
      let response = await window.api.saveFileDialogAndWriteText(fileFilters, output, defaultPath);
      if (response !== "") {
        setValue("top-10-gecko-code-filename", response, {shouldTouch: true});
        success = true;
      } else {
        success = false;
      }
    } catch (e) {
      alert(`Error when trying to save gecko code file: ${(e as Error).message}`);
      success = false;
    }

    if (success) {
      setGeckoCodeUnsaved(false);
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

  let top10GeckoCodeFilename = getValues("top-10-gecko-code-filename");

  return (
    <div>
      <div>
        <h3>Gecko code (created at tt-rec.com)</h3>
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
          <button onClick={saveModal_saveChanges}>Yes</button>
          <button onClick={saveModal_discardChanges}>No</button>
          <button onClick={saveModal_cancel}>Cancel</button>
        </Modal>

        <label htmlFor="top-10-gecko-code-filename">Filename:</label>
        <input type="text" readOnly
          {...register("top-10-gecko-code-filename", {required: {
            value: true,
            message: "This input is required."
          }})}
        ></input>

        <button onClick={event => {
          createNewFile(event);
        }} type="button">New</button>
        

        <button onClick={event => {
          openFile(event);
        }} type="button">Open&#8230;</button>

        <button onClick={event => {
          queueSaveDialogAndWriteText(event, [
            {name: "Text files", extensions: ["txt"]}
          ]);
        }} type="button">Save as&#8230;</button>
      </div>
      <div>
        <h4>Gecko code {isGeckoCodeUnsaved ? "(Unsaved)" : ""}</h4>
        <textarea id="top-10-gecko-code-contents"
        cols={20} rows={16} wrap="soft"
        {...register("top-10-gecko-code-contents", {
          required: {
            value: true,
            message: "This input is required.",
          },
          onChange: event => setGeckoCodeUnsaved(true)
        })}></textarea>
      </div>
      <SimpleErrorMessage name="top-10-gecko-code-filename"/>
      {renderCounter}
    </div>
  );
}
