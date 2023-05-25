import React, { useState, useRef } from 'react';
import DragDropFile from "./DragDropUpload"
import Moodboard from "./Moodboard"

const Svg = () => {
    return (<rect
        width="120"
        height="120"
        fill="red"
        style={{ border: '1px solid black', backgroundColor: "red", cursor: 'move' }}
    />)
}

const FullBoard = () => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const [paths, setPaths] = useState([]);
    const [erasing, setErasing] = useState(false);
    const [color, setColor] = useState('#aabbcc');
    const [line, setLine] = useState(2);
    const svgRef = useRef(null);
    const [items, setItems] = useState([]);
    const [itemText, setItemText] = useState('Text');
    const [itemColor, setItemColor] = useState('#aabbcc');
    const [itemLink, setItemLink] = useState('');
    const [itemUrl, setItemUrl] = useState('');
    const [itemVideoUrl, setItemVideoUrl] = useState('');
    const [itemImageUrl, setItemImageUrl] = useState('');
    const [itemMapUrl, setItemMapUrl] = useState('');
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
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const newItem = {
                id: Date.now(),
                src: e.target.result,
                x: 0,
                y: 0,
                width: "100",
                type: "image"
            };
            setItems((prevItems) => [...prevItems, newItem]);
        };
        reader.readAsDataURL(file);
    };
    const handleImageDropUpload = (e) => {
        const file = e;
        const reader = new FileReader();
        reader.onload = (e) => {
            const newItem = {
                id: Date.now(),
                src: e.target.result,
                x: 0,
                y: 0,
                width: "100",
                type: "image"
            };
            setItems((prevItems) => [...prevItems, newItem]);
        };
        reader.readAsDataURL(file);
    };
    const handleAddVideo = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            videoUrl: itemVideoUrl,
            x: 0,
            y: 0,
            type: "video"
        }
        setItems((prevItems) => [...prevItems, newItem]);
    }
    const handleAddImage = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            imageUrl: itemImageUrl,
            x: 0,
            y: 0,
            width: "100",
            type: "imageUrl"
        }
        setItems((prevItems) => [...prevItems, newItem]);
    }
    const handleAddMap = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            mapUrl: itemMapUrl,
            x: 0,
            y: 0,
            type: "mapUrl"
        }
        setItems((prevItems) => [...prevItems, newItem]);
    }
    const handleMouseDown = (event, itemId) => {
        if (itemId) {
            setDraggingItem(true);
            const offsetItemX = event.clientX - event.currentTarget.getBoundingClientRect().left;
            const offsetItemY = event.clientY - event.currentTarget.getBoundingClientRect().top;
            const selectedItem = items.find(item => item.id === itemId)
            setSelectedItem(selectedItem)
            setDragOffsetItem({ x: offsetItemX, y: offsetItemY });
        }
        if (!itemId && isDrawing) {
            const { x, y } = getCursorPositionDrawing(event);
            setCurrentPath(`M${x} ${y}`);
        }
    };
    const handleMouseMove = (event) => {
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
        if (!isDrawing) return;
        if (isDrawing && !erasing && !selectedItem) {
            const { x, y } = getCursorPositionDrawing(event);
            setCurrentPath((prevPath) => `${prevPath} L${x} ${y}`);
        }
    };
    const handleMouseUp = () => {
        setSelectedItem(null)
        setDraggingItem(false);
        setDragOffsetItem({ x: 0, y: 0 });
        setPaths((prevPaths) => [...prevPaths, { path: currentPath, color, line }]);
        setCurrentPath('');
    };
    const handleDeleteItem = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setEditingText(null)
        setEditingImage(null)
    };
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
    const handleItemVideoUrl = (event) => {
        setItemVideoUrl(event.target.value);
    };
    const handleItemImageUrl = (event) => {
        setItemImageUrl(event.target.value);
    };
    const handleItemMapUrl = (event) => {
        setItemMapUrl(event.target.value);
    };
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
        )
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
    const getCursorPositionDrawing = (event) => {
        const { left, top } = svgRef.current.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        return { x, y };
    };
    const handleDraw = () => {
        setIsDrawing(isDrawing => !isDrawing)
    }
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
                <div className='itemForms'>
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
                <div className='itemForms'>
                    <h2>Images:</h2>
                    <div className='inputs'>
                        <label className='custom-file-upload'>
                            Add an image:
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload} />
                        </label>
                        {items.length > 0 && editingImage && (
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
                        <DragDropFile handleImageDropUpload={handleImageDropUpload} />
                    </div>
                </div>
                <div className='itemForms'>
                    <h2>Videos:</h2>
                    <form className='inputs' onSubmit={handleAddVideo}>
                        <div className='inputs'>
                            <label>Add a Youtube video link:</label>
                            <input type="text" name="videourl" value={itemVideoUrl} onChange={handleItemVideoUrl} />
                            <button type="submit">Add video</button>
                        </div> </form></div>
                <div className='itemForms'>
                    <h2>Image link:</h2>
                    <form className='inputs' onSubmit={handleAddImage}>
                        <div className='inputs'>
                            <label>Add an image link:</label>
                            <input type="text" name="imageurl" value={itemImageUrl} onChange={handleItemImageUrl} />
                            <button type="submit">Add image</button>
                        </div>
                    </form>
                </div>
                <div className='itemForms'>
                    <h2>Map:</h2>
                    <form className='inputs' onSubmit={handleAddMap}>
                        <div className='inputs'>
                            <label>Add a map link:</label>
                            <input type="text" name="mapurl" value={itemMapUrl} onChange={handleItemMapUrl} />
                            <button type="submit">Add map</button>
                        </div>
                    </form>
                </div>

            </div>
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
                    <g>
                        <clippath id="my-clippath">
                            <path d="M 50 15, 100 25, 100 100, 50 100, 0 100, 0 25Z"></path>
                        </clippath>
                    </g>
                    {items.map(item => (
                        <g
                            key={item.id}
                            draggable="true"
                            transform={`translate(${item.x},${item.y})`}
                        >
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
                                    <a
                                        xlinkHref={item.url}
                                        target="__blank">
                                        <text x="120" y="40" fill="blue">{item.link}</text>
                                    </a>
                                    <circle
                                        cx="0"
                                        cy="0"
                                        r="8"
                                        fill="red"
                                        stroke="white"
                                        strokeWidth="2"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDeleteItem(item.id)}
                                    />
                                    <circle
                                        cx="40"
                                        cy="0"
                                        r="8"
                                        fill="orange"
                                        stroke="white"
                                        strokeWidth="2"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleEditBox(item.id)}
                                    />
                                    {editingText && editingText.id === item.id && <circle
                                        cx="20"
                                        cy="0"
                                        r="8"
                                        fill="green"
                                        stroke="white"
                                        strokeWidth="2"
                                        style={{ cursor: 'pointer' }}
                                        onClick={handleStopEditBox}
                                    />}
                                </>
                            )}
                            {item.type === "image" &&
                                (
                                    <>
                                        {/* <rect
                                            width="120"
                                            height="120"
                                            fill="transparent"
                                            style={{ border: '1px solid black', backgroundColor: "transparent", cursor: 'move' }}
                                        /> */}
                                        <Svg />
                                        <image href={item.src}
                                            x="0"
                                            y="0"
                                            width={item.width || "100"}
                                            height={item.width || "100"}
                                            onMouseDown={e => {
                                                handleMouseDown(e, item.id)
                                            }}
                                            style={{ cursor: 'move' }} />
                                        <circle
                                            cx="0"
                                            cy="0"
                                            r="8"
                                            fill="red"
                                            stroke="white"
                                            strokeWidth="2"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleDeleteItem(item.id)}
                                        />
                                        <circle
                                            cx="40"
                                            cy="0"
                                            r="8"
                                            fill="orange"
                                            stroke="white"
                                            strokeWidth="2"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleEditImage(item.id)}
                                        />
                                        {editingImage && editingImage.id === item.id && <circle
                                            cx="20"
                                            cy="0"
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
                            {item.type === "video" && (
                                <>
                                    <foreignObject width="560" height="349" onMouseDown={(e) => handleMouseDown(e, item.id)}
                                        onMouseUp={handleMouseUp} >
                                        <div style={{ width: '100%', height: '40px', backgroundColor: "#000000" }} draggable="true"></div>
                                        <iframe draggable="true" width="560" height="315" src={item.videoUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"></iframe>
                                    </foreignObject>
                                    <circle
                                        cx="0"
                                        cy="0"
                                        r="8"
                                        fill="red"
                                        stroke="white"
                                        strokeWidth="2"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDeleteItem(item.id)}
                                    />
                                    {/* <text
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDeleteItem(item.id)}>
                                        X
                                    </text> */}
                                </>
                            )}
                            {item.type === "mapUrl" &&
                                <g style={{ width: "300", height: "200" }} clipPath="url(#my-clippath)">
                                    <foreignObject width="560" x="0" y="0" height="349" onMouseDown={(e) => handleMouseDown(e, item.id)}
                                        onMouseUp={handleMouseUp}>
                                        <div style={{ width: '100%', height: '40px', backgroundColor: "#000000" }} draggable="true"></div>
                                        <iframe draggable="true" src={item.mapUrl} width="600" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    </foreignObject>
                                    <circle
                                        cx="0"
                                        cy="0"
                                        r="8"
                                        fill="red"
                                        stroke="white"
                                        strokeWidth="2"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDeleteItem(item.id)}
                                    />
                                    {/* <text
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleDeleteItem(item.id)}>
                                        X
                                    </text> */}
                                </g>
                            }
                            {item.type === "imageUrl" &&
                                (
                                    <>
                                        <rect
                                            width="120"
                                            height="120"
                                            fill="transparent"
                                            style={{ border: '1px solid black', backgroundColor: "transparent", cursor: 'move' }}
                                        />
                                        <image href={item.imageUrl}
                                            x="0"
                                            y="0"
                                            width={item.width || "100"}
                                            height={item.width || "100"}
                                            onMouseDown={e => {
                                                handleMouseDown(e, item.id)
                                            }}
                                            style={{ cursor: 'move' }} />
                                        <circle
                                            cx="0"
                                            cy="0"
                                            r="8"
                                            fill="red"
                                            stroke="white"
                                            strokeWidth="2"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleDeleteItem(item.id)}
                                        />
                                        <circle
                                            cx="40"
                                            cy="0"
                                            r="8"
                                            fill="orange"
                                            stroke="white"
                                            strokeWidth="2"
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleEditImage(item.id)}
                                        />
                                        {editingImage && editingImage.id === item.id && <circle
                                            cx="20"
                                            cy="0"
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
                    {paths.map((path, index) => (
                        <path
                            key={index}
                            d={path.path}
                            stroke={path.color}
                            fill="none"
                            strokeWidth={path.line}
                            draggable="true"
                            onMouseDown={erasing ? (() => handleDeletePath(path)) : null}
                            onDragOver={erasing ? (() => handleDeletePath(path)) : null}
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
            <div className='sidebar'>

                <div className='itemForms'>
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
                            style={isDrawing ? { backgroundColor: "#aabbcc" } : null}
                            onClick={handleDraw}>Add drawing</button>
                        <button
                            style={erasing ? { backgroundColor: "#aabbcc" } : null}
                            onClick={handleEraser}>Delete lines</button>
                        <button
                            onClick={handleDownload}>Download SVG</button>
                    </div>
                </div>
                <div className='itemForms'>
                    <Moodboard />
                </div>
            </div>
        </div>
    )
}

export default FullBoard
