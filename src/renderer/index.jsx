import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Sandbox from "./Sandbox.tsx";
import Sandbox2 from "./Sandbox2.tsx";

console.log(document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Sandbox2/>
  </React.StrictMode>
);

console.log("Running!");
