import React from 'react';

const MarkdownInput = ({ id, parent, index, markdown, onInputChange }) => {
    const handleInputChange = (event) => {
        onInputChange(event, id, index);
    };

    return (
        <textarea
            id={id}
            value={markdown}
            onChange={handleInputChange}
            placeholder={`Type your Markdown here (Editor ${id})...`}
            style={{ width: '100%', fontSize: '12px', padding: '10px' }}
        />
    );
};

export default MarkdownInput;
