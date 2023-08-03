import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import UndoRedo, { UndoRedoProvider } from "./components/utils/UndoRedo"
// import { MoodboardProvider } from "./context/moodboardContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <UndoRedoProvider>
            <UndoRedo />
        </UndoRedoProvider>
    </React.StrictMode>
);

