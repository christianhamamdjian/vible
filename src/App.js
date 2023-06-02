import MoodBoard from './components/MoodBoard';
import './App.css';
import SidebarDrawer from "./components/layout/SidebarDrawer"

function App() {
  return (
    <div className="app">
      <SidebarDrawer side="left" />
      <SidebarDrawer side="right" />
      <MoodBoard />
    </div>
  );
}

export default App;
