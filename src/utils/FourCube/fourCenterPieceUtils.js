import FourCube from './FourCube.js';
const fourCube = FourCube();

//should have done this for other piece utils maybe
const centerLabels = [
    "ULB", "UBR", "URF", "UFL",
    "LBU", "LUF", "LFD", "LDB",
    "FLU", "FUR", "FRD", "FDL",
    "RFU", "RUB", "RBD", "RDF",
    "BRU", "BUL", "BLD", "BDR",
    "DLF", "DFR", "DRB", "DBL",
];

function getCenterLabelFromPerm(permutation) {
    return centerLabels[permutation];

}

function getCenterPermFromLabel(label) {
    for(let i = 0; i < centerLabels.length; i++) {
        if(centerLabels[i] == label) {
            return i;
        }
    }
    console.log("invalid center label!: " + label);
    return 0;
}

function getSpeffzLetterFromCenterLabel(label) {
    const letterScheme = "ABCDEFGHIJKLMNOPQRSTUVWX"; 
    return letterScheme[getCenterPermFromLabel(label)];
}

function getNextCenterLabel(cubeState, solvedCenters, label, bufferLabel) {
    const NUM_CENTERS_ON_FACE = 4;

    const perm = getCenterPermFromLabel(label);
    let nextPerm = cubeState.getCEP()[perm];
    //round to nearest lower number divisible by four.
    //this lines up with the first center on each face.
    nextPerm -= (nextPerm % 4);
    //we will put the center into the first unsolved center
    //slot on the face.
    //ugly for loop use?
    for(let i = 0; i <= NUM_CENTERS_ON_FACE; i++) {
        //if all four centers on the face are checked and there
        //is still not a spot left, the piece must be the buffer piece.
        //return the buffer label which should be the last label
        //in the memo.
        if(i == NUM_CENTERS_ON_FACE) {
            //nextPerm -= NUM_CENTERS_ON_FACE;
            return bufferLabel;
            break;
        }
        //if we find an unsolved center, nextPerm will be there
        if(solvedCenters[nextPerm] == 0) {
            break;
        }
        //otherwise keep advancing nextPerm
        nextPerm += 1;
    }

    const nextLabel = getCenterLabelFromPerm(nextPerm);
    return nextLabel;
}

function centerMemoToString(centerMemo) {
    let centerMemoString = "";

    for(let i = 0; i < centerMemo.length; i++) {
        centerMemoString += getSpeffzLetterFromCenterLabel(centerMemo[i]);
        if(i % 2 == 1) {
            centerMemoString += " ";
        }
    }

    return centerMemoString;
}

export {
    getCenterLabelFromPerm,
    getCenterPermFromLabel,
    getNextCenterLabel,
    centerMemoToString,
}
