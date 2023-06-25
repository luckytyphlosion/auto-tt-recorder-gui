import React, { useState } from "react";
import { AutoTTRecConfigFormStatusCombined } from "./AutoTTRecConfigFormStatusCombined";
//import { AutoTTRecConfigFormWrapper } from "./AutoTTRecConfigFormWrapper";
import { AutoTTRecConfigFormComponents2 } from "./AutoTTRecConfigFormComponents2";
import GUIHeader from "./GUIHeader";
import { useForm } from "react-hook-form";
import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";
import useRenderCounter from "../RenderCounter";

function SimpleView() {

  const [whichUI, setWhichUI] = useState(false);
  const renderCounter = useRenderCounter(false, "SimpleView");
  /*const form1 = (
    <AutoTTRecConfigForm>
      <AutoTTRecConfigFormComponents/>
    </AutoTTRecConfigForm>
  );

  const form2 = (
    <AutoTTRecConfigForm>
      <AutoTTRecConfigFormComponents2/>
    </AutoTTRecConfigForm>
  );*/

  function onCheckChange(event: React.ChangeEvent<HTMLInputElement>) {
    // FIXME need to figure out how to do this type safety better
    //let key: K extends keyof AppState;
    setWhichUI(!whichUI);
  }

  function onSubmit(d: any) {
    console.log(d);
  }

  return (
    <div>
      <GUIHeader/>
      <AutoTTRecConfigFormStatusCombined/>
      {renderCounter}
    </div>
  );
}

export default SimpleView;