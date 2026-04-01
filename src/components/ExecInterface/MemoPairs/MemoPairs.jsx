import './MemoPairs.css';

import EdgeMemoPairs from './EdgeMemoPairs/EdgeMemoPairs.jsx'
import CornerMemoPairs from './CornerMemoPairs/CornerMemoPairs.jsx'

function MemoPairs({cubeState}) {
    return (
        <>
            <EdgeMemoPairs cubeState={cubeState}/>
            <CornerMemoPairs cubeState={cubeState}/>
        </>
    );
}

export default MemoPairs;
