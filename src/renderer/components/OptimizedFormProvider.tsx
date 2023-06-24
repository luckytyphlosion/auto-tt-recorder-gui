import React, { memo } from "react";

import { FormProvider as FormProviderFromReactHookForm, UseFormReturn } from 'react-hook-form';

//import { AutoTTRecConfigFormFieldTypes } from "./AutoTTRecConfigForm";

type FormProviderMemoizedProps<T extends Record<string, any>> = {
  methods: UseFormReturn<T>;
  Component: React.ComponentType<T>;
} & T;

const FormProvider = <T extends Record<string, any>>({
  methods,
  Component,
  ...props
}: FormProviderMemoizedProps<T>) => (
  <FormProviderFromReactHookForm {...methods}>
    <Component {...(props as unknown as T)} />
  </FormProviderFromReactHookForm>
);


export const FormProviderMemoized = memo(FormProvider) as typeof FormProvider;