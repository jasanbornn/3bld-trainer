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

export { getColorFromSticker };
