const FourCube = () => {
    //Centers
    //inner UpBackLeft, etc.
    //Speffz order
    //let iUBL, iUBR, iUFR, iUFL, iLUB, iLUF, iLDF, iLDB, iFUL, iFUR, iFDR, iFDL, iRUF, iRUB, iRDB, iRDF, iBUR, iBUL, iBDL, iBDR, iDFL, iDFR, iDBR, iDBL;

    //[iUBL, iUBR, iUFR, iUFL, iLUB, iLUF, iLDF, iLDB, iFUL, iFUR, iFDR, iFDL, iRUF, iRUB, iRDB, iRDF, iBUR, iBUL, iBDL, iBDR, iDFL, iDFR, iDBR, iDBL] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

    //Corner
    //UpBackLeft, etc.
    //Speffz order
    //let UBL, UBR, UFR, UFL, DFL, DFR, DBR, DBL;

    //[UBL, UBR, UFR, UFL, DFL, DFR, DBR, DBL] = [0, 1, 2, 3, 4, 5, 6, 7]

    //Edges
    //UpBack, etc.
    //Speffz order
    //let UB, UR, UF, UL, LU, LF, LD, LB, FU, FR, FD, FL, RU, RB, RD, RF, BU, BL, BD, BR, DF, DR, DB, DL;
    //[UB, UR, UF, UL, LU, LF, LD, LB, FU, FR, FD, FL, RU, RB, RD, RF, BU, BL, BD, BR, DF, DR, DB, DL] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

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
            cp = fourCycle(cp, 1, 0, 6, 7);
            co = cornerOrientChange(co, 1, 0, 6, 7);
            co = fourCycle(co, 1, 0, 6, 7);
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

    const fourCube = {
        co: co,
        cp: cp,
        cep: cep,
        ep: ep,
        moveU: moveU,
        moveD: moveD,
        moveL: moveL,
        moveR: moveR,
        moveF: moveF,
        moveB: moveB,
    }

    return fourCube;
    
}

export default FourCube;
