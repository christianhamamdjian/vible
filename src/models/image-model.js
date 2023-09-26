const imageModel = (id, activeBoardId, src) => {
    return ({
        type: "image",
        id: id,
        board: activeBoardId,
        src: src,
        x: 100,
        y: 100,
        width: 100,
        angle: 0,
        height: "auto",
        opacity: 1,
        angle: 0,
        cropHeight: 0,
        cropWidth: 0,
        roundCorners: 0,
    })
}

export default imageModel