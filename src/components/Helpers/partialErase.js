const calculateDistance = (point1, point2) => {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
}
export const partialErase = (clickedPoint, pathPoints) => {
    // let closestPoint = null;
    let closestIndex = 0;
    let closestDistance = Number.MAX_VALUE;

    for (const [i, pathPoint] of pathPoints.entries()) {
        const distance = calculateDistance(clickedPoint, pathPoint);

        if (distance < closestDistance) {
            closestDistance = distance;
            // closestPoint = pathPoint;
            closestIndex = i;
        }
    }
    const p1 = pathPoints.slice(0, closestIndex);
    const p2 = pathPoints.slice(closestIndex);
    return ([p1, p2]);
}