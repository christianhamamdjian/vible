import React, { useState, useEffect } from 'react';
import { isSafari } from "../utils/browserDetector"
import TopControls from "../helperFunctions/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const Pdf = ({ item }) => {
    const { activeBoard, handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleEditItem, isEditingBoard, isDraggingRect, selectedRectId } = React.useContext(MoodboardContext);

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
                        style={{
                            userSelect: "none",
                            opacity: isDraggingRect && item.id === selectedRectId ? .8 : 1
                        }}
                        onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                        onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                        onDoubleClick={(e) => handleEditItem(e, item.id)}
                    >
                        {isEditingBoard && (
                            <>
                                <circle
                                    id="rotate"
                                    fill="#cccccc"
                                    cx="-20"
                                    cy={`${item.height / 2}`}
                                    width="20"
                                    height="20"
                                    r='12'
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                                />
                                <rect
                                    id="resize"
                                    fill="#cccccc"
                                    x={item.width}
                                    y={item.height}
                                    width="20"
                                    height="20"
                                    rx="4"
                                    onPointerDown={(e) => handleRectPointerDown(e, item.id)}
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
                            style={{
                                display: "block",
                                zIndex: "-100",
                                position: "absolute",
                                backgroundColor: "transparent",
                                top: "0",
                                right: "0",
                                bottom: "0",
                                left: "0",
                                borderRadius: ".5rem",
                                userSelect: "none",
                                pointerEvents: "all"
                            }}
                        >
                            {!isSafari && <div
                                xmlns="http://www.w3.org/1999/xhtml"
                                // className='video-top'
                                style={{
                                    potition: "absolute",
                                    top: item.y,
                                    left: item.x,
                                    height: item.width * 9 / 12,
                                    backgroundColor: "#000000",
                                    userSelect: "none",
                                    borderRadius: "1rem 1rem 0 0"
                                }}
                                onDoubleClick={(e) => handleEditItem(e, item.id)}
                            >
                            </div>}
                            {pdfData && (
                                <iframe
                                    // onload={alert("I should be called")}
                                    title="Pdf"
                                    draggable="true"
                                    width="100%"
                                    height="100%"
                                    src={`${URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }))}`}
                                    type="application/pdf"
                                    // transform={`rotate(${item.angle}`}
                                    style={{
                                        transform: isSafari && `rotate(${item.angle || 0}deg)`,
                                        position: "absolute",
                                        top: isSafari ? item.y : "2rem",
                                        left: isSafari ? item.x : "0",
                                        right: "0",
                                        bottom: "0",
                                        zIndex: "1",
                                        userSelect: "none",
                                        pointerEvents: "all",
                                        // toolbar: "hidden",
                                        // navpanes: "false",
                                        // zoom: "0",
                                        // overflow: "clip"
                                    }}

                                />
                            )
                            }
                        </foreignObject>
                        <TopControls item={item} />
                    </g>
                </>
            }
        </>
    )
}
export default Pdf