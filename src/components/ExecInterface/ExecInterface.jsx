import { useState } from 'react';
import './ExecInterface.css';

import MemoPairs from './MemoPairs/MemoPairs.jsx';
import CubeNet from './CubeNet/CubeNet.jsx';
import Timer from './Timer/Timer.jsx';

function ExecTopInterface({cube, updateScramble, solution, cornerBufferLabel, edgeBufferLabel}) {
    return (
        <div id="exec-top-container">
            <div id="scramble-container">
                <div>
                    <h1>{solution}</h1>
                </div>
                <button id="new-scramble-button" onClick={updateScramble}>↺</button>
            </div>

            <div id="memo-text-conatiner">
                <MemoPairs cubeState={cube} cornerBufferLabel={cornerBufferLabel} edgeBufferLabel={edgeBufferLabel}/>
            </div>
        </div>
    );
}

function ExecBottomInterface({setAppState, stickers, toggleSettingsState}) {
    return (
        <div id="exec-bottom-container">
            <div id="buttons-container">
                <button onClick={() => {setAppState("tracing")}}>Tracing</button>
                <button onClick={toggleSettingsState}>Settings</button>
            </div>
            <CubeNet stickers={stickers}/>
        </div>
    );
}

function ExecSettingsInterface({settingsState, toggleSettingsState, cornerBufferLabel, setCornerBufferLabel, edgeBufferLabel, setEdgeBufferLabel}) {
    const display = (settingsState == "open") ? "flex" : "none";

    return (
        <div id="exec-settings-menu" style={{display: display}}>
            <h1>Corner Buffer</h1>
            <div id="buffer-select-buttons-container">
                <button onClick={() => {setCornerBufferLabel("URF")}} style={{backgroundColor: (cornerBufferLabel == "URF") ? "#666" : "#ccc"}}>URF</button>
                <button onClick={() => {setCornerBufferLabel("ULB")}} style={{backgroundColor: (cornerBufferLabel == "ULB") ? "#666" : "#ccc"}}>ULB</button>
            </div>

            <h1>Edge Buffer</h1>
            <div id="buffer-select-buttons-container">
                <button onClick={() => {setEdgeBufferLabel("UF")}} style={{backgroundColor: (edgeBufferLabel == "UF") ? "#666" : "#ccc"}}>UF</button>
                <button onClick={() => {setEdgeBufferLabel("DF")}} style={{backgroundColor: (edgeBufferLabel == "DF") ? "#666" : "#ccc"}}>DF</button>
                <button onClick={() => {setEdgeBufferLabel("UR")}} style={{backgroundColor: (edgeBufferLabel == "UR") ? "#666" : "#ccc"}}>UR</button>
            </div>

            <button onClick={() => {toggleSettingsState()}}>Close</button>

        </div>
    );
}

function ExecInterface({Cube, cube, appState, setAppState}) {
    const [solution, setSolution] = useState("");
    const [stickers, setStickers] = useState("UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB");
    const [settingsState, setSettingsState] = useState("closed"); // open or closed
    const [cornerBufferLabel, setCornerBufferLabel] = useState("ULB");
    const [edgeBufferLabel, setEdgeBufferLabel] = useState("DF");

    function toggleSettingsState() {
        const newState = (settingsState == "open") ? "closed" : "open";
        setSettingsState(newState);
    }

    function updateScramble() {
        cube.randomize();
        setSolution(Cube.inverse(cube.solve()));
        setStickers(cube.asString());
    }

    const display = (appState == "execution") ? "flex" : "none";

    return (
        <div id="exec-container" style={{display: display}}>
            <ExecTopInterface cube={cube} updateScramble={updateScramble} solution={solution} 
                cornerBufferLabel={cornerBufferLabel} edgeBufferLabel={edgeBufferLabel}/>
            <Timer/>
            <ExecSettingsInterface settingsState={settingsState} toggleSettingsState={toggleSettingsState} 
                cornerBufferLabel={cornerBufferLabel} setCornerBufferLabel={setCornerBufferLabel}
                edgeBufferLabel={edgeBufferLabel} setEdgeBufferLabel={setEdgeBufferLabel}/>
            <ExecBottomInterface setAppState={setAppState} stickers={stickers} toggleSettingsState={toggleSettingsState}/>
        </div>
    );
}

export default ExecInterface;
