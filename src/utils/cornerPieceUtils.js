function getCornerLabelFromPandO(permutation, orientation) {
    switch(permutation) {
        case 0:
            switch(orientation) {
                case 0:
                    return "URF";
                case 1:
                    return "FUR";
                case 2:
                    return "RFU";
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
                    return "ULB";
                case 1:
                    return "BUL";
                case 2:
                    return "LBU";
            }
        case 3:
            switch(orientation) {
                case 0:
                    return "UBR";
                case 1:
                    return "RUB";
                case 2:
                    return "BRU";
            }
        case 4:
            switch(orientation) {
                case 0:
                    return "DFR";
                case 1:
                    return "RDF";
                case 2:
                    return "FRD";
            }
        case 5:
            switch(orientation) {
                case 0:
                    return "DLF";
                case 1:
                    return "FDL";
                case 2:
                    return "LFD";
            }
        case 6:
            switch(orientation) {
                case 0:
                    return "DBL";
                case 1:
                    return "LDB";
                case 2:
                    return "BLD";
            }
        case 7:
            switch(orientation) {
                case 0:
                    return "DRB";
                case 1:
                    return "BDR";
                case 2:
                    return "RBD";
            }
    }
}

function getCornerPandOFromLabel(label) {
    switch(label) {
        case "URF":
            return [0, 0];
        case "FUR":
            return [0, 1];
        case "RFU":
            return [0, 2];
        case "UFL":
            return [1, 0];
        case "LUF":
            return [1, 1];
        case "FUL":
            return [1, 2];
        case "ULB":
            return [2, 0];
        case "BUL":
            return [2, 1];
        case "LBU":
            return [2, 2];
        case "UBR":
            return [3, 0];
        case "RUB":
            return [3, 1];
        case "BRU":
            return [3, 2];
        case "DFR":
            return [4, 0];
        case "RDF":
            return [4, 1];
        case "FRD":
            return [4, 2];
        case "DLF":
            return [5, 0];
        case "FDL":
            return [5, 1];
        case "LFD":
            return [5, 2];
        case "DBL":
            return [6, 0];
        case "LDB":
            return [6, 1];
        case "BLD":
            return [6, 2];
        case "DRB":
            return [7, 0];
        case "BDR":
            return [7, 1];
        case "RBD":
            return [7, 2];
    }
}

function getSpeffzLetterFromCornerLabel(label) {
    const letterScheme = "ABCDEFGHIJKLMNOPQRSTUVWX"

    //TODO: FIX LETTER SCHEME
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
        case "FUL":
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

export {
    getCornerLabelFromPandO,
    getCornerPandOFromLabel,
    getNextCornerLabel,
    getTwistedCornerLabel,
    getSpeffzLetterFromCornerLabel,
    cornerMemoToString,
}
