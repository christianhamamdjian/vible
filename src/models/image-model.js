const imageModel = (id, activeBoardId, src) => {
    return ({
        type: "image",
        id: id,
        board: activeBoardId,
        src: src,
        x: 250,
        y: 300,
        width: 100,
        angle: 0,
        height: "auto",
        opacity: 1,
        angle: 0,
        cropTop: 0,
        cropRight: 0,
        cropBottom: 0,
        cropLeft: 0,
        roundCorners: 0,
    })
}

export default imageModel