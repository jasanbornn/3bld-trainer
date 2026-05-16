import FourCube from './FourCube.js';
const fourCube = FourCube();

function getCornerLabelFromPandO(permutation, orientation) {
    return fourCube.getCornerColor(permutation, orientation, 1) +
        fourCube.getCornerColor(permutation, orientation, 2) + 
        fourCube.getCornerColor(permutation, orientation, 3);
}

function getCornerPandOFromLabel(label) {
    switch(label) {
        case "ULB":
            return [0, 0];
        case "BUL":
            return [0, 1];
        case "LBU":
            return [0, 2];
        case "UBR":
            return [1, 0];
        case "RUB":
            return [1, 1];
        case "BRU":
            return [1, 2];
        case "URF":
            return [2, 0];
        case "FUR":
            return [2, 1];
        case "RFU":
            return [2, 2];
        case "UFL":
            return [3, 0];
        case "LUF":
            return [3, 1];
        case "FLU":
            return [3, 2];
        case "DLF":
            return [4, 0];
        case "FDL":
            return [4, 1];
        case "LFD":
            return [4, 2];
        case "DFR":
            return [5, 0];
        case "RDF":
            return [5, 1];
        case "FRD":
            return [5, 2];
        case "DRB":
            return [6, 0];
        case "BDR":
            return [6, 1];
        case "RBD":
            return [6, 2];
        case "DBL":
            return [7, 0];
        case "LDB":
            return [7, 1];
        case "BLD":
            return [7, 2];
        default:
            console.log("undefined label! (" + label + ")"); 
    }
}

function getSpeffzLetterFromCornerLabel(label) {
    const letterScheme = "ABCDEFGHIJKLMNOPQRSTUVWX";
    switch(label) {
        case "ULB":
            return letterScheme[0];
        case "UBR":
            return letterScheme[1];
        case "URF":
            return letterScheme[2];
        case "UFL":
            return letterScheme[3];
        case "LBU":
            return letterScheme[4];
        case "LUF":
            return letterScheme[5];
        case "LFD":
            return letterScheme[6];
        case "LDB":
            return letterScheme[7];
        case "FLU":
            return letterScheme[8];
        case "FUR":
            return letterScheme[9];
        case "FRD":
            return letterScheme[10];
        case "FDL":
            return letterScheme[11];
        case "RFU":
            return letterScheme[12];
        case "RUB":
            return letterScheme[13];
        case "RBD":
            return letterScheme[14];
        case "RDF":
            return letterScheme[15];
        case "BRU":
            return letterScheme[16];
        case "BUL":
            return letterScheme[17];
        case "BLD":
            return letterScheme[18];
        case "BDR":
            return letterScheme[19];
        case "DLF":
            return letterScheme[20];
        case "DFR":
            return letterScheme[21];
        case "DRB":
            return letterScheme[22];
        case "DBL":
            return letterScheme[23];
        default:
            console.log("undefined corner label! (" + label + ")"); 
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


function getNextCornerLabel(cubeState, label) {
    const [perm, orient] = getCornerPandOFromLabel(label);
    const nextPerm = cubeState.getCP()[perm];
    const nextOrient = (orient + cubeState.getCO()[perm]) % 3;
    const nextLabel = getCornerLabelFromPandO(nextPerm, nextOrient);
    return nextLabel;
}

function getTwistedCornerLabel(label, twistAmount) {
    const [perm, orient] = getCornerPandOFromLabel(label);
    const newOrient = (orient + twistAmount) % 3;
    const twisted = getCornerLabelFromPandO(perm, newOrient);
    return twisted;
}

export {
    getCornerLabelFromPandO,
    getCornerPandOFromLabel,
    getNextCornerLabel,
    getTwistedCornerLabel,
    getSpeffzLetterFromCornerLabel,
    cornerMemoToString,
}
