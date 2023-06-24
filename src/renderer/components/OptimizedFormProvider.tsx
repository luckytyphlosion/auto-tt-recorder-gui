import React, { memo } from "react";

import { UseFormReturn, FieldValues } from 'react-hook-form';

import { AutoTTRecConfigFormFieldTypes } from "./AutoTTRecConfigForm";

const CustomContext = React.createContext<undefined | UseFormReturn<any>>(
  undefined
);

interface Props<T extends FieldValues> extends UseFormReturn<T> {
  children: React.ReactNode;
}


export function OptimizedFormProvider<T extends FieldValues>({
    children,
    register,
    setFocus,
    formState,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    control,
    setError,
    trigger,
    watch,
    resetField,
    getFieldState,
    reset,
    unregister
  }: Props<T>) {
    return <CustomContext.Provider value={{
      register: register,
      setFocus: setFocus,
      formState: formState,
      handleSubmit: handleSubmit,
      getValues: getValues,
      setValue: setValue,
      clearErrors: clearErrors,
      control: control,
      setError: setError,
      trigger: trigger,
      watch: watch,
      resetField: resetField,
      getFieldState: getFieldState,
      reset: reset,
      unregister: unregister
    }}>{children}</CustomContext.Provider>
}

export function useFormContext<T extends FieldValues>() {
  const res = React.useContext(CustomContext) as UseFormReturn<T>;
  return res;
}
