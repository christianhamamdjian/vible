import React from 'react';
import MoodBoard from './components/MoodBoard';
import './App.css';
import SidebarDrawer from "./components/layout/SidebarDrawer"
import DrawingFormTop from "./components/forms/DrawingFormTop"
// import RotatingPath from "./components/RotatingPath"
// import DraggSample from "./components/DraggSample"
import { MoodboardContext } from "./context/moodboardContext";

function App() {
  const { isDrawing, freezeScreen, draggingItem, draggingPath, handleDrawing, editingText, isPathMoving, isErasing, isMovingObjects, selectedItem, selectedPath, svgRef, items, handleMouseDown, handleMouseMove, handleMouseUp, zoom } = React.useContext(MoodboardContext);

  return (
    <div className="app" style={{
      overflow: `${!freezeScreen ? "visible" : "hidden"}`,
      // touchAction: `${(!isDrawing || !selectedItem || !selectedPath) ? "auto" : "none"}`
    }}>
      <DrawingFormTop />
      <SidebarDrawer side="left" />
      <SidebarDrawer side="right" />
      <MoodBoard />
      {/* <RotatingPath /> */}
      {/* <DraggSample /> */}
    </div >
  );
}

export default App;
