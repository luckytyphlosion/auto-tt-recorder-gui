import React from "react";

export function TimelineSpecificPresentationSettingsLayoutContainer(props: {children: React.ReactNode}) {
  return (
    <fieldset>
      <legend>Timeline-specific presentation settings</legend>
      {props.children}
    </fieldset>
  );
}
