import React, { useState, useEffect, MouseEventHandler } from "react";

import Modal from "react-modal";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { AutoTTRecConfigFormFields } from "../auto-tt-rec-form-field-types";

import { makeMinimalFormData, makeDefaultFormData } from "../auto-tt-rec-form-data-generators";

enum ClearAllFieldsModalState {
  UNOPEN = 0,
  ASK_RESET_OR_CLEAR,
  RESET_OR_CLEAR_HAPPENED
}

export function ClearAllFields(props: {
  formMethods: UseFormReturn<AutoTTRecConfigFormFields, any, undefined>,
  setUnrenderFormToggle: React.Dispatch<React.SetStateAction<boolean>>,
  disabled: boolean
}) {
  const [modalState, setModalState] = useState(ClearAllFieldsModalState.UNOPEN);
  const [isFormWipeTypeReset, setIsFormWipeTypeReset] = useState(false);

  function clearOrResetAllFieldsModal_confirm(event: React.MouseEvent<HTMLButtonElement>) {
    const {getValues} = props.formMethods;
    let formComplexity = getValues("form-complexity");
    let timelineCategory = getValues("timeline-category");
    let noTop10Category = getValues("no-top-10-category");
    let expandUnselectedChoiceInputs = getValues("expand-unselected-choice-inputs");
    let newFormData: AutoTTRecConfigFormFields;
    if (isFormWipeTypeReset) {
      newFormData = makeDefaultFormData(formComplexity, timelineCategory, noTop10Category, expandUnselectedChoiceInputs);
    } else {
      newFormData = makeMinimalFormData(formComplexity, timelineCategory, noTop10Category, expandUnselectedChoiceInputs);
    }
    console.log("Clear or reset newFormData:", newFormData);
    props.formMethods.reset(newFormData);
    props.setUnrenderFormToggle(true);
    setModalState(ClearAllFieldsModalState.RESET_OR_CLEAR_HAPPENED);
  }

  function clearOrResetAllFieldsModal_cancel(event: React.MouseEvent<HTMLButtonElement>) {
    setModalState(ClearAllFieldsModalState.UNOPEN);
  }

  function clearOrResetAllFieldsModal_closeAndToggleUnrenderForm(event: React.MouseEvent<HTMLButtonElement>) {
    props.setUnrenderFormToggle(false);
    setModalState(ClearAllFieldsModalState.UNOPEN);
  }

  function onClickClearAllFields(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsFormWipeTypeReset(false);
    setModalState(ClearAllFieldsModalState.ASK_RESET_OR_CLEAR);
  }

  function onClickResetAllFields(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    setIsFormWipeTypeReset(true);
    setModalState(ClearAllFieldsModalState.ASK_RESET_OR_CLEAR);
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
      isOpen={modalState !== ClearAllFieldsModalState.UNOPEN}
      onRequestClose={clearOrResetAllFieldsModal_cancel}
      shouldCloseOnOverlayClick={false}
      contentLabel="Save Gecko Code Dialog"
    >
      {
        modalState === ClearAllFieldsModalState.ASK_RESET_OR_CLEAR ? <>
          <h3>{
            isFormWipeTypeReset ?
            "Are you SURE you want to reset all input fields to defaults?" : 
            "Are you SURE you want to clear all input fields?"
          }</h3>
          <button onClick={clearOrResetAllFieldsModal_confirm}>Yes</button>
          <button onClick={clearOrResetAllFieldsModal_cancel}>No</button>
        </> : modalState === ClearAllFieldsModalState.RESET_OR_CLEAR_HAPPENED ? <>
          <h3>{
            isFormWipeTypeReset ?
            "All input fields have been reset to default." : 
            "All input fields have been cleared."
          }</h3>
          <button onClick={clearOrResetAllFieldsModal_closeAndToggleUnrenderForm}>Ok</button>
        </> : ""
      }
    </Modal>
    </div>
  )
}