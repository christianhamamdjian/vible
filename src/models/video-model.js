const video = (id, activeBoardId, url) => {
    return ({
        id: id,
        board: activeBoardId,
        videoUrl: url,
        x: 100,
        y: 200,
        width: 300,
        height: 250,
        angle: 0,
        type: "video"
    })
}

export default video