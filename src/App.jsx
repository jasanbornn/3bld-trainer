import { useState } from 'react';
import './App.css';

import ExecInterface from './components/ExecInterface/ExecInterface.jsx';
import TracingInterface from './components/TracingInterface/TracingInterface.jsx';

import FourCube from '@/utils/FourCube/FourCube.js';

const Cube = window.Cube;
Cube.initSolver();
const cube = new Cube();

const fourCube = FourCube();

fourCube.scramble();
console.log("scramble: " + fourCube.getScrambleString());
console.log("solution: " + fourCube.getSolutionString());
console.log("ep: " + fourCube.ep);

function App() {
    const [appState, setAppState] = useState("execution"); // "execution" or "tracing"

    return (
        <>
            <ExecInterface cube={cube} appState={appState} setAppState={setAppState}/>
            <TracingInterface Cube={Cube} appState={appState} setAppState={setAppState}/>
        </>
    )
}

export default App;
