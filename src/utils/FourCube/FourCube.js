const FourCube = () => {

    //corner orientation
    let co = [0, 0, 0, 0, 0, 0, 0, 0];
    //corner permutation
    let cp = [0, 1, 2, 3, 4, 5, 6, 7];

    //center permutation
    let cep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]; 
    
    //edge permutation
    let ep = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]; 

    const fourCycle = (array, index1, index2, index3, index4) => {
        const newArray = array;

        if(Math.min(index1, index2, index3, index4) > array.length) {
            console.log("array index too large! " + Math.min(index1, index2, index3, index4));
            return;
        }

        const temp = array[index4];
        newArray[index4] = newArray[index3];
        newArray[index3] = newArray[index2];
        newArray[index2] = newArray[index1];
        newArray[index1] = temp;

        return newArray;
    }

    //proper modulo function for use with negative numbers. mod(-1, 3) = 2
    function mod(n, m) {
        return ((n % m) + m) % m;
    }

    //change the corner orientation when performing left, right, front, or back moves
    const cornerOrientChange = (array, index1, index2, index3, index4) => {
        const newArray = array;
        
        newArray[index1] = mod((newArray[index1] + 1), 3);
        newArray[index2] = mod((newArray[index2] - 1), 3);
        newArray[index3] = mod((newArray[index3] + 1), 3);
        newArray[index4] = mod((newArray[index4] - 1), 3);

        return newArray;
    }

    const moveU = (turns) => {
        for(let i = 0; i < turns; i++) {
            cp = fourCycle(cp, 0, 1, 2, 3);
            co = fourCycle(co, 0, 1, 2, 3);
            cep = fourCycle(cep, 0, 1, 2, 3);
            ep = fourCycle(ep, 0, 1, 2, 3);
            ep = fourCycle(ep, 12, 8, 4, 16);
        }
    }

    const moveD = (turns) => {
        for(let i = 0; i < turns; i++) {
            cp = fourCycle(cp, 4, 5, 6, 7);
            co = fourCycle(co, 4, 5, 6, 7);
            cep = fourCycle(cep, 20, 21, 22, 23);
            ep = fourCycle(ep, 20, 21, 22, 23);
            ep = fourCycle(ep, 10, 14, 18, 6);
        }
    }

    const moveL = (turns) => {
        for(let i = 0; i < turns; i++) {
            cp = fourCycle(cp, 0, 3, 4, 7);
            co = cornerOrientChange(co, 0, 3, 4, 7);
            co = fourCycle(co, 0, 3, 4, 7);
            cep = fourCycle(cep, 4, 5, 6, 7);
            ep = fourCycle(ep, 4, 5, 6, 7);
            ep = fourCycle(ep, 3, 11, 23, 17);
        }
    }

    const moveR = (turns) => {
        for(let i = 0; i < turns; i++) {
            cp = fourCycle(cp, 2, 1, 6, 5);
            co = cornerOrientChange(co, 2, 1, 6, 5);
            co = fourCycle(co, 2, 1, 6, 5);
            cep = fourCycle(cep, 12, 13, 14, 15);
            ep = fourCycle(ep, 12, 13, 14, 15);
            ep = fourCycle(ep, 1, 19, 21, 9);
        }
    }

    const moveF = (turns) => {
        for(let i = 0; i < turns; i++) {
            cp = fourCycle(cp, 3, 2, 5, 4);
            co = cornerOrientChange(co, 3, 2, 5, 4);
            co = fourCycle(co, 3, 2, 5, 4);
            cep = fourCycle(cep, 8, 9, 10, 11);
            ep = fourCycle(ep, 8, 9, 10, 11);
            ep = fourCycle(ep, 2, 15, 20, 5);
        }
    }

    const moveB = (turns) => {
        for(let i = 0; i < turns; i++) {
            cp = fourCycle(cp, 1, 0, 7, 6);
            co = cornerOrientChange(co, 1, 0, 7, 6);
            co = fourCycle(co, 1, 0, 7, 6);
            cep = fourCycle(cep, 16, 17, 18, 19);
            ep = fourCycle(ep, 16, 17, 18, 19);
            ep = fourCycle(ep, 0, 7, 22, 13);
        }
    }

    const moveUSlice = (turns) => {
        for(let i = 0; i < turns; i++) {
            cep = fourCycle(cep, 9, 5, 17, 13);
            cep = fourCycle(cep, 8, 4, 16, 12);
            ep = fourCycle(ep, 15, 11, 7, 19);
        }
    }

    const moveDSlice = (turns) => {
        for(let i = 0; i < turns; i++) {
            cep = fourCycle(cep, 10, 14, 18, 6);
            cep = fourCycle(cep, 11, 15, 19, 7);
            ep = fourCycle(ep, 9, 13, 17, 5);
        }
    }

    const moveLSlice = (turns) => {
        for(let i = 0; i < turns; i++) {
            cep = fourCycle(cep, 11, 23, 17, 3);
            cep = fourCycle(cep, 8, 20, 18, 0);
            ep = fourCycle(ep, 10, 22, 16, 2);
        }
    }

    const moveRSlice = (turns) => {
        for(let i = 0; i < turns; i++) {
            cep = fourCycle(cep, 10, 2, 16, 22);
            cep = fourCycle(cep, 9, 1, 19, 21);
            ep = fourCycle(ep, 20, 8, 0, 18);
        }
    }

    const moveFSlice = (turns) => {
        for(let i = 0; i < turns; i++) {
            cep = fourCycle(cep, 15, 20, 5, 2);
            cep = fourCycle(cep, 12, 21, 6, 3);
            ep = fourCycle(ep, 1, 14, 23, 4);
        }
    }

    const moveBSlice = (turns) => {
        for(let i = 0; i < turns; i++) {
            cep = fourCycle(cep, 14, 1, 4, 23);
            cep = fourCycle(cep, 13, 0, 7, 22);
            ep = fourCycle(ep, 21, 12, 3, 6);
        }
    }

    const moveUw = (turns) => {
        for(let i = 0; i < turns; i++) {
            moveU(1);
            moveUSlice(1);
        }
    }

    const moveDw = (turns) => {
        for(let i = 0; i < turns; i++) {
            moveD(1);
            moveDSlice(1);
        }
    }

    const moveLw = (turns) => {
        for(let i = 0; i < turns; i++) {
            moveL(1);
            moveLSlice(1);
        }
    }

    const moveRw = (turns) => {
        for(let i = 0; i < turns; i++) {
            moveR(1);
            moveRSlice(1);
        }
    }

    const moveFw = (turns) => {
        for(let i = 0; i < turns; i++) {
            moveF(1);
            moveFSlice(1);
        }
    }

    const moveBw = (turns) => {
        for(let i = 0; i < turns; i++) {
            moveB(1);
            moveBSlice(1);
        }
    }

    let scrambleString = "";
    let solutionString = "";

    const applyMove = (moveName, amount) => {
        switch(moveName) {
            case "U":
                moveU(amount);
                break;
            case "D":
                moveD(amount);
                break;
            case "L":
                moveL(amount);
                break;
            case "R":
                moveR(amount);
                break;
            case "F":
                moveF(amount);
                break;
            case "B":
                moveB(amount);
                break;
            case "Uw":
                moveUw(amount);
                break;
            case "Dw":
                moveDw(amount);
                break;
            case "Lw":
                moveLw(amount);
                break;
            case "Rw":
                moveRw(amount);
                break;
            case "Fw":
                moveFw(amount);
                break;
            case "Bw":
                moveBw(amount);
                break;
            case "u":
                moveUSlice(amount);
                break;
            case "d":
                moveDSlice(amount);
                break;
            case "l":
                moveLSlice(amount);
                break;
            case "r":
                moveRSlice(amount);
                break;
            case "f":
                moveFSlice(amount);
                break;
            case "b":
                moveBSlice(amount);
                break;

        }

        const suffix = (() => {
            switch(amount) {
                case 1:
                    return "";
                case 2:
                    return "2";
                case 3:
                    return "\'";
            }
        })();

        const invertSuffix = (() => {
            switch(amount) {
                case 1:
                    return "\'";
                case 2:
                    return "2";
                case 3:
                    return "";
            }
        })();

        scrambleString = scrambleString + " " + moveName + suffix;
        solutionString = moveName + invertSuffix + " " + solutionString;
    }

    const getScrambleString = () => {
        return scrambleString;
    }

    const getSolutionString = () => {
        return solutionString;
    }

    const scramble = () => {
        const ITERATIONS = 10;

        //Moves in the same group should not be done consecutively. This avoids scrambles having move combinations like Rw Lw' (equivalent to x rotation)
        //This is not perfect as it also avoids the Rw Lw combination which ideally should be allowed.
        //A random group will be selected then a random item from the group. Groups will not be selected twice in a row.
        const moveNameGroups = [["U"], ["D"], ["L"], ["R"], ["F"], ["B"], ["Uw", "Dw"], ["Lw", "Rw"], ["Fw", "Bw"]]

        let lastMoveGroup = [];
        let randMoveGroup = [];
        for(let i = 0; i < ITERATIONS; i++) {
            while(randMoveGroup.toString() == lastMoveGroup.toString()) {
                const randGroupIndex = Math.floor(Math.random() * moveNameGroups.length);
                randMoveGroup = moveNameGroups[randGroupIndex];
            }

            const randMoveIndex = Math.floor(Math.random() * randMoveGroup.length);
            const randAmout = Math.floor(Math.random() * 3) + 1;

            applyMove(randMoveGroup[randMoveIndex], randAmout);

            lastMoveGroup = randMoveGroup;
        }
    }

    const getCenterColor = (centerPerm) => {
        if(centerPerm < 4) {
            return "U";
        } else if(centerPerm < 8) {
            return "L";
        } else if(centerPerm < 12) {
            return "F";
        } else if(centerPerm < 16) {
            return "R";
        } else if(centerPerm < 20) {
            return "B";
        } else if (centerPerm < 24) {
            return "D"
        } else {
            console.log("color: invalid center permutation!");
            return "Z";
        }
    }

    const getEdgeColor = (edgePerm, primary) => {
        switch(edgePerm) {
            case 0:
                return (primary ? "U" : "B");
            case 1:
                return (primary ? "U" : "R");
            case 2:
                return (primary ? "U" : "F");
            case 3:
                return (primary ? "U" : "L");
            case 4:
                return (primary ? "L" : "U");
            case 5:
                return (primary ? "L" : "F");
            case 6:
                return (primary ? "L" : "D");
            case 7:
                return (primary ? "L" : "B");
            case 8:
                return (primary ? "F" : "U");
            case 9:
                return (primary ? "F" : "R");
            case 10:
                return (primary ? "F" : "D");
            case 11:
                return (primary ? "F" : "L");
            case 12:
                return (primary ? "R" : "U");
            case 13:
                return (primary ? "R" : "B");
            case 14:
                return (primary ? "R" : "D");
            case 15:
                return (primary ? "R" : "F");
            case 16:
                return (primary ? "B" : "U");
            case 17:
                return (primary ? "B" : "L");
            case 18:
                return (primary ? "B" : "D");
            case 19:
                return (primary ? "B" : "R");
            case 20:
                return (primary ? "D" : "F");
            case 21:
                return (primary ? "D" : "R");
            case 22:
                return (primary ? "D" : "B");
            case 23:
                return (primary ? "D" : "L");
        }
    }

    //order: 1 = primary, 2 = secondary, 3 = tertiary
    const getCornerColor = (cPerm, cOrient, order) => {
        const relativeOrient = mod(cOrient - (order - 1), 3);
        switch(cPerm) {
            case 0:
                switch(relativeOrient) {
                    case 0:
                        return "U";
                    case 1:
                        return "B";
                    case 2:
                        return "L";
                }
            case 1:
                switch(relativeOrient) {
                    case 0:
                        return "U";
                    case 1:
                        return "R";
                    case 2:
                        return "B";
                }
            case 2:
                switch(relativeOrient) {
                    case 0:
                        return "U";
                    case 1:
                        return "F";
                    case 2:
                        return "R";
                }
            case 3:
                switch(relativeOrient) {
                    case 0:
                        return "U";
                    case 1:
                        return "L";
                    case 2:
                        return "F";
                }
            case 4:
                switch(relativeOrient) {
                    case 0:
                        return "D";
                    case 1:
                        return "F";
                    case 2:
                        return "L";
                }
            case 5:
                switch(relativeOrient) {
                    case 0:
                        return "D";
                    case 1:
                        return "R";
                    case 2:
                        return "F";
                }
            case 6:
                switch(relativeOrient) {
                    case 0:
                        return "D";
                    case 1:
                        return "B";
                    case 2:
                        return "R";
                }
            case 7:
                switch(relativeOrient) {
                    case 0:
                        return "D";
                    case 1:
                        return "L";
                    case 2:
                        return "B";
                }
        }
    }

    const toString = () => {
        const NUM_STICKERS = 16*6;
        let resultArray = [];

        //start array no colors set. unset indicated with an "X"
        for(let i = 0; i < NUM_STICKERS; i++) {
            resultArray.push("X");
        }

        //set center colors
        const centerOffsets = [5, 6, 10, 9];
        for(let i = 0; i < cep.length; i++) {
            const cornerIndex = 4 * (i - (i % 4)) + centerOffsets[i % 4];
            resultArray[cornerIndex] = getCenterColor(cep[i]);
        }

        //set edge colors
        //primary edge indexes can be broken into a nice formula like centers
        //seems to be easier to map secondary edge indexes manually
        const primaryEdgeOffsets = [2, 11, 13, 4];
        const secondaryEdgeIndexes = [
            65, 49, 33, 17, //0-3
            8, 40, 88, 71, //4-7
            14, 56, 81, 23, //8-11
            7, 72, 87, 39, //12-15
            1, 24, 94, 55, //16-19
            46, 62, 78, 30, //20-23
        ];
        for(let i = 0; i < ep.length; i++) {
            const primaryEdgeIndex = 4 * (i - (i % 4)) + primaryEdgeOffsets[i % 4];
            const secondaryEdgeIndex = secondaryEdgeIndexes[i];
            resultArray[primaryEdgeIndex] = getEdgeColor(ep[i], true);
            resultArray[secondaryEdgeIndex] = getEdgeColor(ep[i], false)
        }

        //set corner colors
        //easier to map manually
        const primaryCornerIndexes = [0, 3, 15, 12, 80, 83, 95, 92];
        const secondaryCornerIndexes = [16, 64, 48, 32, 31, 47, 63, 79];
        const tertiaryCornerIndexes = [67, 51, 35, 19, 44, 60, 76, 28];
        for(let i = 0; i < cp.length; i++) {
            const primaryCornerIndex = primaryCornerIndexes[i];
            const secondaryCornerIndex = secondaryCornerIndexes[i];
            const tertiaryCornerIndex = tertiaryCornerIndexes[i];
            resultArray[primaryCornerIndex] = getCornerColor(cp[i], co[i], 1);
            resultArray[secondaryCornerIndex] = getCornerColor(cp[i], co[i], 2);
            resultArray[tertiaryCornerIndex] = getCornerColor(cp[i], co[i], 3);
        }

        let resultString = "";

        for(const sticker of resultArray) {
            resultString += sticker;
        }

        return resultString;
    }

    const fourCube = {
        co: co,
        cp: cp,
        cep: cep,
        ep: ep,
        applyMove: applyMove,
        getSolutionString: getSolutionString,
        getScrambleString, getScrambleString,
        scramble: scramble,
        toString: toString,
    }

    return fourCube;
    
}

export default FourCube;
