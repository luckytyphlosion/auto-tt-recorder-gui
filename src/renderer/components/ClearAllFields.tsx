import React, { useState, useEffect, MouseEventHandler } from "react";

import Modal from "react-modal";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { AutoTTRecConfigFormFields } from "../auto-tt-rec-form-field-types";

import { makeMinimalFormData, makeDefaultFormData } from "../auto-tt-rec-form-data-generators";

export function ClearAllFields(props: {
  formMethods: UseFormReturn<AutoTTRecConfigFormFields, any, undefined>,
  submittedToggle: boolean,
  setSubmittedToggle: React.Dispatch<React.SetStateAction<boolean>>,
  disabled: boolean
  //setFormDefaultValues: React.Dispatch<React.SetStateAction<AutoTTRecConfigFormFields>>
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isFormWipeTypeReset, setFormWipeTypeReset] = useState(false);

  function clearOrResetAllFieldsModal_confirm(event: React.MouseEvent<HTMLButtonElement>) {
    const {getValues} = props.formMethods;
    let formComplexity = getValues("form-complexity");
    let timelineCategory = getValues("timeline-category");
    let noTop10Category = getValues("no-top-10-category");
    let newFormData: AutoTTRecConfigFormFields;
    if (isFormWipeTypeReset) {
      newFormData = makeDefaultFormData(formComplexity, timelineCategory, noTop10Category);
    } else {
      newFormData = makeMinimalFormData(formComplexity, timelineCategory, noTop10Category);
    }
    props.formMethods.reset(newFormData);
    props.setSubmittedToggle((submittedToggle) => (!submittedToggle));
    setModalOpen(false);
  }

  function clearOrResetAllFieldsModal_cancel(event: React.MouseEvent<HTMLButtonElement>) {
    setModalOpen(false);
  }

  function onClickClearAllFields(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setFormWipeTypeReset(false);
    setModalOpen(true);
  }

  function onClickResetAllFields(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setFormWipeTypeReset(true);
    setModalOpen(true);
  }
  /*useEffect(() => {
    if (allFieldsCleared) {

    }
  }, [allFieldsCleared]);*/

  // useEffect(() => {
  //   if (afterAllFieldsCleared) {
  //     for (const autoTTRecConfigFormFieldName of AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES) {
  //       console.log(autoTTRecConfigFormFieldName, ":", props.formMethods.getValues(autoTTRecConfigFormFieldName));
  //     }
  //     setAfterAllFieldsCleared(false);
  //   }
  // }, [afterAllFieldsCleared]);

  return (
    <div>
    <button disabled={props.disabled} onClick={onClickClearAllFields}>Clear all fields...</button>
    <button disabled={props.disabled} onClick={onClickResetAllFields}>Reset all fields to defaults...</button>
    <Modal
      overlayClassName="extra-gecko-codes-save-modal"
      className="extra-gecko-codes-save-modal-contents"
      isOpen={isModalOpen}
      onRequestClose={clearOrResetAllFieldsModal_cancel}
      shouldCloseOnOverlayClick={false}
      contentLabel="Save Gecko Code Dialog"
    >
      <h3>{
        isFormWipeTypeReset ?
        "Are you SURE you want to reset all input fields to defaults?" : 
        "Are you SURE you want to clear all input fields?"
      }</h3>
      <button onClick={clearOrResetAllFieldsModal_confirm}>Yes</button>
      <button onClick={clearOrResetAllFieldsModal_cancel}>No</button>
    </Modal>
    </div>
  )
}