import React, { memo } from "react";

import { UseFormReturn, FieldValues, FormProviderProps } from 'react-hook-form';

import { AutoTTRecConfigFormFieldTypes } from "./AutoTTRecConfigForm";

const CustomContext = React.createContext<null | UseFormReturn<any>>(
  null
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

export const OptimizedFormProvider2 = <TFieldValues extends FieldValues, TContext = any>({
  register,
  setFocus,
  formState,
  handleSubmit,
  getValues,
  setValue,
  control,
  clearErrors,
  children,
  setError,
  trigger,
  watch,
  getFieldState,
  resetField,
  reset,
  unregister,
}: FormProviderProps<TFieldValues, TContext>) => (
  <CustomContext.Provider
    value={
      {
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
        unregister,
      } as unknown as UseFormReturn
    }
  >
    {children}
  </CustomContext.Provider>
);

export function useFormContext<T extends FieldValues>() {
  const res = React.useContext(CustomContext) as UseFormReturn<T>;
  return res;
}

