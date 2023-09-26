const pathModel = (id, activeBoardId, pathColor, pathLine, pathOpacity, pathArray, pathClosed, pathDashed, pathArrowStart, pathArrowEnd) => {
    return ({
        id: id,
        board: activeBoardId,
        group: "noGroup",
        color: pathColor,
        line: pathLine,
        opacity: pathOpacity,
        path: pathArray,
        closed: pathClosed,
        dashed: pathDashed,
        arrowStart: pathArrowStart,
        arrowEnd: pathArrowEnd
    })
}

export default pathModel