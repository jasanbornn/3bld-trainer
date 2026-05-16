import '../../EdgeMemoPairs/EdgeMemoPairs.css';

import {
    getEdgeLabelFromPerm,
    getEdgePermFromLabel,
    getNextEdgeLabel,
    edgeMemoToString,
} from '@/utils/FourCube/fourEdgePieceUtils.js';

function FourEdgeMemoPairs({cubeState, edgeBufferLabel}) {
    //edgeBufferLabel is the initial buffer location

    function genEdgeMemo() {
        let bufferLabel = edgeBufferLabel;
        let edgeMemo = [];
        let solvedEdges = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ]; //24 edges
        
        //buffer position is considered solved at the start
        let bufferIndex = getEdgePermFromLabel(bufferLabel);
        solvedEdges[bufferIndex] = 1;

        //find solved edges
        for(let i = 0; i < cubeState.getEP().length; i++) {
            if(cubeState.getEP()[i] == i) {
                solvedEdges[i] = 1;
            }
        }

        let currentLabel = bufferLabel;
        for(let i = 0; i < solvedEdges.length; i++) {
            if(solvedEdges[i] == 0) {
                i = -1;

                let nextLabel = getNextEdgeLabel(cubeState, currentLabel);

                if(nextLabel == bufferLabel) {
                    for(let j = 0; j < solvedEdges.length; j++) {
                        if(solvedEdges[j] == 0) {
                            const nextPerm = j;
                            nextLabel = getEdgeLabelFromPerm(nextPerm);
                            edgeMemo.push(nextLabel);
                            let nextNextLabel = getNextEdgeLabel(cubeState, nextLabel);
                            bufferLabel = nextNextLabel;
                            
                            const edgeIndex = getEdgePermFromLabel(nextNextLabel);
                            solvedEdges[edgeIndex] = 1;
                            edgeMemo.push(nextNextLabel);
                            currentLabel = nextNextLabel;

                            break;
                        }
                    }
                } else {
                    const edgeIndex = getEdgePermFromLabel(nextLabel);
                    solvedEdges[edgeIndex] = 1;
                    edgeMemo.push(nextLabel);
                    currentLabel = nextLabel;
                }

                //failsafe
                if(edgeMemo.length > 30) {
                    console.log("failed memo. edge labels: " + edgeMemo.toString());
                    return ("edge memo failed " + edgeMemoToString(edgeMemo));
                }
            }
        }

        return edgeMemoToString(edgeMemo);
    }

    const edgeMemoText = genEdgeMemo();

    return (
        <div id="edge-memo-text">
            <h1 id="edge-memo-text">{edgeMemoText}</h1>
            <h3 id="edge-memo-sub-text">{(edgeMemoText.length != 0) ? "Edge Memo" : ""}</h3>
        </div>
    )
}

export default FourEdgeMemoPairs;
