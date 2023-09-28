const videoModel = (id, activeBoardId, url) => {
    return ({
        id: id,
        board: activeBoardId,
        videoUrl: url,
        x: 250,
        y: 300,
        width: 300,
        height: 250,
        angle: 0,
        type: "video"
    })
}

export default videoModel