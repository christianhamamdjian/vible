import MoodBoard from './components/MoodBoard';
import './App.css';
import SidebarDrawer from "./components/layout/SidebarDrawer"
import DrawingFormTop from "./components/forms/DrawingFormTop"
import RotatingPath from "./components/RotatingPath"
function App() {
  return (
    <div className="app">
      <DrawingFormTop />
      <SidebarDrawer side="left" />
      <SidebarDrawer side="right" />
      <MoodBoard />
      {/* <RotatingPath /> */}
    </div >
  );
}

export default App;
