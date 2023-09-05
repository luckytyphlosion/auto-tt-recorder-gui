import React from "react";

export function FormInputNotesInlineCode(props: {children?: React.ReactNode}) {
  return (
    <span className="form-input-notes__normal">
      (<code className="markdown-inline-code">{props.children}</code>)
    </span>
  );
}
