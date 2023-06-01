import MoodBoard from './components/MoodBoard';
import './App.css';
import SidebarDrawer from "./components/drawer/Drawer"

function App() {
  return (
    <div className="app">
      <SidebarDrawer />
      <div className='dashboard'>
        <MoodBoard />

      </div>
    </div>
  );
}

export default App;
