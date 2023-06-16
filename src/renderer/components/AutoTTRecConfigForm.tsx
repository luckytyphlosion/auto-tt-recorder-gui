import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AutoTTRecArgs } from "../../auto-tt-rec-args";
import ISOWBFSFileInput from "./form_components/ISOWBFSFileInput";

function AutoTTRecConfigForm() {
  const [autoTTRecArgs, setAutoTTRecArgs] = useState(new AutoTTRecArgs());

  return (
    <div>
      <ISOWBFSFileInput autoTTRecArgs={autoTTRecArgs}/>
    </div>
  )
}

export default AutoTTRecConfigForm;