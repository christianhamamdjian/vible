import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const PdfForm = () => {
    const { handlePdfUpload } = React.useContext(MoodboardContext);

    return (
        <div className='itemForms'>
            <h2>Upload a Pdf:</h2>
            <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
        </div>
    );
};

export default PdfForm;