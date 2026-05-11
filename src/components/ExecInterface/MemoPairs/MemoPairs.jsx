import './MemoPairs.css';

import EdgeMemoPairs from './EdgeMemoPairs/EdgeMemoPairs.jsx'
import CornerMemoPairs from './CornerMemoPairs/CornerMemoPairs.jsx'

//import FourCenterMemoPairs from './FourCube/FourCenterMemoPairs/FourCenterMemoPairs.jsx';
//import FourEdgeMemoPairs from './FourCube/FourEdgeMemoPairs/FourEdgeMemoPairs.jsx';
import FourCornerMemoPairs from './FourCube/FourCornerMemoPairs/FourCornerMemoPairs.jsx';

function MemoPairs({cubeType, cubeState, cornerBufferLabel, edgeBufferLabel}) {
    
    //const centerMemoPairs = (cubeType == 4) ? <FourCenterMemoPairs cubeState={cubeState}/> : null;
    //const edgeMemoPairs = (cubeType == 4) ? <FourEdgeMemoPairs cubeState={cubeState}/> : <EdgeMemoPairs cubeState={cubeState} edgeBufferLabel={edgeBufferLabel}/>;
    const cornerMemoPairs = (cubeType == 4) ?
        <FourCornerMemoPairs cubeState={cubeState} cornerBufferLabel={"URF"}/> 
        : <CornerMemoPairs cubeState={cubeState} cornerBufferLabel={cornerBufferLabel}/>;

    return (
        <>
            {cornerMemoPairs}
        </>
    );
}

export default MemoPairs;
