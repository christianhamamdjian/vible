const pathModel = (id, activeBoardId) => {
    return ({
        id: id,
        board: activeBoardId,
        group: "noGroup",
        color: targetPath.color,
        line: +targetPath.line,
        opacity: targetPath.opacity,
        path: newPaths[1],
        closed: targetPath.closed,
        dashed: targetPath.dashed,
        arrowStart: targetPath.arrowStart,
        arrowEnd: targetPath.arrowEnd
    })
}

export default pathModel