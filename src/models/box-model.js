const boxModel = (itemId, activeBoardId, itemText, itemColor, textColor, itemLink, itemUrl) => {
    return ({
        type: "box",
        id: itemId,
        board: activeBoardId,
        x: 250,
        y: 300,
        text: itemText,
        color: itemColor,
        textColor: textColor || "#ffffff",
        link: itemLink,
        url: itemUrl,
        width: 140,
        height: 140,
        angle: 0,
        font: "Roboto",
        fontStyle: false,
        fontSize: "10",
        rating: 0,
        showRating: "",
        showBorder: "",
        roundedCorners: "6",
        textAlignCenter: "",
        textAlignLeft: "",
        borderWidth: "",
        borderColor: "",
        backgroundOpacity: "1"
    })
}

export default boxModel