import React, { useState, useEffect, MouseEventHandler } from "react";

import Modal from "react-modal";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { AutoTTRecConfigFormFields } from "../auto-tt-rec-form-field-types";

import { makeMinimalFormData } from "../auto-tt-rec-form-data-generators";

export function ClearAllFields(props: {
  formMethods: UseFormReturn<AutoTTRecConfigFormFields, any, undefined>,
  submittedToggle: boolean,
  setSubmittedToggle: React.Dispatch<React.SetStateAction<boolean>>,
  //setFormDefaultValues: React.Dispatch<React.SetStateAction<AutoTTRecConfigFormFields>>
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [allFieldsCleared, setAllFieldsCleared] = useState(false);
  const [afterAllFieldsCleared, setAfterAllFieldsCleared] = useState(false);

  function clearAllFieldsModal_confirm(event: React.MouseEvent<HTMLButtonElement>) {
    const {reset, getValues} = props.formMethods;
    let formComplexity = getValues("form-complexity");
    let timelineCategory = getValues("timeline-category");
    let noTop10Category = getValues("no-top-10-category");

    const minimalFormData = makeMinimalFormData(formComplexity, timelineCategory, noTop10Category);
    reset(minimalFormData);
    setAllFieldsCleared(false);
    props.setSubmittedToggle((submittedToggle) => (!submittedToggle));
    //props.setFormDefaultValues(clearedDefaultValues);
    //setAfterAllFieldsCleared(true);
    setModalOpen(false);
    setAllFieldsCleared(true);
  }

  function clearAlFieldsModal_cancel(event: React.MouseEvent<HTMLButtonElement>) {
    setModalOpen(false);
  }

  function onClickClearAllFields(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
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
    <button onClick={onClickClearAllFields}>Clear all fields...</button>
    <Modal
      overlayClassName="extra-gecko-codes-save-modal"
      className="extra-gecko-codes-save-modal-contents"
      isOpen={isModalOpen}
      onRequestClose={clearAlFieldsModal_cancel}
      shouldCloseOnOverlayClick={false}
      contentLabel="Save Gecko Code Dialog"
    >
      <h3>Are you SURE you want to clear all input fields?</h3>
      <button onClick={clearAllFieldsModal_confirm}>Yes</button>
      <button onClick={clearAlFieldsModal_cancel}>No</button>
    </Modal>
    </div>
  )
}