import { useFormContext } from "react-hook-form";

import { AutoTTRecConfigFormFieldTypes } from "./components/AutoTTRecConfigForm";

export function useFormContextAutoTT() {
  return useFormContext<AutoTTRecConfigFormFieldTypes>();
}
