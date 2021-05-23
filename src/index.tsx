import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
// import {Counter} from './Counter';
import { AppStateProvider } from './state/AppStateContext'
import { DndProvider } from 'react-dnd'
import  { HTML5Backend as Backend } from 'react-dnd-html5-backend'
// npm install react-dnd-html5-backend@11 to import { ...as Backend }

ReactDOM.render(
  <React.StrictMode>
    <DndProvider backend={Backend as any}>
      <AppStateProvider>
        <App />
      </AppStateProvider>
    </DndProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// ReactDOM.render(<Counter />, document.getElementById('root'));

