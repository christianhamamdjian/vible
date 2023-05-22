import React, { useState, useRef } from 'react';

const FullBoard = () => {
    // Drawing Board
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const [paths, setPaths] = useState([]);
    const [erasing, setErasing] = useState(false);
    const [color, setColor] = useState('#aabbcc');
    const svgRef = useRef(null);

    // Items
    const [items, setItems] = useState([]);
    const [itemText, setItemText] = useState('Text');
    const [itemColor, setItemColor] = useState('#aabbcc');
    const [selectedItem, setSelectedItem] = useState(null)
    const [editing, setEditing] = useState(null)
    const [draggingItem, setDraggingItem] = useState(false);
    const [dragOffsetItem, setDragOffsetItem] = useState({ x: 0, y: 0 });

    const handleAddBox = (event) => {
        event.preventDefault();
        const itemId = Date.now();
        const newX = event.clientX - event.currentTarget.getBoundingClientRect().left;
        const newY = event.clientY - event.currentTarget.getBoundingClientRect().top;
        const newBox = { id: itemId, x: newX, y: newY, text: itemText, color: itemColor, type: "box" };
        setItems([...items, newBox]);
        setItemText('Text');
        setItemColor('#aabbcc');
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const newImage = {
                id: Date.now(),
                src: e.target.result,
                x: 0,
                y: 0,
                type: "image"
            };
            setItems((prevImages) => [...prevImages, newImage]);
        };
        reader.readAsDataURL(file);
    };

    const handleMouseDown = (event, itemId) => {
        {/* Items */ }
        if (itemId) {
            setDraggingItem(true);

            const offsetItemX = event.clientX - event.currentTarget.getBoundingClientRect().left;
            const offsetItemY = event.clientY - event.currentTarget.getBoundingClientRect().top;

            const selectedItem = items.find(item => item.id === itemId)

            setSelectedItem(selectedItem)

            setDragOffsetItem({ x: offsetItemX, y: offsetItemY });
        }

        {/* Drawing */ }
        if (!itemId) {
            setIsDrawing(true);
            const { x, y } = getCursorPositionDrawing(event);
            setCurrentPath(`M${x} ${y}`);
        }

    };

    const handleMouseMove = (event) => {

        {/* Items */ }
        if (selectedItem) {
            event.preventDefault();
            if (!draggingItem) return;
            const newItemX = event.clientX - event.currentTarget.getBoundingClientRect().left - dragOffsetItem.x;
            const newItemY = event.clientY - event.currentTarget.getBoundingClientRect().top - dragOffsetItem.y;

            setItems((prevItems) =>
                prevItems.map((item) => {
                    return item.id === selectedItem.id ? { ...item, x: newItemX, y: newItemY } : item
                })
            );
        }

        {/* Drawing */ }
        if (!isDrawing) return;
        if (isDrawing && !erasing && !selectedItem) {
            const { x, y } = getCursorPositionDrawing(event);
            setCurrentPath((prevPath) => `${prevPath} L${x} ${y}`);
        }
    };

    const handleMouseUp = () => {

        {/* Items */ }
        setSelectedItem(null)
        setDraggingItem(false);
        setDragOffsetItem({ x: 0, y: 0 });

        {/* Drawing */ }
        setIsDrawing(false);
        setPaths((prevPaths) => [...prevPaths, { path: currentPath, color }]);
        setCurrentPath('');
    };

    const handleDeleteItem = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setEditing(null)
    };

    {/* Text box create methods */ }
    const handleItemText = (event) => {
        setItemText(event.target.value);
    };
    const handleItemColor = (event) => {
        setItemColor(event.target.value);
    };

    const handleEditBox = (id) => {
        setEditing({ status: true, id: id })
    }
    const handleStopEditBox = () => {
        setEditing(null)
    }

    {/* Edit text box */ }
    const handleItemTextChange = (event, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, text: event.target.value };
                }
                return item;
            })
        );
    };

    const handleItemColorChange = (event, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, color: event.target.value };
                }
                return item;
            })
        );
    };

    {/* Draw */ }
    const getCursorPositionDrawing = (event) => {
        const { left, top } = svgRef.current.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        return { x, y };
    };
    const handleEraser = () => {
        setErasing(erasing => !erasing);
        setIsDrawing(isDrawing => !isDrawing)
    }
    const handleDeletePath = (erased) => {
        setPaths((prevPaths) => prevPaths.filter((path) => path.path !== erased.path));
    }
    const handleDownload = () => {
        const svgBlob = new Blob([svgRef.current.outerHTML], { type: 'image/svg+xml' });
        const svgURL = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgURL;
        downloadLink.download = 'drawing.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgURL);
    };

    return (
        <div>
            <svg
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                ref={svgRef}
                style={{ width: '800px', height: '600px', border: '1px solid black' }}
                cursor={isDrawing ? "crosshair" : "move"}
            >
                {items.map(item => (
                    <g
                        key={item.id}
                        draggable="true"
                        transform={`translate(${item.x},${item.y})`}
                    >

                        {/* Boxes */}
                        {item.type === "box" && (
                            <>
                                <rect
                                    width="200"
                                    height="50"
                                    fill={item.color}
                                    stroke="blue"
                                    strokeWidth="1"
                                    rx="5"
                                    ry="5"
                                    style={{ cursor: 'move' }}
                                    onMouseDown={(e) => handleMouseDown(e, item.id)}
                                    onMouseUp={handleMouseUp}
                                />
                                <text
                                    x="60"
                                    y="25"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    style={{ pointerEvents: 'none' }}
                                >
                                    {item.text}
                                </text>
                                <text
                                    x="5"
                                    y="15"
                                    fill="white"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleDeleteItem(item.id)}>
                                    &times;
                                </text>
                                <circle
                                    cx="195"
                                    cy="5"
                                    r="8"
                                    fill="red"
                                    stroke="white"
                                    strokeWidth="2"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => handleEditBox(item.id)}
                                />
                                {editing && editing.id === item.id && <circle
                                    cx="95"
                                    cy="5"
                                    r="8"
                                    fill="green"
                                    stroke="white"
                                    strokeWidth="2"
                                    style={{ cursor: 'pointer' }}
                                    onClick={handleStopEditBox}
                                />}
                            </>
                        )}

                        {/* Images */}
                        {item.type === "image" &&
                            (
                                <>
                                    <rect
                                        width="120"
                                        height="120"
                                        style={{ border: '1px solid black', cursor: 'move' }}
                                    />

                                    <image href={item.src}
                                        width="100"
                                        height="100"
                                        onMouseDown={e => {
                                            handleMouseDown(e, item.id)
                                        }}
                                        style={{ cursor: 'move' }} />
                                    <text
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDeleteItem(item.id)}>
                                        X
                                    </text>
                                </>
                            )
                        }
                    </g>
                ))}

                {/* Drawing */}
                {paths.map((path, index) => (
                    <path
                        key={index}
                        d={path.path}
                        stroke={path.color}
                        fill="none"
                        strokeWidth="4"
                        onMouseDown={erasing ? (() => handleDeletePath(path)) : null}
                        cursor={erasing && "grab"}
                    />
                ))}
                {currentPath && (
                    <path
                        d={currentPath}
                        stroke={color}
                        fill="none"
                        strokeWidth="2"
                    />
                )}

            </svg>

            {/* Boxes form */}
            <form onSubmit={handleAddBox}>
                <label>
                    Text:
                    <input type="text" value={itemText} onChange={handleItemText} />
                </label>
                <label>
                    Color:
                    <input type="color" name="color" value={itemColor} onChange={handleItemColor} />
                </label>
                <button type="submit">Add Box</button>
            </form>
            {items.length > 0 && editing && (

                <div style={{
                    display: "flex",
                    flexDirection: "column"
                }}
                >
                    <label>
                        Change text:
                        <input
                            type="text"
                            value={items.find(item => item.id === editing.id).text}
                            onChange={(event) =>
                                handleItemTextChange(event, editing.id)
                            }
                        />
                    </label>
                    <label>
                        Change color:
                        <input
                            type="color"
                            name="color"
                            value={items.find(item => item.id === editing.id).color}
                            onChange={(event) =>
                                handleItemColorChange(event, editing.id)
                            } />
                    </label>
                </div>

            )
            }

            {/* Images form */}
            <input type="file" accept="image/*" onChange={handleImageUpload} />

            {/* Drawing form */}
            <div>
                <input type="color" value={color} onChange={(event) => setColor(event.target.value)} />
                <button style={erasing ? { backgroundColor: "#aabbcc" } : null} onClick={handleEraser}>Delete lines</button>
                <button onClick={handleDownload}>Download SVG</button>
            </div>

        </div >
    )
}

export default FullBoard
