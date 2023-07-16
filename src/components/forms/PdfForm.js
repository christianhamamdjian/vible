import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const PdfForm = () => {
    const { handlePdfUpload } = React.useContext(MoodboardContext);

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handlePdfUpload} />
        </div>
    );
};

export default PdfForm;