import React from "react";

export function FieldsetOr(props: {children?: React.ReactNode}) {
  return (
    <fieldset className="fieldset-or">
      {props.children}
    </fieldset>
  );
}
