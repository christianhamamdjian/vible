import React from 'react';
import MoodBoard from './components/layout/MoodBoard'
import SidebarDrawer from "./components/layout/SidebarDrawer"
import EditFormTop from "./components/forms/EditFormTop"
// import DownloadUploadData from "./components/utils/DownloadUploadData"
// import UndoRedo from "./components/utils/UndoRedo"

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
      {/* <DownloadUploadData /> */}
      {/* <UndoRedo /> */}
    </div >
  );
}

export default App