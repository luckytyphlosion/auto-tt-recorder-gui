import React from "react";
import { useFormContext, ValidateResult } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

export function ChadsoftGhostPageInput() {
  const {register, formState} = useFormContext();

  console.log("formState.isSubmitted:", formState.isSubmitted);

  return (
    <div>
        <label htmlFor="chadsoft-ghost-page">Chadsoft ghost page link: </label>
        <input type="text"
          {...register("chadsoft-ghost-page", {
            required: {
              value: true,
              message: "This input is required."
            },
            pattern: {
              value: /^https:\/\/(?:www\.)?chadsoft\.co\.uk\/time-trials\/rkgd\/([0-9A-Fa-f]{2}\/[0-9A-Fa-f]{2}\/[0-9A-Fa-f]{36})\.html$/,
              message: "Must be a valid chadsoft ghost link."
            }
          })}
        ></input>
        <ErrorMessage
          errors={formState.errors}
          name="chadsoft-ghost-page"
          render={({ message }) => <p style={{display: "inline"}}>{message}</p>}
        />

        {/*<ErrorMessage
          errors={formState.errors}
          name="chadsoft-ghost-page"
          render={({ messages }) => {
            console.log("messages", messages);
            if (messages === undefined) {
              return null;
            } else {
              let messagesEntries = Object.entries(messages);
              let result = messagesEntries.map(([type, message]: [string, ValidateResult]) => (
                <p style={{display: "inline"}} key={type}>{message}</p>
              ));
              return result; 
            }
          }}
        />*/}
    </div>
  );
}
