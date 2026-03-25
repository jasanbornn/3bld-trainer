import { useState } from 'react'
import './App.css'

const Cube = window.Cube;
Cube.initSolver();

const cube = new Cube();

function Button({text, onClick}) {

    return (
        <button
            className="button"
            onClick={onClick}
        >{text}</button>
    )

}

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

    function getSpeffzLetterFromLabel(label) {
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
            edgeMemoString += getSpeffzLetterFromLabel(edgeMemo[i]);
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

        console.log("presolved edges: " + solvedEdges);

        let currentLabel = bufferLabel;
        for(let i = 0; i < solvedEdges.length; i++) {
            if(solvedEdges[i] == 0) {
                i = -1;

                let nextLabel = getNextEdgeLabel(currentLabel);

                if(nextLabel == bufferLabel || nextLabel == bufferLabelFlipped) {
                    //bufferIndex = getEdgePandOFromLabel(bufferLabel)[0];
                    for(let j = 0; j < solvedEdges.length; j++) {
                        if(solvedEdges[j] == 0 /*&& j != bufferIndex*/) {
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
                            
                            console.log("edgeMemo: " + edgeMemo);
                            console.log("new cycle: " + nextLabel);
                            break;
                        }
                    }
                } else {
                    const edgeIndex = getEdgePandOFromLabel(nextLabel)[0];
                    solvedEdges[edgeIndex] = 1;
                    edgeMemo.push(nextLabel);
                    console.log("edgeMemo: " + edgeMemo);
                    console.log("solved edges: " + solvedEdges);
                    currentLabel = nextLabel;
                }

                //failsafe
                if(edgeMemo.length > 30) {
                    console.log("edge memo failed: " + edgeMemo);
                    return ("edge memo failed " + edgeMemo.toString());
                }
            }
        }

        console.log("final edge memo: " + edgeMemo);
        return edgeMemoToString(edgeMemo);
    }


    return (
        <div id="edge-memo-text">
            <h1>{genEdgeMemo()}</h1>
        </div>
    )
}

function App() {
    const [solution, setSolution] = useState("");
    const [stickers, setStickers] = useState("UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB");

    function updateScramble() {
        cube.randomize();
        //cube.identity();
        //cube.move("L2 U2 F2 L2 F2 L2 R2 D B2 R2 F2 U' R' D' L2 R2 U R'"); // few edges with new cycle
        //cube.init(Cube.fromString("UUUUUFUUURRRLRRRRRFFFFFUFFFDDDDDDDDDLRLLLLLLLBBBBBBBBB")); // few edges buffer piece starts solved
        //R2 U2 B2 U' R2 U' F2 D' B2 D B2 L' B U L B R2 B' F R2
        //cube.move("B2 F' B R2 B' L' U' B' L B2 D' B2 D F2 U R2 U B2 U2 R2"); //study scramble
        setSolution(Cube.inverse(cube.solve()));
        setStickers(cube.asString());
        console.log("state: " + JSON.stringify(cube.toJSON()));
        console.log("faces: " + cube.asString());
    }

    return (
        <>

        <div id="top-container">
            <div id="scramble-container">
                <div>
                    <h1>{solution}</h1>
                </div>
                <Button text="↺" onClick={updateScramble}/>
            </div>

            <div id="memo-text-conatiner">
                <MemoPairs cubeState={cube}/>
            </div>
        </div>

        <div id="cube-net-container">
            <CubeNet stickers={stickers}/>
        </div>



        </>
    )
}

export default App
