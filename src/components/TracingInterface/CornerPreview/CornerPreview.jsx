import { useEffect, useState } from 'react';
import './CornerPreview.css';

import { getCornerLabelFromPandO, getSpeffzLetterFromCornerLabel } from '@/utils/cornerPieceUtils.js';
import { getColorFromSticker } from '@/utils/colorUtils.js';

function CornerPreview({tracingState, revealState}) {
    const [cornerLabel, setCornerLabel] = useState(getCornerLabelFromPandO(0,0));

    const display = (tracingState == "corner") ? "grid" : "none";
    const letterDisplay = (revealState == "revealed") ? "block" : "none";

    useEffect(() => {
        if(revealState == "hidden") {
            const randPerm = Math.floor(Math.random() * 8);
            const randOrient = Math.floor(Math.random() * 3);
            setCornerLabel(getCornerLabelFromPandO(randPerm, randOrient));
        }
    }, [revealState]);


    const cornerSpeffzLabel = getSpeffzLetterFromCornerLabel(cornerLabel);

    const cornerTargetColor = getColorFromSticker(cornerLabel[0]);
    const cornerSecondColor = getColorFromSticker(cornerLabel[1]);
    const cornerThirdColor = getColorFromSticker(cornerLabel[2]);

    return (
        <>
            <div id="corner-preview" style={{display: display}}>
                <div id="corner-target-sticker" style={{backgroundColor: cornerTargetColor}}>
                    <h1 id="corner-letter-label" style={{display: letterDisplay}}>{cornerSpeffzLabel}</h1>
                </div>
                <div id="corner-second-sticker" style={{backgroundColor: cornerSecondColor}}></div>
                <div id="corner-third-sticker" style={{backgroundColor: cornerThirdColor}}></div>
            </div>
        </>
    );
}

export default CornerPreview;
