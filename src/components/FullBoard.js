import React from 'react';
import DragDropFile from "./DragDropUpload"
import Moodboard from "./Moodboard"
import { MoodboardContext } from "../context/moodboard";
import Image from "./Image"

const FullBoard = () => {
    const { isDrawing, currentPath, paths, erasing, color, line, svgRef, items, itemText, itemColor, itemLink, itemUrl, itemVideoUrl, itemImageUrl, itemMapUrl, editingText, editingImage, handleAddBox, handleImageUpload, handleImageDropUpload, handleAddVideo, handleAddImage, handleAddMap, handleMouseDown, handleMouseMove, handleMouseUp, handleDeleteItem, handleItemText, handleItemColor, handleItemLink, handleItemUrl, handleItemVideoUrl, handleItemImageUrl, handleItemMapUrl, handleEditBox, handleStopEditBox, handleItemTextChange, handleItemColorChange, handleItemLinkChange, handleItemUrlChange, handleEditImage, handleStopEditImage, handleImageChange, handleDraw, handleEraser, handleDeletePath, handelLineColor, handelLineWidth, handleDownload } = React.useContext(MoodboardContext);

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
                            {item.type === "image" && <Image item={item} />}
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
                            onChange={(event) => handelLineColor(event)} />
                        <input
                            type="number"
                            value={line}
                            onChange={(event) => handelLineWidth(event)} />
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
