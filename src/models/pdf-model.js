const pdfModel = (id, activeBoardId) => {
    return ({
        type: "pdf",
        id: id,
        board: activeBoardId,
        x: 250,
        y: 300,
        angle: 0,
        width: "100",
        height: "160",
    })
}

export default pdfModel