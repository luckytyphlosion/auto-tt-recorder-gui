import React, { useState } from "react";
import { AutoTTRecConfigFormComponents } from "./AutoTTRecConfigFormComponents";
import { AutoTTRecConfigFormComponents2 } from "./AutoTTRecConfigFormComponents2";
import GUIHeader from "./GUIHeader";
import { useForm } from "react-hook-form";
import AutoTTRecSubmitAbortButtons from "./AutoTTRecSubmitAbortButtons";
import useRenderCounter from "../RenderCounter";

function SimpleView() {

  const [whichUI, setWhichUI] = useState(false);
  const renderCounter = useRenderCounter();
  const form1 = <AutoTTRecConfigFormComponents/>;
  const form2 = <AutoTTRecConfigFormComponents2/>;

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
      <div>
        <label htmlFor="sandbox-which-gui">Which GUI: </label>
        <input type="checkbox" id="sandbox-which-gui" checked={whichUI} onChange={onCheckChange}/>
      </div>
      {
        !whichUI ? form1 : form2
      }
      {renderCounter}
    </div>
  );
}

export default SimpleView;