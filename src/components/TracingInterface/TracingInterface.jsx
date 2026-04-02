import { useState } from 'react';
import './TracingInterface.css';

import CornerPreview from './CornerPreview/CornerPreview.jsx';
import EdgePreview from './EdgePreview/EdgePreview.jsx';

function TracingTopInterface({appState, tracingState, revealState, setRevealState}) {
    const display = (appState == "tracing") ? "flex" : "none";

    return (
        <div id="tracing-top-container" style={{display: display}}>
            <h1>Tracing</h1>
            <CornerPreview tracingState={tracingState} revealState={revealState} setRevealState={setRevealState} />
            <EdgePreview tracingState={tracingState} revealState={revealState} />
        </div>
    );
}

function TracingBottomInterface({appState, setAppState, tracingState, toggleTracingState, revealState, toggleRevealState}) {
    const display = (appState == "tracing") ? "flex" : "none";

    return (
        <div id="tracing-bottom-container" style={{display: display}}>
            <button onClick={toggleRevealState}>{(revealState == "revealed") ? "Next" : "Reveal"}</button>
            <div id="bottom-buttons-container">
                <button onClick={() => {setAppState("execution")}}>Execution</button>
                <button onClick={toggleTracingState}>{(tracingState == "corner") ? "Corner" : "Edge"}</button>
            </div>
        </div>
    );
}

function TracingInterface({appState, setAppState}) {
    const [tracingState, setTracingState] = useState("corner"); //corner or edge
    const [revealState, setRevealState] = useState("hidden"); //hidden or revealed

    function toggleTracingState() {
        const newState = (tracingState == "corner") ? "edge" : "corner";
        setTracingState(newState);
    }

    function toggleRevealState() {
        const newState = (revealState == "hidden") ? "revealed" : "hidden";
        setRevealState(newState);
    }

    return (
        <>
            <TracingTopInterface appState={appState} tracingState={tracingState} revealState={revealState} setRevealState={setRevealState}/>
            <TracingBottomInterface appState={appState} setAppState={setAppState} 
                tracingState={tracingState} toggleTracingState={toggleTracingState}
                revealState={revealState} toggleRevealState={toggleRevealState}/>
        </>
    );
}

export default TracingInterface;
