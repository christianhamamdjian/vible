import React from 'react';
import MoodBoard from './components/MoodBoard';
import './App.css';
import SidebarDrawer from "./components/layout/SidebarDrawer"
import DrawingFormTop from "./components/forms/DrawingFormTop"
import { MoodboardContext } from "./context/moodboardContext";

function App() {
  const { isDrawing, draggingPath, draggingItem } = React.useContext(MoodboardContext);

  return (
    <div className="app" style={{
      overflow: `${(isDrawing || draggingPath || draggingItem) ? "visible" : "hidden"}`,
      touchAction: `${(isDrawing || draggingPath || draggingItem) ? "none" : "auto"}`
    }}>
      <DrawingFormTop />
      <div className="container" >
        <SidebarDrawer side="left" />
        <MoodBoard />
        <SidebarDrawer side="right" />
      </div>
    </div >
  );
}

export default App;
