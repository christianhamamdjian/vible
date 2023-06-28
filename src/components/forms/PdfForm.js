import React, { useState } from 'react';

const PdfForm = () => {
    const [pdfData, setPdfData] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function () {
                const arrayBuffer = reader.result;
                setPdfData(arrayBuffer);
                uploadToIndexedDB(arrayBuffer);
            };

            reader.readAsArrayBuffer(file);
        }
    };

    const uploadToIndexedDB = (arrayBuffer) => {
        const request = indexedDB.open('my-database', 1);

        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            db.createObjectStore('pdfs');
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction('pdfs', 'readwrite');
            const store = transaction.objectStore('pdfs');
            const uploadRequest = store.put(arrayBuffer, 'uploaded_pdf');

            uploadRequest.onsuccess = function () {
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
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            {pdfData && (
                <embed src={URL.createObjectURL(new Blob([pdfData], { type: 'application/pdf' }))} type="application/pdf" width="100%" height="600px" />
            )}
        </div>
    );
};

export default PdfForm;


// import React from 'react';
// // import DragDropUpload from "../Helpers/DragDropUpload"
// import { MoodboardContext } from "../../context/moodboardContext";

// const PdfForm = () => {
//     const { handlePdfUpload } = React.useContext(MoodboardContext);
//     return (
//         <div className='itemForms'>
//             <h2>Pdf:</h2>
//             {/* <div className='inputs'>
//                 <label className='custom-file-upload'>
//                     Add a Pdf file:
//                     <input
//                         type="file"
//                         accept="pdf"
//                         onChange={handlePdfUpload} />
//                 </label>
//             </div> */}

//             <div id="buttons">
//                 <button id="openButton">Create/Open DB</button>
//                 <button id="populateButton">Populate DB</button>
//                 <button id="displayButton">Display DB</button>
//                 <button id="deleteButton">Delete DB</button>
//             </div>
//             <div id="messages">
//                 <p>If the database does not exist, clicking <strong>Create/Open DB</strong> creates it. If the database already exists, clicking <strong>Create/Open DB</strong> opens it.</p>
//                 <p>Thus, you must click the <strong>Create/Open DB</strong> button before clicking the <strong>Populate DB</strong> button.</p>
//             </div>
//             <p>
//                 <input type="file" id="fileSelector" multiple size="24" />
//             </p>

//         </div>
//     )
// }
// export default PdfForm