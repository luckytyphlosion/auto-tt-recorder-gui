import React from "react";
import { useFormContextAutoTT } from "../use-form-context-auto-tt";
import { ErrorMessage } from "@hookform/error-message";

import { AutoTTRecConfigFormFields } from "../../main/AutoTTRecFormFieldsAndArgs";

export function SimpleErrorMessage(props: {name: keyof AutoTTRecConfigFormFields}) {
  const {formState} = useFormContextAutoTT();
  //console.log("SimpleErrorMessage name:", props.name);

  return (<ErrorMessage
    errors={formState.errors}
    name={props.name}
    render={({ message }) => <p style={{display: "inline", backgroundColor: "yellow"}}>{message}</p>}
  />);
}
