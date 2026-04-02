import { useState, useEffect } from 'react';
import './EdgePreview.css';

import { getEdgeLabelFromPandO, getSpeffzLetterFromEdgeLabel } from '@/utils/edgePieceUtils.js';
import { getColorFromSticker } from '@/utils/colorUtils.js';

function EdgePreview({tracingState, revealState}) {
    const [edgeLabel, setEdgeLabel] = useState(getEdgeLabelFromPandO(0,0));

    const display = (tracingState == "edge") ? "grid" : "none";
    const letterDisplay = (revealState == "revealed") ? "block" : "none";

    useEffect(() => {
        if(revealState == "hidden") {
            const randPerm = Math.floor(Math.random() * 8);
            const randOrient = Math.floor(Math.random() * 3);
            setEdgeLabel(getEdgeLabelFromPandO(randPerm, randOrient));
        }
    }, [revealState]);

    const edgeSpeffzLabel = getSpeffzLetterFromEdgeLabel(edgeLabel);

    const edgeTargetColor = getColorFromSticker(edgeLabel[0]);
    const edgeSecondColor = getColorFromSticker(edgeLabel[1]);

    return (
        <>
            <div id="edge-preview" style={{display: display}}>
                <div id="edge-second-sticker" style={{backgroundColor: edgeSecondColor}}></div>
                <div id="edge-target-sticker" style={{backgroundColor: edgeTargetColor}}>
                    <h1 id="edge-letter-label" style={{display: letterDisplay}}>{edgeSpeffzLabel}</h1> 
                </div>
            </div>
        </>
    );
}

export default EdgePreview;
