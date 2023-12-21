const pdfModel = (id, activeBoardId) => {
    return ({
        type: "pdf",
        id: id,
        board: activeBoardId,
        x: 250,
        y: 300,
        angle: 0,
        width: "200",
        height: "260",
    })
}

export default pdfModel