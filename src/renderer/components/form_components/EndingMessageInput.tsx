import React from "react";
import { TextInput } from "../generic_components/TextInput";

//props: {register: UseFormRegister<AutoTTRecConfigFormFields>}
export function EndingMessageInput() {
  return (
    <TextInput name="ending-message" startLabel="Ending message:"/>
  );
}
