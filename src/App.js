import React from 'react';
import MoodBoard from './components/MoodBoard'
import SidebarDrawer from "./components/layout/SidebarDrawer"
import DrawingFormTop from "./components/forms/DrawingFormTop"
import './App.css'
// import DragDrop from './drag-and-drop/Dnd'

function App() {

  return (
    <div className="app">
      <DrawingFormTop />
      <div className="container" >
        <SidebarDrawer side="left" />
        <MoodBoard />
        <SidebarDrawer side="right" />
      </div>

      {/* <DragDrop /> */}
    </div >
  );
}

export default App;
