const renderPath = (points) => {
    if (points.length < 2) return null

    let pathData = `M ${points[0].x} ${points[0].y}`

    for (let i = 1; i < points.length - 1; i++) {
        const x = (points[i].x + points[i + 1].x) / 2
        const y = (points[i].y + points[i + 1].y) / 2
        pathData += ` Q ${points[i].x} ${points[i].y}, ${x} ${y}`
    }

    pathData += ` T ${points[points.length - 1].x} ${points[points.length - 1].y}`

    return pathData
}

export default renderPath
