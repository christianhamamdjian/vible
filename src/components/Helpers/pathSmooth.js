const lineProperties = (pointA, pointB) => {
    const lengthX = pointB["x"] - pointA["x"]
    const lengthY = pointB["y"] - pointA["y"]
    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    }
}

const controlPointCalc = (current, previous, next, reverse) => {
    const c = current
    const p = previous ? previous : c
    const n = next ? next : c
    const smoothing = 0.01
    const o = lineProperties(p, n)
    const rev = reverse ? Math.PI : 0

    const x = c["x"] + Math.cos(o.angle + rev) * o.length * smoothing
    const y = c["y"] + Math.sin(o.angle + rev) * o.length * smoothing

    return { x, y }
}

const svgPath = points => {
    const d = points.reduce((acc, e, i, a) => {
        if (i > 0) {
            const cs = controlPointCalc(a[i - 1], a[i - 2], e)
            const ce = controlPointCalc(e, a[i - 1], a[i + 1], true)
            return `${acc} C ${cs["x"]},${cs["y"]} ${ce["x"]},${ce["y"]} ${e["x"]},${e["y"]}`
        } else {
            return `${acc} M ${e["x"]},${e["y"]}`
        }
    }, '')

    return d
}

export default svgPath




// Functional
// const smoothing = .1

// const line = (pointA, pointB) => {
//     const lengthX = pointB["x"] - pointA["x"]
//     const lengthY = pointB["y"] - pointA["y"]
//     return {
//         length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
//         angle: Math.atan2(lengthY, lengthX)
//     }
// }

// const controlPoint = (lineCalc, smooth) => (current, previous, next, reverse) => {
//     const p = previous || current
//     const n = next || current
//     const l = lineCalc(p, n)
//     const angle = l.angle + (reverse ? Math.PI : 0)
//     const length = l.length * smooth
//     const x = current["x"] + Math.cos(angle) * length
//     const y = current["y"] + Math.sin(angle) * length
//     return { x, y }
// }

// const bezierCommand = (controlPointCalc) => (point, i, a) => {
//     const cps = controlPointCalc(a[i - 1], a[i - 2], point)
//     const cpe = controlPointCalc(point, a[i - 1], a[i + 1], true)
//     return `C${cps["x"]},${cps["y"]} ${cpe["x"]},${cpe["y"]} ${point["x"]},${point["y"]}`
// }

// const svgPath = (points, command = bezierCommandCalc) => {
//     const d = points.reduce((acc, point, i, a) => i === 0
//         ? `M ${point["x"]},${point["y"]}`
//         : `${acc} ${command(point, i, a)}`
//         , '')
//     return d
// }
// const controlPointCalc = controlPoint(line, smoothing)
// const bezierCommandCalc = bezierCommand(controlPointCalc)

// export default svgPath

// Object oriented
// const smoothing = .1

// const line = (pointA, pointB) => {
//     const lengthX = pointB["x"] - pointA["x"]
//     const lengthY = pointB["y"] - pointA["y"]
//     return {
//         length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
//         angle: Math.atan2(lengthY, lengthX)
//     }
// }

// const controlPoint = (current, previous, next, reverse) => {
//     const p = previous || current
//     const n = next || current
//     const o = line(p, n)
//     const angle = o.angle + (reverse ? Math.PI : 0)
//     const length = o.length * smoothing
//     const x = current["x"] + Math.cos(angle) * length
//     const y = current["y"] + Math.sin(angle) * length
//     return { x, y }
// }

// const bezierCommand = (point, i, a) => {
//     const cps = controlPoint(a[i - 1], a[i - 2], point)
//     const cpe = controlPoint(point, a[i - 1], a[i + 1], true)
//     return `C${cps["x"]},${cps["y"]} ${cpe["x"]},${cpe["y"]} ${point["x"]},${point["y"]}`
// }

// const svgPath = (points, command = bezierCommand) => {
//     const d = points.reduce((acc, point, i, a) => i === 0
//         ? `M ${point["x"]},${point["y"]}`
//         : `${acc} ${command(point, i, a)}`
//         , '')
//     return d
// }

// export default svgPath


