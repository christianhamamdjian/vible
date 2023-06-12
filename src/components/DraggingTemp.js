// Dragging
const handleMouseDown = (event, element) => {
    if (!isDrawing && !isErasing && element && element.type === "path") {
        setDraggingPath(true);
        let svg = event.target
        let CTM = svg.getScreenCTM();
        const offsetPathX = (event.clientX || event.touches[0].clientX) - (CTM.e / CTM.a) / 2;
        const offsetPathY = (event.clientY || event.touches[0].clientY) - (CTM.f / CTM.d) / 2;
        if (element.angle > 0) {
            setDragOffsetPath({ x: element.x, y: element.y });
        } else {
            setDragOffsetPath({ x: parseInt(offsetPathX), y: parseInt(offsetPathY) });
        }
        setSelectedPath(element)
    }
};

// Moving
const handleMouseMove = (event) => {
    if (selectedPath && !selectedItem) {
        if (!draggingPath) return;
        let offsetPath = { x: dragOffsetPath.x, y: dragOffsetPath.y }
        const newPathX = (event.clientX || event.touches[0].clientX) - offsetPath.x;
        const newPathY = (event.clientY || event.touches[0].clientY) - offsetPath.y;
        setNewPathPosition({ x: newPathX, y: newPathY })
        setPaths((prevPaths) =>
            prevPaths.map((path) => {
                return (path.id === selectedPath.id) ? { ...path, x: newPathX, y: newPathY } : path
            })
        );
    }
};

// Mouse Up
const handleMouseUp = (event) => {
    event.stopPropagation();
    if (isDrawing) {
        const dimensions = event.target.lastChild.getBBox()
        setPaths((prevPaths) => [...prevPaths, {
            id: Date.now(),
            type: "path",
            path: currentPath,
            color, line,
            angle: 0,
            x: 0,
            y: 0,
            width: dimensions.width,
            height: dimensions.height
        }]);
    }
    if (selectedPath && !selectedItem) {
        setPaths((prevPaths) =>
            prevPaths.map((path) => {
                return (path.id === selectedPath.id) ? { ...path, x: newPathPosition.x, y: newPathPosition.y } : path
            })
        );
    }
    setFreezeScreen(false)
    setSelectedItem(null)
    setSelectedPath(null)
    setDraggingItem(false);
    setDraggingPath(false);
    setDragOffsetItem({ x: 0, y: 0 });
    setDragOffsetPath({ x: 0, y: 0 });
    setCurrentPath('');
    setNewPathPosition(null)
};

const getDrawingCenter = (path) => {
    if (!path) return
    const pathBBox = path.getBBox();
    const centerX = pathBBox.x + pathBBox.width / 2;
    const centerY = pathBBox.y + pathBBox.height / 2;
    return { x: centerX, y: centerY };
};