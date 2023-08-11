export const loadPathsFromLocalStorage = () => {
    const savedPaths = localStorage.getItem('paths');
    const pathList = savedPaths && JSON.parse(savedPaths)
    const convertedPaths = pathList && pathList.map(path => {
        const singlePath = path["path"].map(d => convertFromSVGPath(d))
        return ({ ...path, group: "noGroup", path: singlePath[0] })
    })
    return convertedPaths
}

export const convertFromSVGPath = (d) => {
    const commands = d.split(/[A-Za-z]/).filter(Boolean);
    const points = [];

    commands.forEach((command) => {
        const values = command.trim().split(/[\s,]+/).filter(Boolean);

        for (let i = 0; i < values.length; i += 2) {
            const x = parseFloat(values[i]);
            const y = parseFloat(values[i + 1]);
            points.push({ x, y });
        }
    });
    return points;
}



export const getCenterPoint = (points) => {
    const bounds = points.reduce(
        (acc, point) => {
            acc.minX = Math.min(acc.minX, point.x);
            acc.maxX = Math.max(acc.maxX, point.x);
            acc.minY = Math.min(acc.minY, point.y);
            acc.maxY = Math.max(acc.maxY, point.y);
            return acc;
        },
        {
            minX: Number.POSITIVE_INFINITY,
            maxX: Number.NEGATIVE_INFINITY,
            minY: Number.POSITIVE_INFINITY,
            maxY: Number.NEGATIVE_INFINITY,
        }
    );

    return {
        x: (bounds.minX + bounds.maxX) / 2,
        y: (bounds.minY + bounds.maxY) / 2,
    };
};

export const rotatePath = (points, center, angle) => {
    const radians = (angle * Math.PI) / 180;
    return points.map((point) => {
        const translatedPoint = {
            x: point.x - center.x,
            y: point.y - center.y,
        };
        const rotatedPoint = {
            x: translatedPoint.x * Math.cos(radians) - translatedPoint.y * Math.sin(radians),
            y: translatedPoint.x * Math.sin(radians) + translatedPoint.y * Math.cos(radians),
        };
        return {
            x: rotatedPoint.x + center.x,
            y: rotatedPoint.y + center.y,
        };
    });
};

export const scalePath = (points, center, scale) => {
    return points.map((point) => {
        const scaledPoint = {
            x: center.x + (point.x - center.x) * scale,
            y: center.y + (point.y - center.y) * scale,
        };
        return scaledPoint;
    });
};