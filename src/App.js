import React from 'react';
import MoodBoard from './components/MoodBoard';
import './App.css';
import SidebarDrawer from "./components/layout/SidebarDrawer"
import DrawingFormTop from "./components/forms/DrawingFormTop"
import { MoodboardContext } from "./context/moodboardContext";
import SvgRotate from "./components/SvgRotate"

function App() {
  const { isDrawing, freezeScreen, selectedItem, selectedPath, draggingPath, draggingItem } = React.useContext(MoodboardContext);

  return (
    <div className="app" style={{
      overflow: `${(draggingPath || draggingItem) ? "visible" : "hidden"}`,
      // touchAction: `${(!isDrawing || !selectedItem || !selectedPath) ? "auto" : "none"}`
      touchAction: `${(draggingPath || draggingItem) ? "none" : "scroll"}`
    }}>
      <DrawingFormTop />
      <div className="container" >
        <SidebarDrawer side="left" />
        <MoodBoard />
        <SidebarDrawer side="right" />
      </div>
      {/* <SvgRotate /> */}
    </div >
  );
}

export default App;
