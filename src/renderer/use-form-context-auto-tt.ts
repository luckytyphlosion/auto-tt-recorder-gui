import { useFormContext, useWatch, UseWatchProps } from "react-hook-form";

import { AutoTTRecConfigFormFieldTypes } from "./components/AutoTTRecConfigForm";

export function useFormContextAutoTT() {
  return useFormContext<AutoTTRecConfigFormFieldTypes>();
}

export function useWatchAutoTT(props: {name: keyof AutoTTRecConfigFormFieldTypes}) {
  return useWatch<AutoTTRecConfigFormFieldTypes>(props);
}
