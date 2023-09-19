import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const PdfForm = () => {
    const { handlePdfUpload, pdfUploadValue } = React.useContext(MoodboardContext);

    return (
        <div className='itemForms'>
            <h2>Upload a Pdf:</h2>
            <input
                type="file" accept="application/pdf"
                value={pdfUploadValue}
                onChange={handlePdfUpload}
            />
        </div>
    );
};

export default PdfForm;