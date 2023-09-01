import React from 'react';
import MoodBoard from './components/layout/MoodBoard'
import SidebarDrawer from "./components/layout/SidebarDrawer"
import EditFormTop from "./components/forms/EditFormTop"
// import ConnectionLine from './components/DraggableConnection';

import './App.css'

function App() {

  return (
    <div className="app">
      <EditFormTop />
      <div className="vible-container" >
        <SidebarDrawer side="left" />
        <MoodBoard />
        <SidebarDrawer side="right" />
      </div>
      {/* <ConnectionLine /> */}
    </div>
  );
}

export default App