function getCornerLabelFromPandO(permutation, orientation) {
    switch(permutation) {
        case 0:
            switch(orientation) {
                case 0:
                    return "UFR";
                case 1:
                    return "FUR";
                case 2:
                    return "RUF";
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
                    return "UBL";
                case 1:
                    return "BUL";
                case 2:
                    return "LUB";
            }
        case 3:
            switch(orientation) {
                case 0:
                    return "UBR";
                case 1:
                    return "RUB";
                case 2:
                    return "BUR";
            }
        case 4:
            switch(orientation) {
                case 0:
                    return "DFR";
                case 1:
                    return "RDF";
                case 2:
                    return "FDR";
            }
        case 5:
            switch(orientation) {
                case 0:
                    return "DFL";
                case 1:
                    return "FDL";
                case 2:
                    return "LDF";
            }
        case 6:
            switch(orientation) {
                case 0:
                    return "DBL";
                case 1:
                    return "LDB";
                case 2:
                    return "BDL";
            }
        case 7:
            switch(orientation) {
                case 0:
                    return "DBR";
                case 1:
                    return "BDR";
                case 2:
                    return "RDB";
            }

    }
}

function getCornerPandOFromLabel(label) {
    switch(label) {
        case "UFR":
            return [0, 0];
        case "FUR":
            return [0, 1];
        case "RUF":
            return [0, 2];
        case "UFL":
            return [1, 0];
        case "LUF":
            return [1, 1];
        case "FUL":
            return [1, 2];
        case "UBL":
            return [2, 0];
        case "BUL":
            return [2, 1];
        case "LUB":
            return [2, 2];
        case "UBR":
            return [3, 0];
        case "RUB":
            return [3, 1];
        case "BUR":
            return [3, 2];
        case "DFR":
            return [4, 0];
        case "RDF":
            return [4, 1];
        case "FDR":
            return [4, 2];
        case "DFL":
            return [5, 0];
        case "FDL":
            return [5, 1];
        case "LDF":
            return [5, 2];
        case "DBL":
            return [6, 0];
        case "LDB":
            return [6, 1];
        case "BDL":
            return [6, 2];
        case "DBR":
            return [7, 0];
        case "BDR":
            return [7, 1];
        case "RDB":
            return [7, 2];
    }
}

function getSpeffzLetterFromCornerLabel(label) {
    const letterScheme = "ABCDEFGHIJKLMNOPQRSTUVWX"

    switch(label) {
        case "UBL":
            return letterScheme[0];
        case "UBR":
            return letterScheme[1];
        case "UFR":
            return letterScheme[2];
        case "UFL":
            return letterScheme[3];
        case "LUB":
            return letterScheme[4];
        case "LUF":
            return letterScheme[5];
        case "LDF":
            return letterScheme[6];
        case "LDB":
            return letterScheme[7];
        case "FUL":
            return letterScheme[8];
        case "FUR":
            return letterScheme[9];
        case "FDR":
            return letterScheme[10];
        case "FDL":
            return letterScheme[11];
        case "RUF":
            return letterScheme[12];
        case "RUB":
            return letterScheme[13];
        case "RDB":
            return letterScheme[14];
        case "RDF":
            return letterScheme[15];
        case "BUR":
            return letterScheme[16];
        case "BUL":
            return letterScheme[17];
        case "BDL":
            return letterScheme[18];
        case "BDR":
            return letterScheme[19];
        case "DFL":
            return letterScheme[20];
        case "DFR":
            return letterScheme[21];
        case "DBR":
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
    cornerMemoToString,
}
