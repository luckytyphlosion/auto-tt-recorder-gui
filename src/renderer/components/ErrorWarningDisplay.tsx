import React from "react";
import TextareaAutosize from 'react-textarea-autosize';

export function ErrorWarningDisplay(props: {title: string, errorWarningData: string, children?: React.ReactNode}) {
  return (
    <>
      {
        props.title !== "" ?
          <div>
            <h3>{props.title}</h3>
            {props.children}
            {props.errorWarningData !== "" ? <TextareaAutosize className="import-template-modal-textarea" value={props.errorWarningData} readOnly/> : ""
            }
          </div> : ""
      }
    </>
  );
}
