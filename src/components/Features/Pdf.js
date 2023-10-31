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

    return (
        <>
            {item.type === "pdf" && item.board === activeBoard.id &&
                <>
                    <g
                        draggable="true"
                        transform={`rotate(${item.angle || 0}, ${item.width / 2}, ${item.height / 2})`}
                        className='pdf-group'
                        style={{
                            opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1
                        }}
                        onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                        onPointerMove={(e) => handleSvgPointerMove(e, item.id)}
                        onPointerUp={(e) => handleSvgPointerUp(e, item.id)}
                        onTouchStart={(e) => handleSvgPointerDown(e, item.id)}
                        onTouchMove={(e) => handleSvgPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleSvgPointerUp(e, item.id)}
                        onDoubleClick={(e) => handleEditItem(e, item.id)}
                    >
                        {isEditingBoard && editingItem && editingItem.id === item.id && (
                            <>
                                <circle
                                    id="rotate"
                                    fill="#cccccc"
                                    cx="-20"
                                    cy={`${item.height / 2}`}
                                    width="20"
                                    height="20"
                                    r='12'
                                    onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="#cccccc"
                                    x={item.width}
                                    y={item.height}
                                    width="20"
                                    height="20"
                                    rx="4"
                                    onPointerDown={(e) => handleSvgPointerDown(e, item.id)}
                                />
                            </>)}
                        {isSafari && <rect
                            fill="#000000"
                            x="0"
                            y="-30"
                            width={item.width}
                            height={item.height}
                            rx="16"
                        />
                        }
                        <foreignObject
                            x="0"
                            y="0"
                            width={item.width}
                            height={item.height}
                            draggable="true"
                            className='pdf-object'
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
                                        top: isSafari ? item.y : "2rem",
                                        left: isSafari ? item.x : "0",
                                    }}

                                />
                            )}
                        </foreignObject>
                        {isEditingBoard && <TopControls item={item} />}
                    </g>
                </>
            }
        </>
    )
}
export default Pdf