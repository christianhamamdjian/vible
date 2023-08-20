function calculateDistance(coord1, coord2) {
    const dx = coord1.x - coord2.x;
    const dy = coord1.y - coord2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function partialErase(target, coordinatesArray) {
    let closestIndex = 0;
    let closestDistance = calculateDistance(target, coordinatesArray[0]);

    for (let i = 1; i < coordinatesArray.length; i++) {
        const distance = calculateDistance(target, coordinatesArray[i]);
        if (distance < closestDistance) {
            closestIndex = i;
        }
    }
    const p1 = coordinatesArray.slice(0, closestIndex);
    const p2 = coordinatesArray.slice(closestIndex);
    console.log(p1, p2)
    return closestIndex;
}

export default partialErase