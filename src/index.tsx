import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
// import {Counter} from './Counter';
import { AppStateProvider } from "./state/AppStateContext"

ReactDOM.render(

  <React.StrictMode>
    <AppStateProvider>
      <App />
    </AppStateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// ReactDOM.render(<Counter />, document.getElementById('root'));

