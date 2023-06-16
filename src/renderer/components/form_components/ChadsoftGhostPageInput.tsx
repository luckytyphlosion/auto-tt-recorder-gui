import React from "react";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface ChadsoftGhostPageInputProps {
  register: UseFormRegister<FieldValues>;
}

function ChadsoftGhostPageInput(props: ChadsoftGhostPageInputProps) {
  return (
    <div>
      <label htmlFor="chadsoft-ghost-page">Chadsoft ghost page link: </label>
      <input type="text"
        {...props.register("chadsoft-ghost-page", {required: true})}
      ></input>
    </div>
  );
}

export default ChadsoftGhostPageInput;