import React from 'react';
import MoodBoard from './components/MoodBoard';
import './App.css';
import SidebarDrawer from "./components/layout/SidebarDrawer"
import DrawingFormTop from "./components/forms/DrawingFormTop"
import { MoodboardContext } from "./context/moodboardContext";

function App() {
  const { isDrawing, freezeScreen, selectedItem, selectedPath } = React.useContext(MoodboardContext);

  return (
    <div className="app" style={{
      overflow: `${!freezeScreen ? "visible" : "hidden"}`,
      touchAction: `${(!isDrawing || !selectedItem || !selectedPath) ? "auto" : "none"}`
    }}>
      <DrawingFormTop />
      <SidebarDrawer side="left" />
      <SidebarDrawer side="right" />
      <MoodBoard />
    </div >
  );
}

export default App;
