import React from "react";

import { chadsoftGhostPageLinkRegex } from "../../../shared/shared-types";
import { TextInput } from "../generic_components/TextInput";

export function ChadsoftGhostPageInput() {
  return (
    <TextInput name="chadsoft-ghost-page" startLabel="Ghost page link: " pattern={
      {value: chadsoftGhostPageLinkRegex, message: "Must be a valid chadsoft ghost link."}
    }/>
  );
}
