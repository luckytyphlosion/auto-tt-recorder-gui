
import React, { useState, memo, useCallback } from "react";
import { useFormContextAutoTT, useWatchAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

export enum FormComplexity
{
  SIMPLE = "0",
  ADVANCED = "1",
  ALL = "2"
};

import { TimelineCategoryLayout } from "./TimelineCategoryLayout";

const TimelineCategoryLayout_Memo = memo(TimelineCategoryLayout);

export function FormComplexityLayout(props: {isAutoTTRecRunning: boolean, unrenderFormToggle: boolean, validateAndDisplayFormErrorsViaSubmitSync: () => void}) {
  const {register} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "FormComplexityLayout");
  const formComplexity = useWatchAutoTT({name: "form-complexity"});

  //console.log("FormComplexityLayout form-complexity:", getValues("form-complexity"), ", formComplexity", formComplexity);

  return (
    <div>
      <label htmlFor="form-complexity">Layout: </label>
      <label htmlFor="form-complexity-simple">Simple: </label>
      <input type="radio" id="form-complexity-simple" value={FormComplexity.SIMPLE}
        {...register("form-complexity", {onChange: props.validateAndDisplayFormErrorsViaSubmitSync})}
      ></input>
      <label htmlFor="form-complexity-advanced">Advanced: </label>
      <input type="radio" id="form-complexity-advanced" value={FormComplexity.ADVANCED}
        {...register("form-complexity", {onChange: props.validateAndDisplayFormErrorsViaSubmitSync})}
      ></input>
      <label htmlFor="speedometer-metric-all">All: </label>
      <input type="radio" id="form-complexity-all" value={FormComplexity.ALL}
        {...register("form-complexity", {onChange: props.validateAndDisplayFormErrorsViaSubmitSync})}
      ></input>
      {renderCounter}
      <hr style={{height: "2px", borderWidth: 0, color: "gray", backgroundColor: "gray"}}/>
      <TimelineCategoryLayout_Memo isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={formComplexity} unrenderFormToggle={props.unrenderFormToggle} validateAndDisplayFormErrorsViaSubmitSync={props.validateAndDisplayFormErrorsViaSubmitSync}/>
    </div>
  );
}
