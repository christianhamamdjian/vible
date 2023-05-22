import React from 'react';

function ColorSelector({ onChange }) {
    const colors = [
        '#FF0000', // red
        '#00FF00', // green
        '#0000FF', // blue
        '#FFFF00', // yellow
        '#FF00FF', // magenta
        '#00FFFF', // cyan
    ];

    return (
        <div>
            {colors.map((color) => (
                <div
                    key={color}
                    style={{
                        display: 'inline-block',
                        width: '30px',
                        height: '30px',
                        backgroundColor: color,
                        margin: '5px',
                        cursor: 'pointer',
                    }}
                    onClick={() => onChange(color)}
                />
            ))}
        </div>
    );
}

export default ColorSelector;
