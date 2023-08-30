import React from "react";
import { TextInput } from "../generic_components/TextInput";

export function Top10CensorsInput() {
  return (
    <TextInput name="top-10-censors" startLabel="IDs of players to censor (replace with Player), separated by spaces: " notRequired={true}/>
  );
}
