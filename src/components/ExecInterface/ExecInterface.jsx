import { useState } from 'react';
import './ExecInterface.css';

import MemoPairs from './MemoPairs/MemoPairs.jsx';
import CubeNet from './CubeNet/CubeNet.jsx';
import Timer from './Timer/Timer.jsx';

import ExecSettingsInterface from './ExecSettingsInterface/ExecSettingsInterface.jsx'

function ExecTopInterface({cube, updateScramble, solution, cornerBufferLabel, edgeBufferLabel, cornerPairs, cornerHintsEnabled}) {
    return (
        <div id="exec-top-container">
            <div id="scramble-container">
                <div>
                    <h1>{solution}</h1>
                </div>
                <button id="new-scramble-button" onClick={updateScramble}>↺</button>
            </div>

            <div id="memo-text-conatiner">
                <MemoPairs cubeState={cube} cornerBufferLabel={cornerBufferLabel} edgeBufferLabel={edgeBufferLabel} 
                cornerPairs={cornerPairs} cornerHintsEnabled={cornerHintsEnabled}/>
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
    const [cornerPairs, setCornerPairs] = useState(() => {
        if(localStorage.getItem("cornerPairs") == null) {
            return {}; 
        } else {
            return JSON.parse(localStorage.getItem("cornerPairs"));
        }
    });

    const [cornerHintsEnabled, setCornerHintsEnabled] = useState(() => {
        if(localStorage.getItem("cornerHintsEnabled") == null) {
            return {}; 
        } else {
            window.onload = () => {
                if(localStorage.getItem("cornerHintsEnabled")) {
                    document.getElementById("corner-hints-checkbox").checked = true;
                } else {
                    document.getElementById("corner-hints-checkbox").checked = false;
                }
            }
            return localStorage.getItem("cornerHintsEnabled");
        }
    });

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

    function onFileChange(event) {
        const newCornerPairs = {};
        const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWX";
        const file = event.target.files[0];

        if(file) {
            let reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                //console.log(result);
                let firstLineSkipped = false;
                let word = "";
                let firstLetterIndex = 0;
                let secondLetterIndex = -1;
                for(let i = 0; i < result.length; i++) {
                    if(result[i] == "\n") {
                        if(firstLineSkipped && word != "") {
                            //console.log(ALPHABET[firstLetterIndex] + ALPHABET[secondLetterIndex] + ": " + word);
                            newCornerPairs[ALPHABET[firstLetterIndex] + ALPHABET[secondLetterIndex]] = word;
                        }
                        word="";
                        firstLineSkipped = true;
                        i += 2;
                        firstLetterIndex = 0;
                        secondLetterIndex += 1;
                    } else if(firstLineSkipped) {
                        if(result[i] == ",") { 
                            if(word != "") {
                                //console.log(ALPHABET[firstLetterIndex] + ALPHABET[secondLetterIndex] + ": " + word);
                                newCornerPairs[ALPHABET[firstLetterIndex] + ALPHABET[secondLetterIndex]] = word;
                            }
                            word = "";
                            firstLetterIndex += 1;
                        } else {
                            word += result[i];
                        }
                    }
                }

                setCornerPairs(newCornerPairs);
                localStorage.setItem("cornerPairs", JSON.stringify(newCornerPairs));
            }

            reader.readAsText(file);

        } else {
            setCornerPairs({});
        }
    }

    function onCornerHintOptionChange(event) {
        setCornerHintsEnabled(event.target.checked);
        localStorage.setItem("cornerHintsEnabled", event.target.checked);
    }

    const display = (appState == "execution") ? "flex" : "none";

    return (
        <div id="exec-container" style={{display: display}}>
            <ExecTopInterface cube={cube} updateScramble={updateScramble} solution={solution} 
                cornerBufferLabel={cornerBufferLabel} edgeBufferLabel={edgeBufferLabel} 
                cornerPairs={cornerPairs} cornerHintsEnabled={cornerHintsEnabled}/>
            <Timer appState={appState}/>
            <ExecSettingsInterface settingsWindowState={settingsWindowState} toggleSettingsState={toggleSettingsState} 
                cornerBufferLabel={cornerBufferLabel} setCornerBufferLabel={setCornerBufferLabel}
                edgeBufferLabel={edgeBufferLabel} setEdgeBufferLabel={setEdgeBufferLabel}
                scrambleType={scrambleType} setScrambleType={setScrambleType} 
                onFileChange={onFileChange} onCornerHintOptionChange={onCornerHintOptionChange}/>
            <ExecBottomInterface setAppState={setAppState} stickers={stickers} toggleSettingsState={toggleSettingsState}/>
        </div>
    );
}

export default ExecInterface;
