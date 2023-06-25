import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import "./window-api";

console.log(document.getElementById('root'));
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

console.log("Running!");
