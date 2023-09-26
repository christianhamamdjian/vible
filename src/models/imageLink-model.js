const imageLinkModel = (id, activeBoardId, url) => {
    return ({
        type: "imageUrl",
        id: id,
        board: activeBoardId,
        imageUrl: url,
        x: 100,
        y: 100,
        width: 100,
        height: "auto",
        angle: 0,
        opacity: 1,
        cropHeight: 0,
        cropWidth: 0,
        roundCorners: 0,
    })
}

export default imageLinkModel