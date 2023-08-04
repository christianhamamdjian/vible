import React from 'react';
import MoodBoard from './components/layout/MoodBoard'
import SidebarDrawer from "./components/layout/SidebarDrawer"
import EditFormTop from "./components/forms/EditFormTop"
// import UndoRedo from "./undoRedo/UndoRedo"

import './App.css'

function App() {

  return (
    <div className="app">
      <EditFormTop />
      <div className="container" >
        <SidebarDrawer side="left" />
        <MoodBoard />
        <SidebarDrawer side="right" />
      </div>
      {/* <UndoRedo /> */}
    </div >
  );
}

export default App