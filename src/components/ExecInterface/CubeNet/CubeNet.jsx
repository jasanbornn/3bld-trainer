import './CubeNet.css';

function CubeNetFace({stickers}) {
    function getColorFromSticker(sticker) {
        switch(sticker) {
            case "U":
                return "white";
            case "D":
                return "yellow";
            case "L":
                return "orange";
            case "R":
                return "red";
            case "F":
                return "green";
            case "B":
                return "blue";
            default:
                return "pink";
        }
    }

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

function CubeNet({stickers}) {

    return (
        <div id="cube-net">
            <CubeNetSpacer/>
            <CubeNetFace stickers={stickers.substring(0,9)}/>
            <CubeNetSpacer/>
            <CubeNetSpacer/>

            <CubeNetFace stickers={stickers.substring(36,45)}/>
            <CubeNetFace stickers={stickers.substring(18,27)}/>
            <CubeNetFace stickers={stickers.substring(9,18)}/>
            <CubeNetFace stickers={stickers.substring(45,54)}/>

            <CubeNetSpacer/>
            <CubeNetFace stickers={stickers.substring(27,36)}/>
            <CubeNetSpacer/>
            <CubeNetSpacer/>
        </div>
    );
}

export default CubeNet;
