import React, { useState, useEffect, MouseEventHandler } from "react";

import Modal from "react-modal";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { AutoTTRecConfigFormFieldTypes, AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES, DEFAULT_FORM_VALUES } from "../AutoTTRecFormFieldsAndArgs";

export function ClearAllFields(props: {
  formMethods: UseFormReturn<AutoTTRecConfigFormFieldTypes, any, undefined>,
  submittedToggle: boolean,
  setSubmittedToggle: React.Dispatch<React.SetStateAction<boolean>>,
  setFormDefaultValues: React.Dispatch<React.SetStateAction<AutoTTRecConfigFormFieldTypes>>}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [allFieldsCleared, setAllFieldsCleared] = useState(false);
  const [afterAllFieldsCleared, setAfterAllFieldsCleared] = useState(false);

  function clearAllFieldsModal_confirm(event: React.MouseEvent<HTMLButtonElement>) {
    //

    //for (const autoTTRecConfigFormFieldName of AUTO_TT_REC_CONFIG_FORM_FIELD_NAMES) {
    //  console.log(autoTTRecConfigFormFieldName, ":", getValues(autoTTRecConfigFormFieldName));
    //}

    //setValue("form-complexity", formComplexity);
    //setValue("timeline-category", timelineCategory);
    //setValue("no-top-10-category", noTop10Category);

    let clearedDefaultValues = {...DEFAULT_FORM_VALUES};
    clearedDefaultValues["youtube-settings"] = undefined;
    console.log(clearedDefaultValues)
    props.setFormDefaultValues(clearedDefaultValues);

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

  useEffect(() => {
    if (allFieldsCleared) {
      const {reset, getValues, setValue} = props.formMethods;
      let formComplexity = getValues("form-complexity");
      let timelineCategory = getValues("timeline-category");
      let noTop10Category = getValues("no-top-10-category");

      /*const barebonesValues: AutoTTRecConfigFormFieldTypes = {
        "form-complexity": formComplexity,
        "timeline-category": timelineCategory,
        "no-top-10-category": noTop10Category
        
      }*/
      reset();
      setAllFieldsCleared(false);
      props.setSubmittedToggle((submittedToggle) => (!submittedToggle));
      //props.setFormDefaultValues(barebonesValues);
      //setAfterAllFieldsCleared(true);
    }
  }, [allFieldsCleared]);

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