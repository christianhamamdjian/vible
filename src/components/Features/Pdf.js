import React, { useState, useEffect } from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Pdf = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleEditPdf, handleDeleteItem, editingPdf, handleStopEditItem, isEditingBoard } = React.useContext(MoodboardContext);

    const [pdfData, setPdfData] = useState('');

    useEffect(() => {
        handlePdfFetch(item.id);
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
    const handleMouseDown = (event) => {
        event.preventDefault()
    };
    return (
        <>
            {item.type === "pdf" &&
                <>
                    <foreignObject
                        x="0"
                        y="0"
                        width={item.width}
                        height={item.height}
                        draggable="true"
                        className='pdf-object'
                        style={{
                            backgroundColor: item.color,
                            transform: `rotate(${item.angle || 0}deg)`,
                            transformOrigin: `${item.width / 2, item.height / 2}`,
                            display: "block",
                            zIndex: "999999",
                            position: "absolute",
                            top: "0",
                            right: "0",
                            bottom: "0",
                            left: "0",
                            borderRadius: ".5rem"
                        }}
                        onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={(e) => handleRectPointerUp(e, item.id)}
                        onTouchStart={e => { handleRectPointerDown(e, item.id) }}
                        onTouchMove={(e) => handleRectPointerMove(e, item.id)}
                        onTouchEnd={(e) => handleRectPointerUp(e, item.id)}
                    >
                        <div
                            className='pdf-top'
                            onDoubleClick={(e) => handleEditPdf(e, item.id)}

                        >
                        </div>
                        <div
                            onMouseDown={handleMouseDown}
                        >
                            {pdfData ? (
                                // <embed
                                //     draggable="true"
                                //     src={URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }))}
                                //     type="application/pdf"
                                //     width="100%"
                                //     height={item.height}
                                // />
                                <iframe

                                    title="Pdf"
                                    draggable="true"
                                    src={URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }))}
                                    type="application/pdf"
                                    width="100%"
                                    height={item.height}
                                />
                            ) : (
                                <div>No PDF found.</div>
                            )}</div>
                    </foreignObject>
                    {isEditingBoard && <>
                        <rect
                            x="10"
                            y="-22"
                            height="20"
                            width="24"
                            rx="6"
                            fill="red"
                            stroke="white"
                            strokeWidth="2"
                            className='box-control'
                            onClick={() => handleDeleteItem(item.id)}
                        />
                        <text
                            x="18"
                            y="-9"
                            width="24"
                            height="20"
                            fill="white"
                            className="box-control-sign"
                            onClick={() => handleDeleteItem(item.id)}
                        >&times;</text>
                        <rect
                            x="60"
                            y="-22"
                            height="20"
                            width="24"
                            rx="6"
                            fill="green"
                            stroke="white"
                            strokeWidth="2"
                            className='box-control'
                            onClick={() => handleEditPdf(item.id)}
                        />
                        <text
                            x="68"
                            y="-9"
                            width="24"
                            height="20"
                            fill="white"
                            className="box-control-sign"
                            onClick={() => handleEditPdf(item.id)}
                        >+</text>

                        {editingPdf && editingPdf.id === item.id && <>
                            <rect
                                x="35"
                                y="-22"
                                height="20"
                                width="24"
                                rx="6"
                                fill="orange"
                                stroke="white"
                                strokeWidth="2"
                                className='box-control'
                                onClick={handleStopEditItem}
                            />
                            <text
                                x="43"
                                y="-9"
                                width="24"
                                height="20"
                                fill="white"
                                className="box-control-sign"
                                onClick={handleStopEditItem}
                            >-</text>
                        </>
                        }
                    </>
                    }
                </>
            }
        </>
    )
}
export default Pdf