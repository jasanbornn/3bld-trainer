import { useEffect } from 'react';
import './ExecSettingsInterface.css';

function ExecSettingsInterface({
    settingsWindowState, 
    toggleSettingsState, 
    cornerBufferLabel, 
    setCornerBufferLabel, 
    edgeBufferLabel, 
    setEdgeBufferLabel,
    scrambleType,
    setScrambleType,
    onFileChange,
    onCornerHintOptionChange}) {

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
                <button onClick={() => {setCornerBufferLabel("URF")}} style={{backgroundColor: (cornerBufferLabel == "URF") ? "#666" : "#fff"}}>URF</button>
                <button onClick={() => {setCornerBufferLabel("ULB")}} style={{backgroundColor: (cornerBufferLabel == "ULB") ? "#666" : "#fff"}}>ULB</button>
            </div>

            <h1>Edge Buffer</h1>
            <div id="settings-select-buttons-container">
                <button onClick={() => {setEdgeBufferLabel("UF")}} style={{backgroundColor: (edgeBufferLabel == "UF") ? "#666" : "#fff"}}>UF</button>
                <button onClick={() => {setEdgeBufferLabel("DF")}} style={{backgroundColor: (edgeBufferLabel == "DF") ? "#666" : "#fff"}}>DF</button>
                <button onClick={() => {setEdgeBufferLabel("UR")}} style={{backgroundColor: (edgeBufferLabel == "UR") ? "#666" : "#fff"}}>UR</button>
            </div>

            <h1>Scramble Type</h1>
            <div id="settings-select-buttons-container">
                <button onClick={() => {setScrambleType("full")}} style={{backgroundColor: (scrambleType == "full") ? "#666" : "#fff"}}>Full</button>
                <button onClick={() => {setScrambleType("corner")}} style={{backgroundColor: (scrambleType == "corner") ? "#666" : "#fff"}}>Corners only</button>
                <button onClick={() => {setScrambleType("edge")}} style={{backgroundColor: (scrambleType == "edge") ? "#666" : "#fff"}}>Edges only</button>
            </div>

            <h1>Letter Pair Hints</h1>
            <div id="corner-hints-setting-container">
                <input id="corner-hints-checkbox" type="checkbox" name="corner-hints-checkbox" onChange={onCornerHintOptionChange}></input>
                <label htmlFor="corner-hints-checkbox">Enable for corners</label>
            </div>
            
            <h2>Import Letter Pairs</h2>
            <input id="pairs-upload" type="file" accept=".csv" onChange={onFileChange}></input>

            <button onClick={() => {toggleSettingsState()}}>Close</button>

        </div>
    );
}

export default ExecSettingsInterface;
