import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { Sandbox } from "./Sandbox.tsx";
import "./window-api";
import Modal from 'react-modal';

console.log(document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
Modal.setAppElement('#root');

console.log("Running!");
