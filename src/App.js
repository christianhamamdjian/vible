// import Moodboard from './components/Moodboard';
import Moodboard from './components/Moodboard';
import Moody from './components/Moody';
import Canvas from './components/Canvas';
import Canvaslink from './components/Canvaslink';
import Drawing from './components/Drawing';
import TextBoard from './components/TextBoard';
import ColoredTextBox from './components/ColoredTextBox';
import DragImage from './components/DragImage';
import Boxes from './components/Boxes';
import FullBoard from './components/FullBoard';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* <h1>Moodboard App</h1> */}

      <h1>Moodboard</h1>
      <div className='dashboard'>
        <FullBoard />
        {/* <Moodboard />
        <Drawing />
        <Moody />
        <Boxes /> */}
      </div>
      {/* <DragImage /> */}

    </div>
  );
}

export default App;
