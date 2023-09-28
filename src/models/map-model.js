const mapModel = (id, activeBoardId, coordinates) => {
    return ({
        type: "mapUrl",
        id: id,
        board: activeBoardId,
        mapUrl: coordinates,
        x: 250,
        y: 300,
        angle: 0,
        width: 300,
        height: 250,
    })
}

export default mapModel