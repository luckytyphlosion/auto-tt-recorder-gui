import React, { useState, useRef, useEffect, MouseEventHandler } from "react";

import TextareaAutosize from 'react-textarea-autosize';
import Modal from "react-modal";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { AutoTTRecConfigFormFields } from "../auto-tt-rec-form-field-types";
import { ImportTemplateResult, ImportTemplateStatus, AutoTTRecConfig } from "../../shared/shared-types";

import { useFormContextAutoTT } from "../use-form-context-auto-tt";

import { convertAutoTTRecConfigToFormData } from "../auto-tt-rec-form-data-generators";

import { BooleanFILLME } from "../../shared/shared-types";

import "./form_components/styles/ExtraGeckoCodesInput.css";
import "../styles/ImportTemplate.css";

export enum ImportTemplateStatu2s {
  INDETERMINATE = -1,
  SUCCESS = 0,
  ERROR_ON_READ = 1,
  ERROR_ON_PARSE = 2,
  ERROR_ON_STRUCTURE = 3,
  ERROR_ON_VALUES = 4,
}

export interface ImportTemplateResul2t {
  status: ImportTemplateStatus,
  errorWarningData: string,
  data: AutoTTRecConfig,
  hasWarnings: boolean
}

export function ImportTemplate(props: {
  formMethods: UseFormReturn<AutoTTRecConfigFormFields, any, undefined>,
  setImportToggle: React.Dispatch<React.SetStateAction<boolean>>,
  onError: (errors: Object) => Promise<void> | void
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [importStatus, setImportStatus] = useState(ImportTemplateStatus.SUCCESS);
  const [hasWarnings, setHasWarnings] = useState(false);
  const [errorWarningData, setErrorWarningData] = useState("");
  const [formDataToggle, setNewFormDataToggle] = useState<BooleanFILLME>("<FILLME>");

  const [autoTTRecTemplateFilename, setAutoTTRecTemplateFilename] = useState("");

  //const formDataRef = useRef<AutoTTRecConfigFormFields | null>(null);

  async function onClickImportTemplate(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let newAutoTTRecTemplateFilename = await window.api.openFileDialog([{name: "YAML files", extensions: ["yml"]}], autoTTRecTemplateFilename, "szs");
    if (newAutoTTRecTemplateFilename !== "") {
      setAutoTTRecTemplateFilename(newAutoTTRecTemplateFilename);
      let importTemplateResult: ImportTemplateResult = await window.api.importFormTemplate(newAutoTTRecTemplateFilename);
      setImportStatus(importTemplateResult.status);
      setHasWarnings(importTemplateResult.hasWarnings);
      setErrorWarningData(importTemplateResult.errorWarningData);
      if (importTemplateResult.status === ImportTemplateStatus.SUCCESS) {
        let formComplexity = props.formMethods.getValues("form-complexity");
        let [newFormData, errorsAndWarningsStr] = await convertAutoTTRecConfigToFormData(importTemplateResult.data, newAutoTTRecTemplateFilename, formComplexity);
        props.setImportToggle(true);
        setErrorWarningData(errorsAndWarningsStr);
        props.formMethods.reset(newFormData);
        //props.validateFormArgsOnlyOnSubmitCallback();
        //formDataRef.current = newFormData;
        //setNewFormDataToggle((formDataToggle) => !formDataToggle);
        console.log("newFormData:", newFormData);
      }
    }
    setModalOpen(true);
  }

  function importTemplateModal_cancel(event: React.MouseEvent<HTMLButtonElement>) {
    props.setImportToggle(false);
    setNewFormDataToggle((formDataToggle) => !formDataToggle);
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
        onRequestClose={importTemplateModal_cancel}
        shouldCloseOnOverlayClick={false}
        contentLabel="Save Gecko Code Dialog"
      >
        <h3>Errors occurred on import</h3>
        <TextareaAutosize className="import-template-modal-textarea" value={errorWarningData} readOnly/>
        <button onClick={importTemplateModal_cancel}>Ok</button>
      </Modal>

      <button onClick={onClickImportTemplate}>Import template...</button>
    </div>
  )
}
