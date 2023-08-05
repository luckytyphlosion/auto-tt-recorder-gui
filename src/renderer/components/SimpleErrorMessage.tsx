import React, { useRef } from "react";
import { useFormContextAutoTT } from "../use-form-context-auto-tt";
import { ErrorMessage } from "@hookform/error-message";

import { AutoTTRecConfigFormFieldName } from "../auto-tt-rec-form-field-types";

export function SimpleErrorMessage(props: {name: AutoTTRecConfigFormFieldName}) {
  const {formState} = useFormContextAutoTT();
  console.log("SimpleErrorMessage errors:", formState.errors);

  return (<ErrorMessage
    errors={formState.errors}
    name={props.name}
    render={({ message }) => <p style={{display: "inline", backgroundColor: "yellow"}}>{message}</p>}
  />);
}

// names first take higher priority
export function MultipleErrorMessage(props: {names: Array<AutoTTRecConfigFormFieldName>}) {
  const {formState} = useFormContextAutoTT();
  const lastUsedErrorMessageRef = useRef<JSX.Element | null>(null);
  for (const name of props.names) {
    const formError = formState.errors[name];
    if (formError !== undefined) {
      lastUsedErrorMessageRef.current = <ErrorMessage name={name}/>;
      return lastUsedErrorMessageRef.current;
    }
  }

  if (lastUsedErrorMessageRef.current === null) {
    lastUsedErrorMessageRef.current = <ErrorMessage name={props.names[0]}/>;
  }

  return lastUsedErrorMessageRef.current;
}
