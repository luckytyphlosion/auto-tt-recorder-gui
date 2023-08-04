import React, { useState, useRef, useEffect, MouseEventHandler } from "react";

import TextareaAutosize from 'react-textarea-autosize';
import Modal from "react-modal";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { AutoTTRecConfigFormFields } from "../auto-tt-rec-form-field-types";
import { ImportTemplateResult, ImportTemplateStatus, AutoTTRecConfig } from "../../shared/shared-types";
import { useFormContextAutoTT } from "../use-form-context-auto-tt";

import { convertAutoTTRecConfigToFormData, tryExportAutoTTRecConfigTemplate, ExportTemplateStatus, ExportTemplateResult } from "../auto-tt-rec-form-data-generators";

import { BooleanFILLME } from "../../shared/shared-types";

import { ErrorWarningDisplay } from "./ErrorWarningDisplay";
import { YAMLParseErrorExplanation } from "./YAMLParseErrorExplanation";

import "./form_components/styles/ExtraGeckoCodesInput.css";
import "../styles/ImportTemplate.css";

export function ImportTemplate(props: {
  formMethods: UseFormReturn<AutoTTRecConfigFormFields, any, undefined>,
  setUnrenderFormToggle: React.Dispatch<React.SetStateAction<boolean>>,
  onError: (errors: Object) => Promise<void> | void,
  disabled: boolean
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [importStatus, setImportStatus] = useState(ImportTemplateStatus.SUCCESS);
  const [readYAMLErrorWarningTitle, setReadYAMLErrorWarningTitle] = useState("");
  const [readYAMLErrorWarningData, setReadYAMLErrorWarningData] = useState("");
  const [importOrExportErrorWarningTitle, setImportOrExportErrorWarningTitle] = useState("");
  const [importOrExportErrorWarningData, setImportOrExportErrorWarningData] = useState("");
  const [isImporting, setIsImporting] = useState(false);

  const [formDataToggle, setNewFormDataToggle] = useState<BooleanFILLME>("<FILLME>");

  const [autoTTRecTemplateFilename, setAutoTTRecTemplateFilename] = useState("");

  //const formDataRef = useRef<AutoTTRecConfigFormFields | null>(null);

  async function onClickImportTemplate(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let newAutoTTRecTemplateFilename = await window.api.openFileDialog([{name: "YAML files", extensions: ["yml"]}], autoTTRecTemplateFilename, "template");
    if (newAutoTTRecTemplateFilename !== "") {
      setAutoTTRecTemplateFilename(newAutoTTRecTemplateFilename);

      let importTemplateResult: ImportTemplateResult = await window.api.importFormTemplate(newAutoTTRecTemplateFilename);

      let newReadYAMLErrorWarningTitle: string = "";
      let newReadYAMLErrorWarningData: string = "";
      let newImportErrorWarningTitle: string = "";
      let newImportErrorWarningData: string = "";

      setImportStatus(importTemplateResult.status);

      if (importTemplateResult.status === ImportTemplateStatus.SUCCESS) {
        if (importTemplateResult.hasWarnings) {
          newReadYAMLErrorWarningTitle = "Read template successfully, but warnings occurred below";
          newReadYAMLErrorWarningData = importTemplateResult.errorWarningData;
        }

        let formComplexity = props.formMethods.getValues("form-complexity");
        let [newFormData, errorsAndWarningsStr] = await convertAutoTTRecConfigToFormData(importTemplateResult.data, newAutoTTRecTemplateFilename, formComplexity);
        if (errorsAndWarningsStr !== "") {
          newImportErrorWarningTitle = "Errors and/or warnings occurred when importing template";
        } else {
          newImportErrorWarningTitle = "Imported template successfully!";
        }
        newImportErrorWarningData = errorsAndWarningsStr;
        props.setUnrenderFormToggle(true);
        props.formMethods.reset(newFormData);
        console.log("newFormData:", newFormData);
      } else {
        newReadYAMLErrorWarningTitle = "Errors and/or warnings occurred when reading template";
        newReadYAMLErrorWarningData = importTemplateResult.errorWarningData;
      }

      setReadYAMLErrorWarningTitle(newReadYAMLErrorWarningTitle);
      setReadYAMLErrorWarningData(newReadYAMLErrorWarningData);
      setImportOrExportErrorWarningTitle(newImportErrorWarningTitle);
      setImportOrExportErrorWarningData(newImportErrorWarningData);
      setIsImporting(true);
      setModalOpen(true);
    }
  }

  async function onClickExportTemplate(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let newAutoTTRecTemplateFilename = await window.api.saveFileDialog([{name: "YAML files", extensions: ["yml"]}], autoTTRecTemplateFilename, "template");
    if (newAutoTTRecTemplateFilename !== "") {
      setAutoTTRecTemplateFilename(newAutoTTRecTemplateFilename);

      let formData: AutoTTRecConfigFormFields = props.formMethods.getValues();
      let exportTemplateResult = await tryExportAutoTTRecConfigTemplate(formData, newAutoTTRecTemplateFilename);

      setReadYAMLErrorWarningTitle("");
      setReadYAMLErrorWarningData("");

      let newExportErrorWarningTitle: string = "";
      let newExportErrorWarningData: string = "";

      if (exportTemplateResult.status === ExportTemplateStatus.SUCCESS) {
        newExportErrorWarningTitle = "Exported template successfully!";
      } else {
        newExportErrorWarningTitle = "Errors and/or occurred while exporting template";
        newExportErrorWarningData = exportTemplateResult.errorWarningData;
      }

      setImportOrExportErrorWarningTitle(newExportErrorWarningTitle);
      setImportOrExportErrorWarningData(newExportErrorWarningData);
      setIsImporting(false);
      setModalOpen(true);
    }
  }

  function importExportTemplateModal_cancel(event: React.MouseEvent<HTMLButtonElement>) {
    if (isImporting) {
      props.setUnrenderFormToggle(false);
      setNewFormDataToggle((formDataToggle) => !formDataToggle);  
    }
    setModalOpen(false);
  }

  useEffect(() => {
    if (formDataToggle !== "<FILLME>") {
      props.formMethods.handleSubmit(() => {}, props.onError)();
    }
  }, [formDataToggle]);

  return (
    <div>
      <Modal
        overlayClassName="extra-gecko-codes-save-modal"
        className="extra-gecko-codes-save-modal-contents import-template-modal-contents"
        isOpen={isModalOpen}
        onRequestClose={importExportTemplateModal_cancel}
        shouldCloseOnOverlayClick={false}
        contentLabel="Import or Export Template Modal"
      >
        <ErrorWarningDisplay title={readYAMLErrorWarningTitle} errorWarningData={readYAMLErrorWarningData}>
          {importStatus === ImportTemplateStatus.ERROR_ON_PARSE ? <YAMLParseErrorExplanation/> : ""}
        </ErrorWarningDisplay>
        <ErrorWarningDisplay title={importOrExportErrorWarningTitle} errorWarningData={importOrExportErrorWarningData}/>
        <button onClick={importExportTemplateModal_cancel}>Ok</button>
      </Modal>

      <button disabled={props.disabled} onClick={onClickImportTemplate}>Import template...</button>
      <button disabled={props.disabled} onClick={onClickExportTemplate}>Export template...</button>
    </div>
  )
}
