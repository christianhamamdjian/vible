import React from 'react';
import MoodBoard from './components/MoodBoard';
import './App.css';
import SidebarDrawer from "./components/layout/SidebarDrawer"
import DrawingFormTop from "./components/forms/DrawingFormTop"
import { MoodboardContext } from "./context/moodboardContext";
import SvgRotate from "./components/SvgRotate"

function App() {
  const { isDrawing, freezeScreen, selectedItem, selectedPath } = React.useContext(MoodboardContext);

  return (
    <div className="app" style={{
      overflow: `${!freezeScreen ? "visible" : "hidden"}`,
      touchAction: `${(!isDrawing || !selectedItem || !selectedPath) ? "auto" : "none"}`
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
