/*import React, {memo} from "react";

import { AutoTTRecManagerProvider } from "./AutoTTRecManagerContext";
import { AutoTTRecConfigForm } from "./AutoTTRecConfigForm";
import { AutoTTRecStatus } from "./AutoTTRecStatus";

import useRenderCounter from "../RenderCounter";

const AutoTTRecConfigForm_Memo = memo(AutoTTRecConfigForm);
const AutoTTRecManagerProvider_Memo = memo(AutoTTRecManagerProvider);
export function AutoTTRecConfigFormWrapper() {
  const renderCounter = useRenderCounter(false, "AutoTTRecConfigFormWrapper");

  return (
    <AutoTTRecManagerProvider_Memo>
      <AutoTTRecConfigForm_Memo whichUI={true}/>
      {renderCounter}
      <AutoTTRecStatus/>
    </AutoTTRecManagerProvider_Memo>
  )
}*/