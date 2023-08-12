import React from 'react';
import MoodBoard from './components/layout/MoodBoard'
import SidebarDrawer from "./components/layout/SidebarDrawer"
import EditFormTop from "./components/forms/EditFormTop"

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
    </div >
  );
}

export default App