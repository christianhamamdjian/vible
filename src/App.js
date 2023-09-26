import React, { useState, useEffect } from 'react';
import MoodBoard from './components/layout/MoodBoard'
import SidebarDrawer from "./components/layout/SidebarDrawer"
import EditFormTop from "./components/forms/EditFormTop"

import './App.css'

function App() {
  const [isLoading, setLoading] = useState(true);

  function someRequest() {
    return new Promise(resolve => setTimeout(() => resolve(), 1500));
  }

  useEffect(() => {
    someRequest().then(() => {
      const loaderElement = document.querySelector(".loader-container");
      if (loaderElement) {
        loaderElement.remove();
        setLoading(!isLoading);
      }
    });
  });

  if (isLoading) {
    return null;
  }
  return (
    <div className="app">
      <EditFormTop />
      <div className="vible-container" >
        <SidebarDrawer side="left" />
        <MoodBoard />
        <SidebarDrawer side="right" />
      </div>
    </div>
  );
}

export default App