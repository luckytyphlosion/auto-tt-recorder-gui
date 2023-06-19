import React, { useState } from "react";
import { useFormContext, UseFormRegister, FieldValues, UseFormRegisterReturn, Controller } from "react-hook-form";
import useRenderCounter from "../../RenderCounter";

export function AudioBitrateInput() {
  const {register, setValue, getValues, control} = useFormContext();
  const renderCounter = useRenderCounter();

  function updateAudioBitrate(event: Event) {
    let audioBitrate = getValues("audio-bitrate");
    console.log("audioBitrate:", audioBitrate);
    setValue("audio-bitrate", audioBitrate.replace(/\D/g, ""), {shouldTouch: true, shouldValidate: true});
  }

  function updateAudioBitrateKbpsEnable(event: Event) {
    // let audioBitrateKbpsEnable = getValues("audio-bitrate-kbps-enable");
    // if (!audioBitrateKbpsEnable) {
    //   getValues("audio-bitrate")
    //   setValue("audio-bitrate", )
    // }
  }
  

          //   {/*<input {...field} onChange={e => {
          //   onChangeFirst(field.value);
          //   field.onChange(e);
          // }} />*/}

  return (
    <div>
      <label htmlFor="audio-bitrate">Audio bitrate:</label>
      {/*<Controller
        control={control}
        name="audio-bitrate"
        render={({field}) => (
          <input {...field} type="number" value={getValues("audio-bitrate")} onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key.match(/\D/g)) {
              e.preventDefault();
              }
            }}
            onChange={e => field.onChange(e)}
          />
        )}
          />*/}

      <input type="number" onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key.match(/\D/g)) {
          e.preventDefault();
        }
      }}
        {...register("audio-bitrate", {required: true, onChange: updateAudioBitrate,
          validate: (value, formValues) => {
            console.log("validate value:", value);
            return true
          }
        })}
      ></input>
      <label htmlFor="audio-bitrate-kbps-enable">kbps</label>
      <input type="checkbox" {...register("audio-bitrate-kbps-enable", {onChange: updateAudioBitrateKbpsEnable})}/>
      {renderCounter}
    </div>
  );
}
