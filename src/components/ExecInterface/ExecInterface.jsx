import { useEffect, useState } from 'react';
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

function ExecSettingsInterface({
    settingsWindowState, 
    toggleSettingsState, 
    cornerBufferLabel, 
    setCornerBufferLabel, 
    edgeBufferLabel, 
    setEdgeBufferLabel,
    scrambleType,
    setScrambleType}) {

    const display = (settingsWindowState == "open") ? "flex" : "none";

    //save settings to local storage when changed
    useEffect(() => {
        localStorage.setItem("scrambleType", scrambleType);
        localStorage.setItem("edgeBufferLabel", edgeBufferLabel);
        localStorage.setItem("cornerBufferLabel", cornerBufferLabel);
    }, [scrambleType, edgeBufferLabel, cornerBufferLabel]);

    return (
        <div id="exec-settings-menu" style={{display: display}}>
            <h1>Corner Buffer</h1>
            <div id="settings-select-buttons-container">
                <button onClick={() => {setCornerBufferLabel("URF")}} style={{backgroundColor: (cornerBufferLabel == "URF") ? "#666" : "#ccc"}}>URF</button>
                <button onClick={() => {setCornerBufferLabel("ULB")}} style={{backgroundColor: (cornerBufferLabel == "ULB") ? "#666" : "#ccc"}}>ULB</button>
            </div>

            <h1>Edge Buffer</h1>
            <div id="settings-select-buttons-container">
                <button onClick={() => {setEdgeBufferLabel("UF")}} style={{backgroundColor: (edgeBufferLabel == "UF") ? "#666" : "#ccc"}}>UF</button>
                <button onClick={() => {setEdgeBufferLabel("DF")}} style={{backgroundColor: (edgeBufferLabel == "DF") ? "#666" : "#ccc"}}>DF</button>
                <button onClick={() => {setEdgeBufferLabel("UR")}} style={{backgroundColor: (edgeBufferLabel == "UR") ? "#666" : "#ccc"}}>UR</button>
            </div>

            <h1>Scramble Type</h1>
            <div id="settings-select-buttons-container">
                <button onClick={() => {setScrambleType("full")}} style={{backgroundColor: (scrambleType == "full") ? "#666" : "#ccc"}}>Full</button>
                <button onClick={() => {setScrambleType("corner")}} style={{backgroundColor: (scrambleType == "corner") ? "#666" : "#ccc"}}>Corners only</button>
                <button onClick={() => {setScrambleType("edge")}} style={{backgroundColor: (scrambleType == "edge") ? "#666" : "#ccc"}}>Edges only</button>
            </div>

            <button onClick={() => {toggleSettingsState()}}>Close</button>

        </div>
    );
}

function fullScramble(cube) {
    cube.randomize();
}

function edgeScramble(cube) {
    const EDGE_CYCLE_ITERATIONS = 50;
    cube.identity();

    //randomize permutation
    for(let i = 0; i < EDGE_CYCLE_ITERATIONS; i++) {
        //cycle random edge with its next two edges in the cubejs defined edge order
        const firstEdgeIndex = Math.floor(Math.random() * 12);
        const secondEdgeIndex = (firstEdgeIndex + 1) % 12;
        const thirdEdgeIndex = (firstEdgeIndex + 2) % 12;

        const firstValue = cube.ep[firstEdgeIndex];
        cube.ep[firstEdgeIndex] = cube.ep[secondEdgeIndex];
        cube.ep[secondEdgeIndex] = cube.ep[thirdEdgeIndex];
        cube.ep[thirdEdgeIndex] = firstValue;
    }

    //randomize orientation
    let orientationSum = 0;
    //all but last edge is randomly twisted
    for(let i = 0; i < cube.eo.length - 1; i++) {
        const newOrientation = Math.floor(Math.random() * 2); 
        cube.eo[i] = newOrientation;
        orientationSum += newOrientation;
    }
    //last edge is twisted such that the sum of the values of cube.eo are divislbe by 2.
    //if the cube eo sum is not divisible by three, the cube is in an impossible state
    cube.eo[cube.eo.length - 1] = (orientationSum % 2);

}

function cornerScramble(cube) {
    const CORNER_CYCLE_ITERATIONS = 50;
    cube.identity();

    //randomize permutation
    for(let i = 0; i < CORNER_CYCLE_ITERATIONS; i++) {
        //cycle random corner with its next two corners in the cubejs defined corner order
        const firstCornerIndex = Math.floor(Math.random() * 8);
        const secondCornerIndex = (firstCornerIndex + 1) % 8;
        const thirdCornerIndex = (firstCornerIndex + 2) % 8;

        const firstValue = cube.cp[firstCornerIndex];
        cube.cp[firstCornerIndex] = cube.cp[secondCornerIndex];
        cube.cp[secondCornerIndex] = cube.cp[thirdCornerIndex];
        cube.cp[thirdCornerIndex] = firstValue;
    }

    //randomize orientation
    let orientationSum = 0;
    //all but last corner is randomly twisted
    for(let i = 0; i < cube.co.length - 1; i++) {
        const newOrientation = Math.floor(Math.random() * 3); 
        cube.co[i] = newOrientation;
        orientationSum += newOrientation;
    }
    //last corner is twisted such that the sum of the values of cube.co are divislbe by 3.
    //if the cube co sum is not divisible by three, the cube is in an impossible state
    //if sum % 3 = 0, co = 0
    //if sum % 3 = 1, co = 2
    //if sum % 3 = 2, co = 1
    cube.co[cube.co.length - 1] = (3 - (orientationSum % 3)) % 3;
}

function ExecInterface({cube, appState, setAppState}) {
    const [solution, setSolution] = useState("");
    const [stickers, setStickers] = useState("UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB");
    const [settingsWindowState, setSettingsWindowState] = useState("closed"); // open or closed

    //settings in local storage
    const [cornerBufferLabel, setCornerBufferLabel] = useState(() => {
        switch(localStorage.getItem("cornerBufferLabel")) {
            case "URF":
                return "URF";
            case "ULB":
                return "ULB";
            default:
                return "ULB";
        }
    });

    const [edgeBufferLabel, setEdgeBufferLabel] = useState(() => {
        switch(localStorage.getItem("edgeBufferLabel")) {
            case "DF":
                return "DF";
            case "UF":
                return "UF";
            case "UR":
                return "UR";
            default:
                return "UR";
        }
    });

    const [scrambleType, setScrambleType] = useState(() => {
        switch(localStorage.getItem("scrambleType")) {
            case "full":
                return "full";
            case "corner":
                return "corner";
            case "edge":
                return "edge";
            default:
                return "full";
        }
    });

    function toggleSettingsState() {
        const newState = (settingsWindowState == "open") ? "closed" : "open";
        setSettingsWindowState(newState);
    }

    function updateScramble() {
        const Cube = window.Cube;
        switch(scrambleType) {
            case "full":
                fullScramble(cube);
                break;
            case "edge":
                edgeScramble(cube);
                break;
            case "corner":
                cornerScramble(cube);
                break;
        }
        setSolution(Cube.inverse(cube.solve()));
        setStickers(cube.asString());
    }

    const display = (appState == "execution") ? "flex" : "none";

    return (
        <div id="exec-container" style={{display: display}}>
            <ExecTopInterface cube={cube} updateScramble={updateScramble} solution={solution} 
                cornerBufferLabel={cornerBufferLabel} edgeBufferLabel={edgeBufferLabel}/>
            <Timer/>
            <ExecSettingsInterface settingsWindowState={settingsWindowState} toggleSettingsState={toggleSettingsState} 
                cornerBufferLabel={cornerBufferLabel} setCornerBufferLabel={setCornerBufferLabel}
                edgeBufferLabel={edgeBufferLabel} setEdgeBufferLabel={setEdgeBufferLabel}
                scrambleType={scrambleType} setScrambleType={setScrambleType}/>
            <ExecBottomInterface setAppState={setAppState} stickers={stickers} toggleSettingsState={toggleSettingsState}/>
        </div>
    );
}

export default ExecInterface;
