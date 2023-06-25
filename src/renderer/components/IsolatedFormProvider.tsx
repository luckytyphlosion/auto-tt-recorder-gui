import React from "react";
import { FormProvider, UseFormReturn } from "react-hook-form";
import { AutoTTRecConfigFormFieldTypes } from "./AutoTTRecConfigForm";

export function IsolatedFormProvider(props: {children: React.ReactNode, formMethods: UseFormReturn<AutoTTRecConfigFormFieldTypes, any, undefined>}) {
  return (
    <FormProvider {...props.formMethods}>
      {props.children}
    </FormProvider>
  );
}
