import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MoodboardProvider } from "./context/moodboard";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MoodboardProvider>
      <App />
    </MoodboardProvider>
  </React.StrictMode>
);

