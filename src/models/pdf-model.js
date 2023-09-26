const pdfModel = (id, activeBoardId) => {
    return ({
        type: "pdf",
        id: id,
        board: activeBoardId,
        x: 100,
        y: 200,
        angle: 0,
        width: "100",
        height: "160",
    })
}

export default pdfModel