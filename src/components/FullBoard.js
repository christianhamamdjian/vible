import React, { useState, useRef } from 'react';
import DragDropFile from "./DragDropUpload"

const FullBoard = () => {
    // Drawing Board
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const [paths, setPaths] = useState([]);
    const [erasing, setErasing] = useState(false);
    const [color, setColor] = useState('#aabbcc');
    const [line, setLine] = useState(2);
    const svgRef = useRef(null);

    // Items
    const [items, setItems] = useState([]);
    const [itemText, setItemText] = useState('Text');
    const [itemColor, setItemColor] = useState('#aabbcc');
    const [itemLink, setItemLink] = useState('');
    const [itemUrl, setItemUrl] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [editingText, setEditingText] = useState(null);
    const [editingImage, setEditingImage] = useState(null);
    const [draggingItem, setDraggingItem] = useState(false);
    const [dragOffsetItem, setDragOffsetItem] = useState({ x: 0, y: 0 });

    const handleAddBox = (event) => {
        event.preventDefault();
        const itemId = Date.now();
        const newBox = { id: itemId, x: 0, y: 0, text: itemText, color: itemColor, link: itemLink, url: itemUrl, type: "box" };
        setItems([...items, newBox]);
        setItemText('Text');
        setItemColor('#aabbcc');
    };

    const handleImageUpload = (e) => {
        const file = e;
        const reader = new FileReader();

        reader.onload = (e) => {
            const newImage = {
                id: Date.now(),
                src: e.target.result,
                x: 0,
                y: 0,
                width: "100",
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
        setPaths((prevPaths) => [...prevPaths, { path: currentPath, color, line }]);
        setCurrentPath('');
    };

    const handleDeleteItem = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setEditingText(null)
    };

    {/* Text box create methods */ }
    const handleItemText = (event) => {
        setItemText(event.target.value);
    };
    const handleItemColor = (event) => {
        setItemColor(event.target.value);
    };
    const handleItemLink = (event) => {
        setItemLink(event.target.value);
    };
    const handleItemUrl = (event) => {
        setItemUrl(event.target.value);
    };
    {/* Edit text box */ }
    const handleEditBox = (id) => {
        setEditingText({ status: true, id: id })
    }
    const handleStopEditBox = () => {
        setEditingText(null)
    }
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
    const handleItemLinkChange = (event, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, link: event.target.value };
                }
                return item;
            })
        );
    };
    const handleItemUrlChange = (event, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, url: event.target.value };
                }
                return item;
            })
        );
    };
    {/* Edit image */ }
    const handleEditImage = (id) => {
        setEditingImage({ status: true, id: id })
    }
    const handleStopEditImage = () => {
        setEditingImage(null)
    }
    const handleImageChange = (event, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, width: event.target.value };
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
        <div className='dashboard'>
            <div className='sidebar'>
                {/* Boxes form */}

                <div>
                    {!editingText && (
                        <>
                            <h2>Boxes:</h2>
                            <form className='inputs' onSubmit={handleAddBox}>
                                <label>Text:</label>
                                <textarea value={itemText} onChange={handleItemText} />

                                <label>Color:</label>
                                <input type="color" name="color" value={itemColor} onChange={handleItemColor} />

                                <label>Link text:</label>
                                <input type="text" name="link" value={itemLink} onChange={handleItemLink} />

                                <label>Link url:</label>
                                <input type="text" name="url" value={itemUrl} onChange={handleItemUrl} />

                                <button type="submit">Add Box</button>
                            </form>
                        </>
                    )
                    }
                    {items.length > 0 && editingText && (

                        <div className='inputs'>
                            <h2>Edit Box:</h2>
                            <label>Change text:</label>
                            <textarea
                                value={items.find(item => item.id === editingText.id).text}
                                onChange={(event) =>
                                    handleItemTextChange(event, editingText.id)
                                }
                            />

                            <label>Change color:</label>
                            <input
                                type="color"
                                name="color"
                                value={items.find(item => item.id === editingText.id).color}
                                onChange={(event) =>
                                    handleItemColorChange(event, editingText.id)
                                } />

                            <label>Change link:</label>
                            <input
                                type="text"
                                name="link"
                                value={items.find(item => item.id === editingText.id).link}
                                onChange={(event) =>
                                    handleItemLinkChange(event, editingText.id)
                                } />

                            <label>Change url:</label>
                            <input
                                type="text"
                                name="url"
                                value={items.find(item => item.id === editingText.id).url}
                                onChange={(event) =>
                                    handleItemUrlChange(event, editingText.id)
                                } />

                        </div>

                    )
                    }
                </div>
                {/* Images form */}
                <h2>Images:</h2>
                <div className='inputs'>
                    <label className='custom-file-upload'>
                        Add an image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload} />
                    </label>
                    <DragDropFile handleImageUpload={handleImageUpload} />
                    {
                        items.length > 0 && editingImage && (
                            <label>
                                Change image width:
                                <input
                                    type="number"
                                    min="40"
                                    value={items.find(item => item.id === editingImage.id).width}
                                    onChange={(event) => handleImageChange(event, editingImage.id)}
                                />
                            </label>)
                    }
                </div>
                {/* Drawing form */}
                <h2>Drawing:</h2>
                <div className='inputs'>
                    <input
                        type="color"
                        value={color}
                        onChange={(event) => setColor(event.target.value)} />
                    <input
                        type="number"
                        value={line}
                        onChange={(event) => setLine(event.target.value)} />
                    <button
                        style={erasing ? { backgroundColor: "#aabbcc" } : null}
                        onClick={handleEraser}>Delete lines</button>
                    <button
                        onClick={handleDownload}>Download SVG</button>
                </div>
            </div >
            <div className="frame">
                <svg
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    ref={svgRef}
                    style={{ width: '2000', height: '2000', border: '1px solid transparent' }}
                    cursor={isDrawing ? "crosshair" : "move"}
                    xmlnsXlink="http://www.w3.org/1999/xlink"
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
                                    <foreignObject
                                        x="20"
                                        y="20"
                                        width="160"
                                        height="160"
                                        style={{ cursor: 'move', backgroundColor: item.color, padding: "1rem", borderRadius: "12px" }}
                                        onMouseDown={(e) => handleMouseDown(e, item.id)}
                                        onMouseUp={handleMouseUp}
                                    >
                                        <p className="text" fill={item.color} draggable="true">
                                            {item.text}
                                        </p>
                                    </foreignObject>
                                    <text
                                        x="5"
                                        y="15"
                                        fill="white"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDeleteItem(item.id)}>
                                        &times;
                                    </text>
                                    <a
                                        xlinkHref={item.url}
                                        target="__blank">
                                        <text x="120" y="40" fill="blue">{item.link}</text>
                                    </a>
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
                                    {editingText && editingText.id === item.id && <circle
                                        cx="175"
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
                                            fill="transparent"
                                            style={{ border: '1px solid black', backgroundColor: "transparent", cursor: 'move' }}
                                        />

                                        <image href={item.src}
                                            x={-item.width / 5}
                                            y="0"
                                            width={item.width}
                                            height={item.width * 2}
                                            onMouseDown={e => {
                                                handleMouseDown(e, item.id)
                                            }}
                                            style={{ cursor: 'move' }} />
                                        <text
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleDeleteItem(item.id)}>
                                            X
                                        </text>
                                        <circle
                                            cx="120"
                                            cy="5"
                                            r="8"
                                            fill="red"
                                            stroke="white"
                                            strokeWidth="2"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleEditImage(item.id)}
                                        />
                                        {editingImage && editingImage.id === item.id && <circle
                                            cx="95"
                                            cy="5"
                                            r="8"
                                            fill="green"
                                            stroke="white"
                                            strokeWidth="2"
                                            style={{ cursor: 'pointer' }}
                                            onClick={handleStopEditImage}
                                        />}
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
                            strokeWidth={path.line}
                            onMouseDown={erasing ? (() => handleDeletePath(path)) : null}
                            cursor={erasing ? "grab" : "move"}
                        />
                    ))}
                    {currentPath && (
                        <path
                            d={currentPath}
                            stroke={color}
                            fill="none"
                            strokeWidth={line}
                        />
                    )}

                </svg>
            </div>
        </div>
    )
}

export default FullBoard
