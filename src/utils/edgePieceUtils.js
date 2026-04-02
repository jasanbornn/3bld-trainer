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

function getNextEdgeLabel(cubeState, label) {
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

export {
    getEdgeLabelFromPandO,
    getEdgePandOFromLabel,
    getNextEdgeLabel,
    getFlippedEdgeLabel,
    getSpeffzLetterFromEdgeLabel,
    edgeMemoToString
};
