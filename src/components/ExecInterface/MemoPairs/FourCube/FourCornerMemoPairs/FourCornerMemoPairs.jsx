import '../../CornerMemoPairs/CornerMemoPairs.css';

import {
    getCornerLabelFromPandO,
    getCornerPandOFromLabel,
    getNextCornerLabel,
    getTwistedCornerLabel,
    cornerMemoToString,
} from '@/utils/FourCube/fourCornerPieceUtils.js';

function FourCornerMemoPairs({cubeState, cornerBufferLabel}) {
    //cornerBufferLabel is the initial buffer location
    function genCornerMemo() {
        let bufferLabel = cornerBufferLabel;
        let bufferLabelTwistBy1 = getTwistedCornerLabel(bufferLabel, 1);
        let bufferLabelTwistBy2 = getTwistedCornerLabel(bufferLabel, 2);
        let cornerMemo = [];
        let solvedCorners = [0, 0, 0, 0, 0, 0, 0, 0];

        //buffer position is considered solved at the start
        let bufferIndex = getCornerPandOFromLabel(bufferLabel)[0];
        solvedCorners[bufferIndex] = 1;

        //find solved corners
        for(let i = 0; i < cubeState.getCP().length; i++) {
            if(cubeState.getCP()[i] == i) {
                if(cubeState.getCO()[i] == 0) {
                    solvedCorners[i] = 1;
                }
            }
        }

        let currentLabel = bufferLabel;
        for(let i = 0; i < solvedCorners.length; i++) {
            if(solvedCorners[i] == 0) {
                i = -1;

                let nextLabel = getNextCornerLabel(cubeState, currentLabel);

                if(nextLabel == bufferLabel || nextLabel == bufferLabelTwistBy1 || nextLabel == bufferLabelTwistBy2) {
                    for(let j = 0; j < solvedCorners.length; j++) {
                        if(solvedCorners[j] == 0) {
                            const nextPerm = j;
                            const nextOrient = 0;
                            nextLabel = getCornerLabelFromPandO(nextPerm, nextOrient);
                            cornerMemo.push(nextLabel);
                            let nextNextLabel = getNextCornerLabel(cubeState, nextLabel);
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
                    console.log("failed memo. corner labels: " + cornerMemo.toString());
                    return ("corner memo failed " + cornerMemoToString());
                }
            }
        }

        return cornerMemoToString(cornerMemo);
    }

    const cornerMemoText = genCornerMemo();

    return (
        <div id="corner-memo-text">
            <h1 id="corner-memo-text">{cornerMemoText}</h1>
            <h3 id="corner-memo-sub-text">{(cornerMemoText.length != 0) ? "Corner Memo" : ""}</h3>
        </div>
    )
}

export default FourCornerMemoPairs;
