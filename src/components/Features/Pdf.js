import React, { useState, useEffect } from 'react';
import { isSafari } from "../utils/browserDetector"
import TopControls from "../helperComponents/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const Pdf = ({ item }) => {
    const { activeBoard, handleSvgPointerDown, handleSvgPointerMove, handleSvgPointerUp, handleEditItem, isEditingBoard, isDraggingRect, selectedRectId, editingItem } = React.useContext(MoodboardContext);

    const [pdfData, setPdfData] = useState('');

    useEffect(() => {
        if (item.type === "pdf") {
            handlePdfFetch(item.id)
        }
    }, []);

    const handlePdfFetch = (id) => {
        const request = indexedDB.open('vible-database', 1)
        request.onsuccess = function (event) {
            const db = event.target.result
            const transaction = db.transaction('pdfs', 'readonly')
            const store = transaction.objectStore('pdfs');
            const getRequest = store.get(id);
            getRequest.onsuccess = function (event) {
                const pdf = event.target.result;
                if (pdf) {
                    setPdfData(pdf);
                }
            }
            getRequest.onerror = function () {
                console.error('Error retrieving PDF.');
            }
        }
        request.onerror = function () {
            console.error('Error opening IndexedDB.');
        }
    }
    const rectWidth = item.x + item.width + 30
    const rectHeight = item.y + item.height + 30
    return (
        <>
            {item.type === "pdf" && item.board === activeBoard.id &&
                <>
                    <rect
                        fill="#000000"
                        x={item.x}
                        y={isSafari ? item.y - 30 : item.y}
                        width={item.width}
                        height={item.height}
                        rx="16"
                        transform={`rotate(${item.angle || 0}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                        style={{
                            opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1,
                        }}
                        onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                        onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                        onPointerUp={(e) => handleSvgPointerUp(e, item.id)}
                        onTouchStart={e => { handleSvgPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleSvgPointerUp(e, item.id)}
                        // onDoubleClick={(e) => handleEditItem(e, item.id)}
                        onClick={(e) => handleEditItem(e, item.id)}
                    />
                    <foreignObject
                        x={isSafari ? "0" : item.x}
                        y={isSafari ? "1em" : item.y + 20}
                        width={item.width}
                        height={item.height}
                        key={item.id}
                        draggable="true"
                        id="pdf"
                        className='pdf-object'
                        transform={`rotate(${item.angle || 0}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                        style={{
                            opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1,
                            top: isSafari ? "1em" : item.y,
                            left: isSafari ? item.x : "0",
                        }}
                        onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                        onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                        onPointerUp={(e) => handleSvgPointerUp(e, item.id)}
                        onTouchStart={e => { handleSvgPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleSvgPointerUp(e, item.id)}
                        // onDoubleClick={(e) => handleEditItem(e, item.id)}
                        onClick={(e) => handleEditItem(e, item.id)}
                    >
                        {!isSafari && <div
                            xmlns="http://www.w3.org/1999/xhtml"
                            className='pdf-isnotsafari'
                            style={{
                                top: item.y,
                                left: item.x,
                                height: item.width * 9 / 12,
                            }}
                            onDoubleClick={(e) => handleEditItem(e, item.id)}
                        >
                        </div>}
                        {pdfData && (
                            <iframe
                                className='pdf-frame'
                                title="Pdf"
                                draggable="true"
                                width="100%"
                                height="100%"
                                src={`${URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }))}`}
                                type="application/pdf"
                                style={{
                                    transform: isSafari && `rotate(${item.angle || 0}deg)`,
                                    top: isSafari ? item.y : "2em",
                                    left: isSafari ? item.x : "0",
                                }}

                            />
                        )}
                    </foreignObject>
                    <g
                        transform={`rotate(${item.angle || 0}, ${item.x + item.width / 2}, ${item.y + item.height / 2})`}
                    // style={{
                    //     transform: `translate(${item.x},${item.y})`
                    // }}
                    >
                        {isEditingBoard && < TopControls item={item} />}
                        {isEditingBoard && editingItem && editingItem.id === item.id && (
                            <>
                                <circle
                                    id="rotate"
                                    fill="#cccccc"
                                    cx={item.x - 30}
                                    cy={`${item.y + item.height / 2}`}
                                    width="20"
                                    height="20"
                                    r='12'
                                    onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="#cccccc"
                                    x={item.x + item.width / 1 + 20}
                                    y={item.y + item.height / 1 + 20}
                                    width="20"
                                    height="20"
                                    rx="4"
                                    onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                />
                            </>)}
                    </g>
                </>
            }
        </>
    )
}
export default Pdf