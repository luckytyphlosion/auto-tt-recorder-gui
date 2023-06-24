import { useFormContext, useWatch, UseWatchProps } from "react-hook-form";

import { AutoTTRecConfigFormFieldTypes } from "./components/AutoTTRecConfigForm";

export function useFormContextAutoTT() {
  return useFormContext<AutoTTRecConfigFormFieldTypes>();
}

export function useWatchAutoTT(props: object) {
  return useWatch<AutoTTRecConfigFormFieldTypes>(props);
}
