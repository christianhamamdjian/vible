import React, { useState, useEffect } from 'react';
import { isSafari } from "../utils/browserDetector"
import TopControls from "../helpers/TopControls"
import { MoodboardContext } from "../../context/moodboardContext";

const Pdf = ({ item }) => {
    const { handleRectPointerDown, handleRectPointerMove, handleRectPointerUp, handleEditItem } = React.useContext(MoodboardContext);

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
                        onTouchEnd={() => handleRectPointerUp(item.id)}
                    >
                        <div
                            //    className='pdf-top'
                            onDoubleClick={(e) => handleEditItem(e, item.id)}
                            style={{
                                potition: "absolute",
                                top: item.y,
                                left: item.x,
                                width: item.width,
                                height: item.width * 9 / 12,
                                backgroundColor: "#000000",
                                userSelect: "none",
                                borderRadius: "1rem 1rem 0 0"
                            }}
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
                                    style={{
                                        position: "absolute",
                                        top: isSafari ? item.y + 25 : "2rem",
                                        left: isSafari ? item.x : "0",
                                    }}
                                />
                            ) : (
                                <div>No PDF found.</div>
                            )}</div>
                    </foreignObject>
                    <TopControls item={item} />
                </>
            }
        </>
    )
}
export default Pdf