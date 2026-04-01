import { useState } from 'react'
import './App.css'

const Cube = window.Cube;
Cube.initSolver();

const cube = new Cube();

function CubeNet({stickers}) {

    return (
        <div id="cube-net">
            <CubeNetSpacer/>
            <CubeNetFace stickers={stickers.substring(0,9)}/>
            <CubeNetSpacer/>
            <CubeNetSpacer/>

            <CubeNetFace stickers={stickers.substring(36,45)}/>
            <CubeNetFace stickers={stickers.substring(18,27)}/>
            <CubeNetFace stickers={stickers.substring(9,18)}/>
            <CubeNetFace stickers={stickers.substring(45,54)}/>

            <CubeNetSpacer/>
            <CubeNetFace stickers={stickers.substring(27,36)}/>
            <CubeNetSpacer/>
            <CubeNetSpacer/>
        </div>
    );
}

function CubeNetFace({stickers}) {

    function getColorFromSticker(sticker) {
        switch(sticker) {
            case "U":
                return "white";
            case "D":
                return "yellow";
            case "L":
                return "orange";
            case "R":
                return "red";
            case "F":
                return "green";
            case "B":
                return "blue";
            default:
                return "pink";
        }
    }

    return (
        <div id="cube-net-face">
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(0))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(1))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(2))}/>

            <CubeNetSticker color={getColorFromSticker(stickers.charAt(3))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(4))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(5))}/>

            <CubeNetSticker color={getColorFromSticker(stickers.charAt(6))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(7))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(8))}/>
        </div>
    );
}


function CubeNetSticker({color}) {

    return (
        <div id="cube-net-sticker" style={{backgroundColor: color}}>

        </div>
    )
}

function CubeNetSpacer() {

    return (
        <div id="cube-net-spacer">

        </div>
    );
}


function MemoPairs({cubeState}) {
    return (
        <>
            <EdgeMemoPairs cubeState={cubeState}/>
            <CornerMemoPairs cubeState={cubeState}/>
        </>
    );
}

function EdgeMemoPairs({cubeState}) {
    //buffer edge (DF) letter K: perm: 5 orientation: 0
    //buffer corner (UFB) letter A: perm: 2 orientation 0

    //given edge permutation index and orientation, get label such as DF (down-front), UL, RB, etc.
    function getEdgeLabelFromPandO(permutation, orientation) {
        switch(permutation) {
            case 0:
                return orientation ? "RU" : "UR";
            case 1:                            
                return orientation ? "FU" : "UF";
            case 2:                            
                return orientation ? "LU" : "UL";
            case 3:                            
                return orientation ? "BU" : "UB";
            case 4:                            
                return orientation ? "RD" : "DR";
            case 5:                            
                return orientation ? "FD" : "DF";
            case 6:                            
                return orientation ? "LD" : "DL";
            case 7:                            
                return orientation ? "BD" : "DB";
            case 8:                            
                return orientation ? "RF" : "FR";
            case 9:                            
                return orientation ? "LF" : "FL";
            case 10:                           
                return orientation ? "LB" : "BL";
            case 11:                           
                return orientation ? "RB" : "BR";
        }
    }

    //given label, give permutation and orientation such as DF = [5,0], FD = [5,1]
    function getEdgePandOFromLabel(label) {
        switch(label) {
            case "UR":
                return [0, 0];
            case "RU":
                return [0, 1];
            case "UF":
                return [1, 0];
            case "FU":
                return [1, 1];
            case "UL":
                return [2, 0];
            case "LU":
                return [2, 1];
            case "UB":
                return [3, 0];
            case "BU":
                return [3, 1];
            case "DR":
                return [4, 0];
            case "RD":
                return [4, 1];
            case "DF":
                return [5, 0];
            case "FD":
                return [5, 1];
            case "DL":
                return [6, 0];
            case "LD":
                return [6, 1];
            case "DB":
                return [7, 0];
            case "BD":
                return [7, 1];
            case "FR":
                return [8, 0];
            case "RF":
                return [8, 1];
            case "FL":
                return [9, 0];
            case "LF":
                return [9, 1];
            case "BL":
                return [10, 0];
            case "LB":
                return [10, 1];
            case "BR":
                return [11, 0];
            case "RB":
                return [11, 1];
        }
    }

    function getFlippedEdgeLabel(label) {
        const [perm, orient] = getEdgePandOFromLabel(label);
        const flipped = getEdgeLabelFromPandO(perm, !orient);
        return flipped;
    }

    function getNextEdgeLabel(label) {
        const [perm, orient] = getEdgePandOFromLabel(label);
        const nextPerm = cubeState.ep[perm];
        const nextOrient = orient ? !cubeState.eo[perm] : cubeState.eo[perm];
        const nextLabel = getEdgeLabelFromPandO(nextPerm, nextOrient);
        return nextLabel;
    }

    function getSpeffzLetterFromEdgeLabel(label) {
        const letterScheme = "ABCDEFGHIJKLMNOPQRSTUVWX"

        switch(label) {
            case "UB":
                return letterScheme[0];
            case "UR":
                return letterScheme[1];
            case "UF":
                return letterScheme[2];
            case "UL":
                return letterScheme[3];
            case "LU":
                return letterScheme[4];
            case "LF":
                return letterScheme[5];
            case "LD":
                return letterScheme[6];
            case "LB":
                return letterScheme[7];
            case "FU":
                return letterScheme[8];
            case "FR":
                return letterScheme[9];
            case "FD":
                return letterScheme[10];
            case "FL":
                return letterScheme[11];
            case "RU":
                return letterScheme[12];
            case "RB":
                return letterScheme[13];
            case "RD":
                return letterScheme[14];
            case "RF":
                return letterScheme[15];
            case "BU":
                return letterScheme[16];
            case "BL":
                return letterScheme[17];
            case "BD":
                return letterScheme[18];
            case "BR":
                return letterScheme[19];
            case "DF":
                return letterScheme[20];
            case "DR":
                return letterScheme[21];
            case "DB":
                return letterScheme[22];
            case "DL":
                return letterScheme[23];
        }
    }
    
    function edgeMemoToString(edgeMemo) {
        let edgeMemoString = "";

        for(let i = 0; i < edgeMemo.length; i++) {
            edgeMemoString += getSpeffzLetterFromEdgeLabel(edgeMemo[i]);
            if(i % 2 == 1) {
                edgeMemoString += " ";
            }
        }

        return edgeMemoString;

    }

    function genEdgeMemo() {
        let bufferLabel = "DF";
        let bufferLabelFlipped = "FD";
        let edgeMemo = [];
        let solvedEdges = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        //buffer position is considered solved at the start
        let bufferIndex = getEdgePandOFromLabel(bufferLabel)[0];
        solvedEdges[bufferIndex] = 1;

        //find solved edges
        for(let i = 0; i < cubeState.ep.length; i++) {
            if(cubeState.ep[i] == i) {
                if(cubeState.eo[i] == 0) {
                    solvedEdges[i] = 1;
                }
            }
        }

        let currentLabel = bufferLabel;
        for(let i = 0; i < solvedEdges.length; i++) {
            if(solvedEdges[i] == 0) {
                i = -1;

                let nextLabel = getNextEdgeLabel(currentLabel);

                if(nextLabel == bufferLabel || nextLabel == bufferLabelFlipped) {
                    for(let j = 0; j < solvedEdges.length; j++) {
                        if(solvedEdges[j] == 0) {
                            const nextPerm = j;
                            const nextOrient = 0;
                            nextLabel = getEdgeLabelFromPandO(nextPerm, nextOrient);
                            edgeMemo.push(nextLabel);
                            let nextNextLabel = getNextEdgeLabel(nextLabel);
                            bufferLabel = nextNextLabel;
                            bufferLabelFlipped = getFlippedEdgeLabel(bufferLabel);

                            const edgeIndex = getEdgePandOFromLabel(nextNextLabel)[0];
                            solvedEdges[edgeIndex] = 1;
                            edgeMemo.push(nextNextLabel);
                            currentLabel = nextNextLabel;

                            break;
                        }
                    }
                } else {
                    const edgeIndex = getEdgePandOFromLabel(nextLabel)[0];
                    solvedEdges[edgeIndex] = 1;
                    edgeMemo.push(nextLabel);
                    currentLabel = nextLabel;
                }

                //failsafe
                if(edgeMemo.length > 30) {
                    return ("edge memo failed " + edgeMemo.toString());
                }
            }
        }

        return edgeMemoToString(edgeMemo);
    }


    return (
        <div id="edge-memo-text">
            <h1>{genEdgeMemo()}</h1>
            <h3>Edge Memo</h3>
        </div>
    )
}

function CornerMemoPairs({cubeState}) {

    function getCornerLabelFromPandO(permutation, orientation) {
        switch(permutation) {
            case 0:
                switch(orientation) {
                    case 0:
                        return "UFR";
                    case 1:
                        return "FUR";
                    case 2:
                        return "RUF";
                }
            case 1:
                switch(orientation) {
                    case 0:
                        return "UFL";
                    case 1:
                        return "LUF";
                    case 2:
                        return "FUL";
                }
            case 2:
                switch(orientation) {
                    case 0:
                        return "UBL";
                    case 1:
                        return "BUL";
                    case 2:
                        return "LUB";
                }
            case 3:
                switch(orientation) {
                    case 0:
                        return "UBR";
                    case 1:
                        return "RUB";
                    case 2:
                        return "BUR";
                }
            case 4:
                switch(orientation) {
                    case 0:
                        return "DFR";
                    case 1:
                        return "RDF";
                    case 2:
                        return "FDR";
                }
            case 5:
                switch(orientation) {
                    case 0:
                        return "DFL";
                    case 1:
                        return "FDL";
                    case 2:
                        return "LDF";
                }
            case 6:
                switch(orientation) {
                    case 0:
                        return "DBL";
                    case 1:
                        return "LDB";
                    case 2:
                        return "BDL";
                }
            case 7:
                switch(orientation) {
                    case 0:
                        return "DBR";
                    case 1:
                        return "BDR";
                    case 2:
                        return "RDB";
                }

        }
    }

    function getCornerPandOFromLabel(label) {
        switch(label) {
            case "UFR":
                return [0, 0];
            case "FUR":
                return [0, 1];
            case "RUF":
                return [0, 2];
            case "UFL":
                return [1, 0];
            case "LUF":
                return [1, 1];
            case "FUL":
                return [1, 2];
            case "UBL":
                return [2, 0];
            case "BUL":
                return [2, 1];
            case "LUB":
                return [2, 2];
            case "UBR":
                return [3, 0];
            case "RUB":
                return [3, 1];
            case "BUR":
                return [3, 2];
            case "DFR":
                return [4, 0];
            case "RDF":
                return [4, 1];
            case "FDR":
                return [4, 2];
            case "DFL":
                return [5, 0];
            case "FDL":
                return [5, 1];
            case "LDF":
                return [5, 2];
            case "DBL":
                return [6, 0];
            case "LDB":
                return [6, 1];
            case "BDL":
                return [6, 2];
            case "DBR":
                return [7, 0];
            case "BDR":
                return [7, 1];
            case "RDB":
                return [7, 2];
        }
    }

    function getSpeffzLetterFromCornerLabel(label) {
        const letterScheme = "ABCDEFGHIJKLMNOPQRSTUVWX"

        switch(label) {
            case "UBL":
                return letterScheme[0];
            case "UBR":
                return letterScheme[1];
            case "UFR":
                return letterScheme[2];
            case "UFL":
                return letterScheme[3];
            case "LUB":
                return letterScheme[4];
            case "LUF":
                return letterScheme[5];
            case "LDF":
                return letterScheme[6];
            case "LDB":
                return letterScheme[7];
            case "FUL":
                return letterScheme[8];
            case "FUR":
                return letterScheme[9];
            case "FDR":
                return letterScheme[10];
            case "FDL":
                return letterScheme[11];
            case "RUF":
                return letterScheme[12];
            case "RUB":
                return letterScheme[13];
            case "RDB":
                return letterScheme[14];
            case "RDF":
                return letterScheme[15];
            case "BUR":
                return letterScheme[16];
            case "BUL":
                return letterScheme[17];
            case "BDL":
                return letterScheme[18];
            case "BDR":
                return letterScheme[19];
            case "DFL":
                return letterScheme[20];
            case "DFR":
                return letterScheme[21];
            case "DBR":
                return letterScheme[22];
            case "DBL":
                return letterScheme[23];
        }

    }

    function cornerMemoToString(cornerMemo) {
        let cornerMemoString = "";

        for(let i = 0; i < cornerMemo.length; i++) {
            cornerMemoString += getSpeffzLetterFromCornerLabel(cornerMemo[i]);
            if(i % 2 == 1) {
                cornerMemoString += " ";
            }
        }

        return cornerMemoString;

    }


    function getNextCornerLabel(label) {
        const [perm, orient] = getCornerPandOFromLabel(label);
        const nextPerm = cubeState.cp[perm];
        const nextOrient = (orient + cubeState.co[perm]) % 3;
        const nextLabel = getCornerLabelFromPandO(nextPerm, nextOrient);
        return nextLabel;
    }

    function getTwistedCornerLabel(label, twistAmount) {
        const [perm, orient] = getCornerPandOFromLabel(label);
        const newOrient = (orient + twistAmount) % 3;
        const twisted = getCornerLabelFromPandO(perm, newOrient);
        return twisted;
    }

    function genCornerMemo() {
        let bufferLabel = "UBL";
        let bufferLabelTwistBy1 = "LUB";
        let bufferLabelTwistBy2 = "BUL";
        let cornerMemo = [];
        let solvedCorners = [0, 0, 0, 0, 0, 0, 0, 0];

        //buffer position is considered solved at the start
        let bufferIndex = getCornerPandOFromLabel(bufferLabel)[0];
        solvedCorners[bufferIndex] = 1;

        //find solved corners
        for(let i = 0; i < cubeState.cp.length; i++) {
            if(cubeState.cp[i] == i) {
                if(cubeState.co[i] == 0) {
                    solvedCorners[i] = 1;
                }
            }
        }

        let currentLabel = bufferLabel;
        for(let i = 0; i < solvedCorners.length; i++) {
            if(solvedCorners[i] == 0) {
                i = -1;

                let nextLabel = getNextCornerLabel(currentLabel);

                if(nextLabel == bufferLabel || nextLabel == bufferLabelTwistBy1 || nextLabel == bufferLabelTwistBy2) {
                    for(let j = 0; j < solvedCorners.length; j++) {
                        if(solvedCorners[j] == 0) {
                            const nextPerm = j;
                            const nextOrient = 0;
                            nextLabel = getCornerLabelFromPandO(nextPerm, nextOrient);
                            cornerMemo.push(nextLabel);
                            let nextNextLabel = getNextCornerLabel(nextLabel);
                            bufferLabel = nextNextLabel;
                            bufferLabelTwistBy1 = getTwistedCornerLabel(bufferLabel, 1);
                            bufferLabelTwistBy2 = getTwistedCornerLabel(bufferLabel, 2);

                            const cornerIndex = getCornerPandOFromLabel(nextNextLabel)[0];
                            solvedCorners[cornerIndex] = 1;
                            cornerMemo.push(nextNextLabel);
                            currentLabel = nextNextLabel;

                            break;
                        }
                    }
                } else {
                    const cornerIndex = getCornerPandOFromLabel(nextLabel)[0];
                    solvedCorners[cornerIndex] = 1;
                    cornerMemo.push(nextLabel);
                    currentLabel = nextLabel;
                }

                //failsafe
                if(cornerMemo.length > 20) {
                    return ("corner memo failed " + cornerMemo.toString());
                }
            }
        }

        return cornerMemoToString(cornerMemo);
    }


    return (
        <div id="corner-memo-text">
            <h1>{genCornerMemo()}</h1>
            <h3>Corner Memo</h3>
        </div>
    )
}

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

function ExecInterface({appState, setAppState}) {
    const [solution, setSolution] = useState("");
    const [stickers, setStickers] = useState("UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB");

    function updateScramble() {
        cube.randomize();
        setSolution(Cube.inverse(cube.solve()));
        setStickers(cube.asString());
    }

    return (
        <>
            <ExecTopInterface appState={appState} cube={cube} updateScramble={updateScramble} solution={solution}/>
            <ExecBottomInterface appState={appState} setAppState={setAppState} stickers={stickers}/>
        </>
    );

}

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

function App() {
    const [appState, setAppState] = useState("execution"); // "execution" or "tracing"


    return (
        <>

            <ExecInterface appState={appState} setAppState={setAppState}/>
            <TracingInterface appState={appState} setAppState={setAppState}/>

        </>
    )
}

export default App
