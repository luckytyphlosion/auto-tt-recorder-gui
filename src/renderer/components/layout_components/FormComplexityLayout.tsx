
import React, { useState, memo } from "react";
import { useFormContextAutoTT } from "../../use-form-context-auto-tt";
import useRenderCounter from "../../RenderCounter";

export enum FormComplexity
{
  SIMPLE = "0",
  ADVANCED = "1",
  ALL = "2"
};

import { TimelineCategoryLayout } from "./TimelineCategoryLayout";

const TimelineCategoryLayout_Memo = memo(TimelineCategoryLayout);

export function FormComplexityLayout(props: {isAutoTTRecRunning: boolean}) {
  const {register, getValues} = useFormContextAutoTT();
  const renderCounter = useRenderCounter(false, "FormComplexityLayout");
  const [formComplexity, setFormComplexity] = useState(getValues("form-complexity"));

  function updateFormComplexity() {
    setFormComplexity(getValues("form-complexity"));
  }

  return (
    <div>
      <label htmlFor="form-complexity">Layout: </label>
      <label htmlFor="form-complexity-simple">Simple: </label>
      <input type="radio" id="form-complexity-simple" value={FormComplexity.SIMPLE}
        {...register("form-complexity", {onChange: updateFormComplexity})}
      ></input>
      <label htmlFor="form-complexity-advanced">Advanced: </label>
      <input type="radio" id="form-complexity-advanced" value={FormComplexity.ADVANCED}
        {...register("form-complexity", {onChange: updateFormComplexity})}
      ></input>
      <label htmlFor="speedometer-metric-all">All: </label>
      <input type="radio" id="form-complexity-all" value={FormComplexity.ALL}
        {...register("form-complexity", {onChange: updateFormComplexity})}
      ></input>
      {renderCounter}
      <hr style={{height: "2px", borderWidth: 0, color: "gray", backgroundColor: "gray"}}/>
      <TimelineCategoryLayout_Memo isAutoTTRecRunning={props.isAutoTTRecRunning} formComplexity={formComplexity}/>
    </div>
  );
}