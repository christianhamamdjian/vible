const smoothing = .2

const line = (pointA, pointB) => {
    const lengthX = pointB["x"] - pointA["x"]
    const lengthY = pointB["y"] - pointA["y"]
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    }
}

const controlPoint = (current, previous, next, reverse) => {
    const p = previous || current
    const n = next || current
    const o = line(p, n)
    const angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing
    const x = current["x"] + Math.cos(angle) * length
    const y = current["y"] + Math.sin(angle) * length
    return { x: x, y: y }
}

const bezierCommand = (point, i, a) => {
    const cps = controlPoint(a[i - 1], a[i - 2], point)
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true)
    return `C ${cps["x"]},${cps["y"]} ${cpe["x"]},${cpe["y"]} ${point["x"]},${point["y"]}`
}

const svgPath = (points, command = bezierCommand) => {
    const d = points.reduce((acc, point, i, a) => i === 0
        ? `M ${point["x"]},${point["y"]}`
        : `${acc} ${command(point, i, a)}`
        , '')
    return d
}

export default svgPath