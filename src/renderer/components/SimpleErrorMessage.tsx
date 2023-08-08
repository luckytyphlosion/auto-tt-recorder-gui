import React, { useRef } from "react";
import { useFormContextAutoTT, isValueOrFILLMEIsValueMaker } from "../use-form-context-auto-tt";
import { ErrorMessage } from "@hookform/error-message";

import { AutoTTRecConfigFormFieldName, AutoTTRecConfigFormChoiceArgName, AutoTTRecConfigFormChoiceArgs, AutoTTRecConfigFormStringArgName } from "../auto-tt-rec-form-field-types";

export function SimpleErrorMessage(props: {name: AutoTTRecConfigFormFieldName}) {
  const {formState} = useFormContextAutoTT();
  //console.log("SimpleErrorMessage errors:", formState.errors);

  return (<ErrorMessage
    errors={formState.errors}
    name={props.name}
    render={({ message }) => <p style={{display: "inline", backgroundColor: "yellow"}}>{message}</p>}
  />);
}

// names first take higher priority
export function DoubleErrorMessage<K extends AutoTTRecConfigFormChoiceArgName, V extends AutoTTRecConfigFormChoiceArgs[K]>(props: {enablerName: K, enablerEnabledValue: V, textName: AutoTTRecConfigFormStringArgName}) {
  const {formState, getValues} = useFormContextAutoTT();
  let enablerValue = getValues(props.enablerName);
  console.log(`DoubleErrorMessage ${props.enablerName} value:`, enablerValue);
  if (enablerValue === "<FILLME>" || enablerValue !== props.enablerEnabledValue) {
    return <SimpleErrorMessage name={props.enablerName}/>;
  } else {
    return <SimpleErrorMessage name={props.textName}/>;
  }
}