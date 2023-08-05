
import React, { useEffect, useState } from "react";
import "./App.css";
import useRenderCounter from "./RenderCounter";

import { GUIHeader } from "./components/GUIHeader";
import { AutoTTRecManager } from "./components/AutoTTRecManager";
import { getInitialFormData } from "./import-template-on-program-open";

import { AutoTTRecConfigFormFields } from "./auto-tt-rec-form-field-types";
import { LoadFormInputsType } from "../shared/shared-types";

async function getInitialLoadFormInputsTypeAndFormData(): Promise<[LoadFormInputsType, AutoTTRecConfigFormFields]> {
  const initialLoadFormInputsType = await window.api.getLoadFormInputsType();
  const INITIAL_FORM_DATA = await getInitialFormData(initialLoadFormInputsType);
  return [initialLoadFormInputsType, INITIAL_FORM_DATA];
}

export function App() {
  const renderCounter = useRenderCounter(false, "App");
  const [initialLoadFormInputsType, setInitialLoadFormInputsType] = useState<LoadFormInputsType | null>(null);
  const [INITIAL_FORM_DATA, set_INITIAL_FORM_DATA] = useState<AutoTTRecConfigFormFields | null>(null);

  useEffect(() => {
    getInitialLoadFormInputsTypeAndFormData().then(([fetchedInitialLoadFormInputsType, fetched_INITIAL_FORM_DATA]) => {
      setInitialLoadFormInputsType(fetchedInitialLoadFormInputsType);
      set_INITIAL_FORM_DATA(fetched_INITIAL_FORM_DATA);
    });
  }, []);

  if (initialLoadFormInputsType === null || INITIAL_FORM_DATA === null) {
    return (
      <div></div>
    )
  } else {
    return (
      <div>
        <GUIHeader/>
        <AutoTTRecManager initialLoadFormInputsType={initialLoadFormInputsType} INITIAL_FORM_DATA={INITIAL_FORM_DATA}/>
        {renderCounter}
      </div>
    );
  }
}
