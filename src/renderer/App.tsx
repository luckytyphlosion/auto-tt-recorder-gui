
import React from "react";
import "./App.css";
import useRenderCounter from "./RenderCounter";

import { GUIHeader } from "./components/GUIHeader";
import { AutoTTRecManager } from "./components/AutoTTRecManager";

export function App() {
  const renderCounter = useRenderCounter(false, "App");

  return (
    <div>
      <GUIHeader/>
      <AutoTTRecManager/>
      {renderCounter}
    </div>
  );
}