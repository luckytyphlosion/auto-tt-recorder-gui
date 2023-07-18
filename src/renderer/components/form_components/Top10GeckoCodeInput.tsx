import React, { useState } from "react";
import useRenderCounter from "../../RenderCounter";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import { FileFilter } from "electron";
import { FilenameAndContents } from "../../../shared-types"
import { SimpleErrorMessage } from "../SimpleErrorMessage";

import Modal from "react-modal";

import "./styles/Top10GeckoCodeInput.css";

export function Top10GeckoCodeInput() {
  const {register, getValues, setValue, getFieldState, formState} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "Top10GeckoCodeInput");
  const [timelineCategory, setTimelineCategory] = useState("notop10");

  function clearGeckoCodeFields() {
    setValue("top-10-gecko-code-filename", "", {shouldTouch: true});
    setValue("top-10-gecko-code-contents", "", {shouldTouch: true});
  }

  async function createNewFile(event: React.MouseEvent<HTMLButtonElement>) {
    if (getFieldState("top-10-gecko-code-contents").isDirty) {
      setIsOpen(true);
    } else {
      clearGeckoCodeFields();
    }
  }

  async function queueOpenDialogAndRead(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let filenameAndContents: FilenameAndContents = await window.api.openFileDialogAndRead(fileFilters);
    setValue("top-10-gecko-code-filename", filenameAndContents.filename, {shouldTouch: true});
    setValue("top-10-gecko-code-contents", filenameAndContents.contents, {shouldTouch: true});
  }

  async function queueSaveDialogAndWriteText(event: React.MouseEvent<HTMLButtonElement>, fileFilters: FileFilter[]) {
    let output = getValues("top-10-gecko-code-contents");
    let response = await window.api.saveFileDialog(fileFilters);
    setValue("top-10-gecko-code-filename", response, {shouldTouch: true});
  }

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsOpen(true);
  }

  function saveModalDiscardChanges(event: React.MouseEvent<HTMLButtonElement>) {
    clearGeckoCodeFields();
    setIsOpen(false);
  }

  function cancelSaveModal(event: React.MouseEvent<HTMLButtonElement>) {
    setIsOpen(false);
  }

  return (
    <div>
      <div>
        <Modal
          overlayClassName="top-10-gecko-code-save-modal"
          className="top-10-gecko-code-save-modal-contents"
          isOpen={modalIsOpen}
          onRequestClose={cancelSaveModal}
          shouldCloseOnOverlayClick={false}
          contentLabel="Save Gecko Code Dialog"
        >
          <h4>Save file "{getValues("top-10-gecko-code-filename")}"?</h4>
          <button onClick={cancelSaveModal}>Yes</button>
          <button onClick={saveModalDiscardChanges}>No</button>
          <button onClick={cancelSaveModal}>Cancel</button>
        </Modal>
    
        <label htmlFor="top-10-gecko-code-filename">Top 10 Gecko code filename:</label>
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
          queueOpenDialogAndRead(event, [
            {name: "Text files", extensions: ["txt"]}
          ]);
        }} type="button">Open&#8230;</button>

        {/*
        <button onClick={event => {
          queueSaveDialog(event, [
            {name: "Text files", extensions: ["txt"]}
          ]);
        }} type="button">Save as&#8230;</button>
        
        <button onClick={event => {
          queueSaveDialogAndWriteText(event, [
            {name: "Text files", extensions: ["txt"]}
          ]);
        }} type="button">Save as&#8230;</button>
        */}
      </div>
      <div>
        <textarea id="top-10-gecko-code-contents"
        cols={20} rows={16} wrap="soft"
        {...register("top-10-gecko-code-contents", {required: {
          value: true,
          message: "This input is required."
        }})}></textarea>
      </div>
      <SimpleErrorMessage name="top-10-gecko-code-filename"/>
      {renderCounter}
    </div>
  );
}
