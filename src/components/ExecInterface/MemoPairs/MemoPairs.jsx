import './MemoPairs.css';

import EdgeMemoPairs from './EdgeMemoPairs/EdgeMemoPairs.jsx'
import CornerMemoPairs from './CornerMemoPairs/CornerMemoPairs.jsx'


function MemoPairs({cubeState, cornerBufferLabel, edgeBufferLabel, cornerPairs, cornerHintsEnabled}) {
    return (
        <>
            <EdgeMemoPairs cubeState={cubeState} edgeBufferLabel={edgeBufferLabel}/>
            <CornerMemoPairs cubeState={cubeState} cornerBufferLabel={cornerBufferLabel} cornerPairs={cornerPairs} cornerHintsEnabled={cornerHintsEnabled}/>
        </>
    );
}

export default MemoPairs;
