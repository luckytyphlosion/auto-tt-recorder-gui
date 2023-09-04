
import React, { useEffect, useState } from "react";
import "./styles/font.css";
import "./styles/App.css";
import "./styles/input-alignment.css";
import "./styles/text-inputs.css";

import useRenderCounter from "./RenderCounter";

import { GUIHeader } from "./components/GUIHeader";
import { AutoTTRecManager } from "./components/AutoTTRecManager";
import { getInitialFormData } from "./import-template-on-program-open";

import { AutoTTRecConfigFormFields } from "./auto-tt-rec-form-field-types";
import { LoadFormInputsType } from "../shared/shared-types";

async function getInitialLoadConfigOptions(): Promise<[LoadFormInputsType, AutoTTRecConfigFormFields, boolean, boolean]> {
  const initialLoadFormInputsType = await window.api.getLoadFormInputsType();
  const INITIAL_FORM_DATA = await getInitialFormData(initialLoadFormInputsType);
  const expandUnselectedChoiceInputs = await window.api.getExpandUnselectedChoiceInputs();
  const validateFormOnOpen = await window.api.getValidateFormOnOpen();
  return [initialLoadFormInputsType, INITIAL_FORM_DATA, expandUnselectedChoiceInputs, validateFormOnOpen];
}

export function App() {
  const renderCounter = useRenderCounter(false, "App");
  const [initialLoadFormInputsType, setInitialLoadFormInputsType] = useState<LoadFormInputsType | null>(null);
  const [INITIAL_FORM_DATA, set_INITIAL_FORM_DATA] = useState<AutoTTRecConfigFormFields | null>(null);
  const [validateFormOnOpen, setValidateFormOnOpen] = useState<boolean | null>(null);

  useEffect(() => {
    getInitialLoadConfigOptions().then(([fetchedInitialLoadFormInputsType, fetched_INITIAL_FORM_DATA, fetchedExpandUnselectedChoiceInputs, fetchedValidateFormOnOpen]) => {
      setInitialLoadFormInputsType(fetchedInitialLoadFormInputsType);
      fetched_INITIAL_FORM_DATA["expand-unselected-choice-inputs"] = fetchedExpandUnselectedChoiceInputs;
      set_INITIAL_FORM_DATA(fetched_INITIAL_FORM_DATA);
      setValidateFormOnOpen(fetchedValidateFormOnOpen);
    });
  }, []);

  if (initialLoadFormInputsType === null || INITIAL_FORM_DATA === null || validateFormOnOpen === null) {
    return (
      <div></div>
    )
  } else {
    return (
      <div>
        <GUIHeader/>
        <AutoTTRecManager initialLoadFormInputsType={initialLoadFormInputsType} INITIAL_FORM_DATA={INITIAL_FORM_DATA} validateFormOnOpen={validateFormOnOpen}/>
        {renderCounter}
      </div>
    );
  }
}
