import {
    getEdgeLabelFromPandO,
    getEdgePandOFromLabel,
    getNextEdgeLabel,
    getFlippedEdgeLabel,
    edgeMemoToString,
} from '@/utils/edgePieceUtils.js';


function EdgeMemoPairs({cubeState}) {

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

                let nextLabel = getNextEdgeLabel(cubeState, currentLabel);

                if(nextLabel == bufferLabel || nextLabel == bufferLabelFlipped) {
                    for(let j = 0; j < solvedEdges.length; j++) {
                        if(solvedEdges[j] == 0) {
                            const nextPerm = j;
                            const nextOrient = 0;
                            nextLabel = getEdgeLabelFromPandO(nextPerm, nextOrient);
                            edgeMemo.push(nextLabel);
                            let nextNextLabel = getNextEdgeLabel(cubeState, nextLabel);
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

export default EdgeMemoPairs;
