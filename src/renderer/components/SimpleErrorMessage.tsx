import React from "react";
import { useFormContextAutoTT } from "../use-form-context-auto-tt";
import { ErrorMessage } from "@hookform/error-message";

import { AutoTTRecConfigFormFieldTypes } from "../AutoTTRecFieldsAndArgs";

export function SimpleErrorMessage(props: {name: keyof AutoTTRecConfigFormFieldTypes}) {
  const {formState} = useFormContextAutoTT();
  //console.log("SimpleErrorMessage name:", props.name);

  return (<ErrorMessage
    errors={formState.errors}
    name={props.name}
    render={({ message }) => <p style={{display: "inline", backgroundColor: "yellow"}}>{message}</p>}
  />);
}
