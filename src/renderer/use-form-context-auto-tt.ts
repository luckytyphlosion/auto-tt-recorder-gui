import { useWatch, useFormContext } from "react-hook-form";

import { AutoTTRecConfigFormFieldTypes, AutoTTRecConfigFormStringFieldTypes } from "./AutoTTRecFormFieldsAndArgs";

export function useFormContextAutoTT() {
  return useFormContext<AutoTTRecConfigFormFieldTypes>();
}

export function useWatchAutoTT<K extends keyof AutoTTRecConfigFormFieldTypes>(props: {name: K}) {
  const {control} = useFormContextAutoTT();
  return useWatch({name: props.name, control: control});
}
