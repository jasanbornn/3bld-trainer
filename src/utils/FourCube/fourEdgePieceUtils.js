import FourCube from './FourCube.js';
const fourCube = FourCube();

function getEdgeLabelFromPerm(permutation) {
    return fourCube.getEdgeColor(permutation, true) +
        fourCube.getEdgeColor(permutation, false);
}

function getEdgePermFromLabel(label) {
    switch(label) {
        case "UB":
            return 0;
        case "UR":
            return 1;
        case "UF":
            return 2;
        case "UL":
            return 3;
        case "LU":
            return 4;
        case "LF":
            return 5;
        case "LD":
            return 6;
        case "LB":
            return 7;
        case "FU":
            return 8;
        case "FR":
            return 9;
        case "FD":
            return 10;
        case "FL":
            return 11;
        case "RU":
            return 12;
        case "RB":
            return 13;
        case "RD":
            return 14;
        case "RF":
            return 15;
        case "BU":
            return 16;
        case "BL":
            return 17;
        case "BD":
            return 18;
        case "BR":
            return 19;
        case "DF":
            return 20;
        case "DR":
            return 21;
        case "DB":
            return 22;
        case "DL":
            return 23;
    }
}

function getSpeffzLetterFromEdgeLabel(label) {
    const letterScheme = "ABCDEFGHIJKLMNOPQRSTUVWX";
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

function getNextEdgeLabel(cubeState, label) {
    const perm = getEdgePermFromLabel(label);
    const nextPerm = cubeState.getEP()[perm];
    const nextLabel = getEdgeLabelFromPerm(nextPerm);
    return nextLabel;
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

export {
    getEdgeLabelFromPerm,
    getEdgePermFromLabel,
    getNextEdgeLabel,
    edgeMemoToString,
}


