import { useState } from 'react';
import './ExecInterface.css';

import MemoPairs from './MemoPairs/MemoPairs.jsx';
import CubeNet from './CubeNet/CubeNet.jsx';

function ExecTopInterface({appState, cube, updateScramble, solution}) {
    
    const display = (appState == "execution") ? "flex" : "none";
    
    return (
        <div id="exec-top-container" style={{display: display}}>
            <div id="scramble-container">
                <div>
                    <h1>{solution}</h1>
                </div>
                <button onClick={updateScramble}>↺</button>
            </div>

            <div id="memo-text-conatiner">
                <MemoPairs cubeState={cube}/>
            </div>
        </div>
    );
}

function ExecBottomInterface({appState, setAppState, stickers}) {

    const display = (appState == "execution") ? "flex" : "none";

    return (
        <div id="exec-bottom-container" style={{display: display}}>
            <div id="switch-buttons-container">
                <button onClick={() => {setAppState("tracing")}}>Tracing</button>
            </div>
            <div id="cube-net-container">
                <CubeNet stickers={stickers}/>
            </div>
        </div>
    );

}

function ExecInterface({Cube, cube, appState, setAppState}) {
    const [solution, setSolution] = useState("");
    const [stickers, setStickers] = useState("UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB");

    function updateScramble() {
        cube.randomize();
        setSolution(Cube.inverse(cube.solve()));
        setStickers(cube.asString());
    }

    return (
        <>
            <ExecTopInterface cube={cube} appState={appState} updateScramble={updateScramble} solution={solution}/>
            <ExecBottomInterface appState={appState} setAppState={setAppState} stickers={stickers}/>
        </>
    );
}

export default ExecInterface;
