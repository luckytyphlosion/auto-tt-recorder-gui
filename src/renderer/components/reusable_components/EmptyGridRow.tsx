import React from "react";

export function EmptyGridRow(props: {padding?: string}) {
  let optionalPaddingStyle = props.padding !== undefined ? {style: {paddingTop: props.padding}} : {};

  return (
    <div className="grid-contents">
      <div className="empty-grid-row-padding" {...optionalPaddingStyle}></div>
      <div className="empty-grid-row-padding" {...optionalPaddingStyle}></div>
    </div>
  );
}

