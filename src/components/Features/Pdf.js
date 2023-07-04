import React, { useState, useEffect } from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Pdf = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleEditPdf, handleDeleteItem, editingImage, handleStopEditPdf, isEditingBoard } = React.useContext(MoodboardContext);

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

    return (
        <>
            {item.type === "pdf" &&
                <>
                    <foreignObject
                        x="0"
                        y="0"
                        width="160"
                        height="160"
                        draggable="true"
                        style={{
                            cursor: 'move', backgroundColor: item.color, padding: "1rem", borderRadius: "6px"
                        }}
                        onPointerDown={(e) => handleRectPointerDown(e, item.id)}
                        onPointerMove={(e) => handleRectPointerMove(e, item.id)}
                        onPointerUp={() => handleRectPointerUp(item.id)}
                    >
                        <div style={{ width: '100%', height: '20px', backgroundColor: "#000000" }}></div>
                        {pdfData ? (
                            <embed draggable="true" src={URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }))} type="application/pdf" width="100%" height="300px" />
                        ) : (
                            <div>No PDF found.</div>
                        )}
                    </foreignObject>
                    {isEditingBoard && <><circle
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
                            onClick={() => handleEditPdf(item.id)}
                        />
                        {editingImage && editingImage.id === item.id && <circle
                            cx="20"
                            cy="0"
                            r="8"
                            fill="green"
                            stroke="white"
                            strokeWidth="2"
                            style={{ cursor: 'pointer' }}
                            onClick={handleStopEditPdf}
                        />
                        }</>}
                </>
            }
        </>
    )
}
export default Pdf