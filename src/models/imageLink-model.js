const imageLinkModel = (id, activeBoardId, url) => {
    return ({
        type: "imageUrl",
        id: id,
        board: activeBoardId,
        imageUrl: url,
        x: 250,
        y: 300,
        width: 100,
        height: "auto",
        angle: 0,
        opacity: 1,
        cropTop: 0,
        cropRight: 0,
        cropBottom: 0,
        cropLeft: 0,
        roundCorners: 0,
    })
}

export default imageLinkModel