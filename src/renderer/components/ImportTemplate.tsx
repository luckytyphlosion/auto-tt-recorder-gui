import React, { useState, useRef, useEffect, MouseEventHandler } from "react";

import Modal from "react-modal";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { AutoTTRecConfigFormFieldTypes, AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES, DEFAULT_FORM_VALUES } from "../AutoTTRecFormFieldsAndArgs";

import { ImportTemplateResult, ImportTemplateStatus } from "../../main/form-template";
import { AutoTTRecConfig } from "../../main/auto-tt-rec-bridge";

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

export function ImportTemplate() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [importStatus, setImportStatus] = useState(ImportTemplateStatus.SUCCESS);
  const [hasWarnings, setHasWarnings] = useState(false);
  const [errorWarningData, setErrorWarningData] = useState("");

  const autoTTRecConfigRef = useRef<AutoTTRecConfig | null>(null);

  async function onClickImportTemplate(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    let importTemplateResult: ImportTemplateResult = await window.api.importFormTemplate("../../../test_import.yml");
    setImportStatus(importTemplateResult.status);
    setHasWarnings(importTemplateResult.hasWarnings);
    setErrorWarningData(importTemplateResult.errorWarningData);
    autoTTRecConfigRef.current = importTemplateResult.data;
    if (importTemplateResult.status === ImportTemplateStatus.SUCCESS) {
      
    }
    setModalOpen(true);
  }

  function importTemplateModal_cancel(event: React.MouseEvent<HTMLButtonElement>) {
    setModalOpen(false);
  }

  return (
    <div>
      <Modal
        overlayClassName="extra-gecko-codes-save-modal"
        className="extra-gecko-codes-save-modal-contents"
        isOpen={isModalOpen}
        onRequestClose={importTemplateModal_cancel}
        shouldCloseOnOverlayClick={false}
        contentLabel="Save Gecko Code Dialog"
      >
        <h3>Errors occurred on import</h3>
        <textarea rows={20} cols={16} value={"ok"} readOnly/>
        <button onClick={importTemplateModal_cancel}>Ok</button>
      </Modal>

      <button onClick={onClickImportTemplate}>Import template...</button>
    </div>
  )
}