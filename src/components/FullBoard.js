import React, { useState, useRef } from 'react';

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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
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
                                <label>
                                    Text:
                                    <input type="text" value={itemText} onChange={handleItemText} />
                                </label>
                                <label>
                                    Color:
                                    <input type="color" name="color" value={itemColor} onChange={handleItemColor} />
                                </label>
                                <label>
                                    Link text:
                                    <input type="text" name="link" value={itemLink} onChange={handleItemLink} />
                                </label>
                                <label>
                                    Link url:
                                    <input type="text" name="url" value={itemUrl} onChange={handleItemUrl} />
                                </label>
                                <button type="submit">Add Box</button>
                            </form>
                        </>
                    )
                    }
                    {items.length > 0 && editingText && (

                        <div className='inputs'>
                            <h2>Edit Box:</h2>
                            <label>
                                Change text:
                                <input
                                    type="text"
                                    value={items.find(item => item.id === editingText.id).text}
                                    onChange={(event) =>
                                        handleItemTextChange(event, editingText.id)
                                    }
                                />
                            </label>
                            <label>
                                Change color:
                                <input
                                    type="color"
                                    name="color"
                                    value={items.find(item => item.id === editingText.id).color}
                                    onChange={(event) =>
                                        handleItemColorChange(event, editingText.id)
                                    } />
                            </label>
                            <label>
                                Change link:
                                <input
                                    type="text"
                                    name="link"
                                    value={items.find(item => item.id === editingText.id).link}
                                    onChange={(event) =>
                                        handleItemLinkChange(event, editingText.id)
                                    } />
                            </label>
                            <label>
                                Change url:
                                <input
                                    type="text"
                                    name="url"
                                    value={items.find(item => item.id === editingText.id).url}
                                    onChange={(event) =>
                                        handleItemUrlChange(event, editingText.id)
                                    } />
                            </label>
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
                    style={{ width: '2000', height: '1200', border: '1px solid transparent', backgroundColor: "gold", }}
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
                                    <rect
                                        width="200"
                                        height="50"
                                        fill={item.color}
                                        stroke="white"
                                        strokeWidth="6"
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
                                    <a
                                        xlinkHref={item.url}
                                        target="__blank">
                                        <text x="120" y="40" fill="blue">{item.link}</text>
                                    </a>
                                    {/* <rect
                                        x="195"
                                        y="-5"
                                        width="20"
                                        height="20"
                                        fill="white"
                                    />
                                    <g transform={"translate(195, -10),scale(.06)"} onClick={() => handleEditBox(item.id)}>
                                        <path style={{ fill: "none" }} d="M186.95,343.077l-39.367,11.362h146.668c6.629,0,12,5.373,12,12c0,6.627-5.371,12-12,12H66.541
			c-0.643,0-1.268-0.065-1.883-0.163c-0.643,0.105-1.287,0.163-1.928,0.163c-2.998,0-5.932-1.124-8.184-3.222
			c-3.086-2.877-4.435-7.163-3.553-11.288l27.934-130.598c0.484-2.264,1.613-4.339,3.25-5.976L228.255,81.277H26.412v318.001
			h318.001v-211.55L192.108,340.033C190.673,341.467,188.899,342.514,186.95,343.077z"/>
                                        <polygon style={{ fill: "none" }} points="163.321,324.917 97.879,259.474 78.654,349.352 		" />
                                        <path style={{ fill: "none" }} d="M327.089,24c-4.922,0-8.928,1.6-12.604,5.035c-0.145,0.137-0.293,0.268-0.443,0.395l-8.666,8.666
			l77.363,77.362l8.471-8.47c0.041-0.042,0.084-0.082,0.125-0.123l0.086-0.085c0.123-0.145,0.25-0.288,0.381-0.428
			c16.182-17.318-11.684-47.783-20.609-56.707C354.897,33.346,338.821,24,327.089,24z"/>
                                        <path style={{ fill: "#73D0F4" }} d="M107.91,235.564l77.362,77.362l180.496-180.498l-77.363-77.363L107.91,235.564z M309.38,111.454
			c4.686,4.686,4.686,12.284,0,16.97L182.606,255.197c-2.344,2.342-5.414,3.514-8.486,3.514c-3.07,0-6.141-1.171-8.484-3.514
			c-4.686-4.687-4.686-12.285,0-16.971l126.773-126.772C297.095,106.768,304.694,106.768,309.38,111.454z"/>
                                        <path style={{ fill: "#3D6889" }} d="M165.636,255.197c2.344,2.343,5.414,3.514,8.484,3.514c3.072,0,6.142-1.172,8.486-3.514
			L309.38,128.424c4.686-4.687,4.686-12.285,0-16.97c-4.685-4.686-12.285-4.686-16.971,0L165.636,238.226
			C160.95,242.913,160.95,250.51,165.636,255.197z"/>
                                        <path style={{ fill: "#3D6889" }} d="M417.848,76.476c-4.635-13.872-14.898-29.019-29.686-43.803C373.259,17.768,350.565,0,327.089,0
			c-10.531,0-20.234,3.703-28.135,10.721c-0.412,0.316-0.805,0.661-1.176,1.032l-45.525,45.524H14.412c-6.627,0-12,5.373-12,12
			v342.001c0,6.627,5.373,12,12,12h342.001c6.627,0,12-5.373,12-12V166.123c0-0.748-0.078-1.476-0.209-2.186l39.853-39.854
			c0.08-0.079,0.16-0.157,0.238-0.237c0.002-0.001,0.004-0.003,0.006-0.005l0.781-0.782c0.369-0.369,0.707-0.754,1.017-1.157
			C421.012,109.661,423.694,93.979,417.848,76.476z M163.321,324.917l-84.667,24.436l19.225-89.878L163.321,324.917z
			 M185.272,312.926l-77.362-77.362L288.405,55.066l77.363,77.363L185.272,312.926z M344.413,399.278H26.412V81.277h201.843
			L82.178,227.355c-1.637,1.637-2.766,3.712-3.25,5.976L50.994,363.928c-0.883,4.125,0.467,8.411,3.553,11.288
			c2.252,2.098,5.186,3.222,8.184,3.222c0.641,0,231.52,0,231.52,0c6.629,0,12-5.373,12-12c0-6.627-5.371-12-12-12H147.583
			l39.367-11.362c1.949-0.563,3.723-1.61,5.158-3.044l152.305-152.305V399.278z M391.802,106.351
			c-0.131,0.14-0.258,0.283-0.381,0.428l-0.086,0.085c-0.041,0.041-0.084,0.082-0.125,0.123l-8.471,8.47l-77.363-77.362l8.666-8.666
			c0.15-0.127,0.299-0.258,0.443-0.395C318.161,25.6,322.167,24,327.089,24c11.732,0,27.809,9.346,44.103,25.644
			C380.118,58.568,407.983,89.033,391.802,106.351z"/>
                                    </g> */}
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
