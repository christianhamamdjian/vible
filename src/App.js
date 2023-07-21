import React from 'react';
import MoodBoard from './components/layout/MoodBoard'
import SidebarDrawer from "./components/layout/SidebarDrawer"
import EditFormTop from "./components/forms/EditFormTop"
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
    </div >
  );
}

export default App;

// import React, { useState } from 'react';

// const App = () => {
//   const [drawing, setDrawing] = useState(false);
//   const [points, setPoints] = useState([]);
//   console.log(points);
//   const handleMouseDown = (event) => {
//     setDrawing(true);
//     setPoints((prevPoints) => [...prevPoints, { x: event.clientX, y: event.clientY }]);
//   };

//   const handleMouseMove = (event) => {
//     if (drawing) {
//       setPoints((prevPoints) => [...prevPoints, { x: event.clientX, y: event.clientY }]);
//     }
//   };

//   const handleMouseUp = () => {
//     setDrawing(false);
//   };

//   const renderPath = () => {
//     if (points.length < 2) return null;

//     let pathData = `M ${points[0].x} ${points[0].y}`;

//     for (let i = 1; i < points.length - 1; i++) {
//       const x = (points[i].x + points[i + 1].x) / 2;
//       const y = (points[i].y + points[i + 1].y) / 2;
//       pathData += ` Q ${points[i].x} ${points[i].y}, ${x} ${y}`;
//     }

//     pathData += ` T ${points[points.length - 1].x} ${points[points.length - 1].y}`;

//     return <path d={pathData} fill="none" stroke="black" strokeWidth="3" />;
//   };

//   return (
//     <svg
//       width="500"
//       height="500"
//       style={{ border: '1px solid black' }}
//       onPointerDown={handleMouseDown}
//       onPointerMove={handleMouseMove}
//       onPointerUp={handleMouseUp}
//     >
//       {renderPath()}
//     </svg>
//   );
// };

// export default App;