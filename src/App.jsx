import { useState } from 'react';
import './App.css';

import ExecInterface from './components/ExecInterface/ExecInterface.jsx';
import TracingInterface from './components/TracingInterface/TracingInterface.jsx';

const Cube = window.Cube;
Cube.initSolver();
const cube = new Cube();

function App() {
    const [appState, setAppState] = useState("execution"); // "execution" or "tracing"

    return (
        <>
            <ExecInterface Cube={Cube} cube={cube} appState={appState} setAppState={setAppState}/>
            <TracingInterface appState={appState} setAppState={setAppState}/>
        </>
    )
}

export default App;
