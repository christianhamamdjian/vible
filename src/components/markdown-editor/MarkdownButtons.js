import React from 'react';

const MarkdownButtons = ({ id, parent, onStyleClick, index }) => {
    const handleStyle = (tag) => {
        onStyleClick(id, tag, index, parent);
    };
    const buttonStyle = {
        backgroundColor: '#000000',
        fontSize: ".8rem",
        fontWeight: "bold",
        color: 'white',
        border: 'none',
        padding: '2px 10px',
        margin: '5px',
        cursor: 'pointer',
        borderRadius: '3px',
    };
    return (
        <div style={{ marginTop: '10px', padding: '5px' }}>
            <button style={buttonStyle} onClick={() => handleStyle('**')}><strong>B</strong></button>
            <button style={buttonStyle} onClick={() => handleStyle('_')}><em>I</em></button>
            {/* <button style={buttonStyle} onClick={() => handleStyle('`')}><code>C</code></button> */}
            <button style={buttonStyle} onClick={() => handleStyle('~~')}><del>D</del></button>
            <button style={buttonStyle} onClick={() => handleStyle('- ')}><ul style={{ marginLeft: ".6rem" }}><li>-</li></ul></button>
            {/* <button style={buttonStyle} onClick={() => handleStyle('1. ')}><ol style={{ marginLeft: ".6rem" }}><li>-</li></ol></button> */}
            <button style={buttonStyle} onClick={() => handleStyle('=')}><ins>U</ins></button>
        </div>
    );
};

export default MarkdownButtons;
