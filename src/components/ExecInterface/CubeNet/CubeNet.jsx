import './CubeNet.css';

import { getColorFromSticker } from '@/utils/colorUtils.js';

function ThreeCubeNetFace({stickers}) {
    return (
        <div id="cube-net-face">
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(0))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(1))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(2))}/>

            <CubeNetSticker color={getColorFromSticker(stickers.charAt(3))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(4))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(5))}/>

            <CubeNetSticker color={getColorFromSticker(stickers.charAt(6))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(7))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(8))}/>
        </div>
    );
}

function FourCubeNetFace({stickers}) {
    return (
        <div id="cube-net-face">
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(0))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(1))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(2))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(3))}/>

            <CubeNetSticker color={getColorFromSticker(stickers.charAt(4))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(5))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(6))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(7))}/>

            <CubeNetSticker color={getColorFromSticker(stickers.charAt(8))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(9))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(10))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(11))}/>

            <CubeNetSticker color={getColorFromSticker(stickers.charAt(12))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(13))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(14))}/>
            <CubeNetSticker color={getColorFromSticker(stickers.charAt(15))}/>
        </div>
    );
}

function CubeNetSticker({color}) {

    return (
        <div id="cube-net-sticker" style={{backgroundColor: color}}>

        </div>
    )
}

function CubeNetSpacer() {

    return (
        <div id="cube-net-spacer"></div>
    );
}

function CubeNet({cubeType, stickers}) {
    
    const upStickers = (cubeType == 3) ? stickers.substring(0,9) : stickers.substring(0,16);
    const leftStickers = (cubeType == 3) ? stickers.substring(27,36) : stickers.substring(16,32);
    const frontStickers = (cubeType == 3) ? stickers.substring(36,45) : stickers.substring(32,48);
    const rightStickers = (cubeType == 3) ? stickers.substring(9,18) : stickers.substring(48,64);
    const backStickers = (cubeType == 3) ? stickers.substring(18,27) : stickers.substring(64,80);
    const downStickers = (cubeType == 3) ? stickers.substring(45,54) : stickers.substring(80,96);

    const upFace = (cubeType == 3) ? <ThreeCubeNetFace stickers={upStickers}/> : <FourCubeNetFace stickers={upStickers}/>;
    const downFace = (cubeType == 3) ? <ThreeCubeNetFace stickers={downStickers}/> : <FourCubeNetFace stickers={downStickers}/>;
    const leftFace = (cubeType == 3) ? <ThreeCubeNetFace stickers={leftStickers}/> : <FourCubeNetFace stickers={leftStickers}/>;
    const rightFace = (cubeType == 3) ? <ThreeCubeNetFace stickers={rightStickers}/> : <FourCubeNetFace stickers={rightStickers}/>;
    const frontFace = (cubeType == 3) ? <ThreeCubeNetFace stickers={frontStickers}/> : <FourCubeNetFace stickers={frontStickers}/>;
    const backFace = (cubeType == 3) ? <ThreeCubeNetFace stickers={backStickers}/> : <FourCubeNetFace stickers={backStickers}/>;


    return (
        <div id="cube-net">
            <CubeNetSpacer/>
            {upFace}
            <CubeNetSpacer/>
            <CubeNetSpacer/>

            {leftFace}
            {frontFace}
            {rightFace}
            {backFace}

            <CubeNetSpacer/>
            {downFace}
            <CubeNetSpacer/>
            <CubeNetSpacer/>
        </div>
    );
}

export default CubeNet;
