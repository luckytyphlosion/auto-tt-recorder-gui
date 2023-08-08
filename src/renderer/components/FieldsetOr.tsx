import React from "react";

export function FieldsetOr(props: {children?: React.ReactNode}) {
  return (
    <fieldset>
      {props.children}
    </fieldset>
  );
}
