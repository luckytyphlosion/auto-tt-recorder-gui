import React from "react";
import { FieldsetOr } from "../reusable_components/FieldsetOr";

export function TimelineSpecificPresentationSettingsLayoutContainer(props: {children: React.ReactNode}) {
  return (
    <FieldsetOr>
      <legend>Timeline-specific presentation settings</legend>
      <div className="like-input-group timeline-specific-presentation-settings">
        {props.children}
      </div>
    </FieldsetOr>
  );
}
