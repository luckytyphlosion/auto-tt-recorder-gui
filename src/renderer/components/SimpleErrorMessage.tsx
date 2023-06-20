import React from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export function SimpleErrorMessage(props: {name: string}) {
  const {formState} = useFormContext();

  return (<ErrorMessage
    errors={formState.errors}
    name={props.name}
    render={({ message }) => <p style={{display: "inline", backgroundColor: "yellow"}}>{message}</p>}
  />);
}
