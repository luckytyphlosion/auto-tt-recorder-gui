import React from "react";

import { AutoTTRecManagerProvider } from "./AutoTTRecManagerContext";
import { AutoTTRecConfigForm } from "./AutoTTRecConfigForm";
import { AutoTTRecStatus } from "./AutoTTRecStatus";

import useRenderCounter from "../RenderCounter";

export function AutoTTRecConfigFormWrapper() {

  const renderCounter = useRenderCounter(false, "AutoTTRecConfigFormWrapper");

  return (
    <AutoTTRecManagerProvider>
      <AutoTTRecConfigForm whichUI={true}/>
      {renderCounter}
      <AutoTTRecStatus/>
    </AutoTTRecManagerProvider>
  )
}