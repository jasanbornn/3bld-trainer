import { useState } from 'react';

function TracingCornerPreview({tracingState}) {
    const display = (tracingState == "corner") ? "grid" : "none";

    return (
        <>
            <div id="corner-preview" style={{display: display}}>
                <div id="corner-target-sticker"></div>
                <div id="corner-second-sticker"></div>
                <div id="corner-third-sticker"></div>
            </div>
        </>
    );
}

function TracingEdgePreview({tracingState}) {
    const display = (tracingState == "edge") ? "grid" : "none";

    return (
        <>
            <div id="edge-preview" style={{display: display}}>
                <div id="edge-second-sticker"></div>
                <div id="edge-target-sticker"></div>
            </div>
        </>
    );
}

function TracingTopInterface({appState, tracingState}) {
    const display = (appState == "tracing") ? "flex" : "none";

    return (
        <div id="tracing-top-container" style={{display: display}}>
            <h1>Tracing [WIP]</h1>
            <TracingCornerPreview tracingState={tracingState}/>
            <TracingEdgePreview tracingState={tracingState}/>
        </div>
    );
}

function TracingBottomInterface({appState, setAppState, tracingState, toggleTracingState}) {
    const display = (appState == "tracing") ? "flex" : "none";


    return (
        <div id="tracing-bottom-container" style={{display: display}}>
            <button onClick={() => {setAppState("execution")}}>Execution</button>
            <button onClick={toggleTracingState}>{(tracingState == "corner") ? "Corner" : "Edge"}</button>
        </div>
    );
}

function TracingInterface({appState, setAppState}) {
    const [tracingState, setTracingState] = useState("corner"); //corner or edge

    function toggleTracingState() {
        const newState = (tracingState == "corner") ? "edge" : "corner";
        setTracingState(newState);
    }

    return (
        <>
            <TracingTopInterface appState={appState} tracingState={tracingState}/>
            <TracingBottomInterface appState={appState} setAppState={setAppState} tracingState={tracingState} toggleTracingState={toggleTracingState}/>
        </>
    );
}

export default TracingInterface;
