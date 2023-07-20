
import React, { useState } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

import { ExtraHQTexturesFolderInput } from "./ExtraHQTexturesFolderInput";

export function HQTexturesInput() {
  const {register, getValues} = useFormContextAutoTT();
  const [hqTexturesEnabled, setHqTexturesEnabled] = useState(getValues("hq-textures"));

  function updateHQTexturesEnabled(event: Event) {
    setHqTexturesEnabled(getValues("hq-textures"));
  }

  return (
    <div>
      <label htmlFor="hq-textures">HQ Textures: </label>
      <input type="checkbox" {...register("hq-textures", {onChange: updateHQTexturesEnabled})}/>
      {
        hqTexturesEnabled ? <ExtraHQTexturesFolderInput/> : ""
      }
    </div>
  );
}
