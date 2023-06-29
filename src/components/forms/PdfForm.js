import React, { useState, useEffect } from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const PdfForm = () => {
    const { items, setItems } = React.useContext(MoodboardContext);
    const [pdfId, setPdfId] = useState("")

    useEffect(() => {
        setPdfId(Date.now())
    }, [items])

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const arrayBuffer = reader.result;
                uploadToIndexedDB(arrayBuffer);
                const newItem = {
                    id: pdfId,
                    x: 0,
                    y: 0,
                    width: "100",
                    type: "pdf"
                };
                setItems((prevItems) => [...prevItems, newItem]);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const uploadToIndexedDB = (arrayBuffer) => {
        const request = indexedDB.open('vible-database', 1);
        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            db.createObjectStore('pdfs');
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction('pdfs', 'readwrite');
            const store = transaction.objectStore('pdfs');
            const uploadRequest = store.put(arrayBuffer, pdfId);

            uploadRequest.onsuccess = function () {
                setPdfId("")
                console.log('PDF uploaded successfully!');
            };

            uploadRequest.onerror = function () {
                console.error('Error uploading PDF.');
            };
        };

        request.onerror = function () {
            console.error('Error opening IndexedDB.');
        };
    };

    return (
        <div>
            <label className='custom-file-upload'>Add a Pdf file:</label>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </div>
    );
};

export default PdfForm;