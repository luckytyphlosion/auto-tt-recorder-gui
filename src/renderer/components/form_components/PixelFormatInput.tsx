import React, { useCallback } from "react";
import { TextInput } from "../generic_components/TextInput";

export function PixelFormatInput() {
  return (
    <TextInput name="pixel-format" startLabel="Pixel format: " requiredMessage="This input is required. (Enter yuv420p if unsure)" placeholder="yuv420p"/>
  );
}
