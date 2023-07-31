import { useWatch, useFormContext } from "react-hook-form";

import { AutoTTRecConfigFormFields } from "./auto-tt-rec-form-field-types";

export function useFormContextAutoTT() {
  return useFormContext<AutoTTRecConfigFormFields>();
}

export function useWatchAutoTT<K extends keyof AutoTTRecConfigFormFields>(props: {name: K}) {
  const {control} = useFormContextAutoTT();
  return useWatch({name: props.name, control: control});
}
