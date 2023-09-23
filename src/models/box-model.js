const box = (itemId, activeBoardId, itemText, itemColor, itemLink, itemUrl) => {
    return {
        id: itemId,
        board: activeBoardId,
        x: 200,
        y: 200,
        text: itemText,
        color: itemColor,
        textColor: "#000000",
        link: itemLink,
        url: itemUrl,
        width: 140,
        height: 140,
        angle: 0,
        type: "box",
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
    }
}

export default box