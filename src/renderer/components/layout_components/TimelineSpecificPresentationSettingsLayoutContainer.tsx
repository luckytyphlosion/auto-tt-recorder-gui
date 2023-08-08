import React from "react";
import { FieldsetOr } from "../FieldsetOr";

export function TimelineSpecificPresentationSettingsLayoutContainer(props: {children: React.ReactNode}) {
  return (
    <FieldsetOr>
      <legend>Timeline-specific presentation settings</legend>
      {props.children}
    </FieldsetOr>
  );
}
