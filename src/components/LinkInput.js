import React, { useState } from 'react';
import { sanitizeUrl } from '@braintree/sanitize-url';

function LinkInput({ onSubmit }) {
    const [url, setUrl] = useState('');

    function handleChange(event) {
        setUrl(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const sanitizedUrl = sanitizeUrl(url);
        if (sanitizedUrl) {
            onSubmit(sanitizedUrl);
            setUrl('');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={url} onChange={handleChange} />
            <button type="submit">Add Link</button>
        </form>
    );
}

export default LinkInput;
