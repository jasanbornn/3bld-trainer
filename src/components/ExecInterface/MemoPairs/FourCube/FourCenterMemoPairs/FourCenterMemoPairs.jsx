import './FourCenterMemoPairs.css';

import {
    getCenterLabelFromPerm,
    getCenterPermFromLabel,
    getNextCenterLabel,
    centerMemoToString,
} from '@/utils/FourCube/fourCenterPieceUtils.js';

function FourCenterMemoPairs({cubeState, centerBufferLabel}) {
    //centerBufferLabel is the initial buffer location

    function genCenterMemo() {
        let bufferLabel = centerBufferLabel;
        let centerMemo = [];

        let solvedCenters = [
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ]; //24 centers

        //buffer position is considered solved at the start
        let bufferIndex = getCenterPermFromLabel(bufferLabel);
        solvedCenters[bufferIndex] = 1;

        //find solved centers;
        for(let i = 0; i < cubeState.getCEP().length; i++) {
            const target = cubeState.getCEP()[i] - (cubeState.getCEP()[i] % 4);
            const index = i - (i % 4);

            if(target == index) {
                solvedCenters[i] = 1;
            }
        }

        //see centerPieceUtils getNextCenterLabel for details
        function getNextPerm(targetPerm) {
            let nextPerm = targetPerm - (targetPerm % 4);
            while(solvedCenters[nextPerm] == 1) {
                nextPerm += 1;
            }
            return nextPerm;
        }

        let currentLabel = bufferLabel;
        console.log("solved centers: " + solvedCenters);
        for(let i = 0; i < solvedCenters.length; i++) {
            if(solvedCenters[i] == 0) {
                i = -1;

                let nextLabel = getNextCenterLabel(cubeState, solvedCenters, currentLabel, bufferLabel);

                if(nextLabel == bufferLabel) {
                    for(let j = 0; j < solvedCenters.length; j++) {
                        if(solvedCenters[j] == 0) {
                            const nextPerm = getNextPerm(j);
                            nextLabel = getCenterLabelFromPerm(nextPerm);
                            centerMemo.push(nextLabel);
                            console.log("pushed: " + nextLabel);
                            console.log("solved centers: " + solvedCenters);
                            let nextNextLabel = getNextCenterLabel(cubeState, solvedCenters, nextLabel, bufferLabel);
                            bufferLabel = nextNextLabel;

                            const centerIndex = getCenterPermFromLabel(nextNextLabel);
                            solvedCenters[centerIndex] = 1; // not sure
                            centerMemo.push(nextNextLabel);
                            console.log("pushed: " + nextNextLabel);
                            console.log("solved centers: " + solvedCenters);
                            currentLabel = nextNextLabel;

                            break;
                        }
                    }
                } else {
                    const centerIndex = getCenterPermFromLabel(nextLabel);
                    solvedCenters[centerIndex] = 1; // not sure
                    centerMemo.push(nextLabel);
                    console.log("pushed: " + nextLabel);
                    console.log("solved centers: " + solvedCenters);
                    currentLabel = nextLabel;
                }

                //failsafe
                if(centerMemo.length > 30) {
                    console.log("failed memo. center labels: " + centerMemo.toString());
                    return ("center memo failed: " + centerMemoToString(centerMemo));
                }
            }
        }

        return centerMemoToString(centerMemo);
    }

    const centerMemoText = genCenterMemo();

    return (
        <div id="center-memo-text">
            <h1 id="center-memo-text">{centerMemoText}</h1>
            <h3 id="center-memo-sub-text">{(centerMemoText.length != 0) ? "Center Memo" : ""}</h3>
        </div>
    )
}

export default FourCenterMemoPairs;
