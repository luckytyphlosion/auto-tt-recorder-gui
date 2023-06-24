
import React from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";

export function QualityInput() {
  const {register} = useFormContextAutoTT();
  return (
    <div>
      <label htmlFor="high-quality">High quality (1440p vs 480p): </label>
      <input type="checkbox"/>
    </div>
  );
}
