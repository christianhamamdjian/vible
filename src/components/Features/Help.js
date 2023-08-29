import React from 'react'
import AccodionUnique from '../documentation/AccodionUnique'

const Help = () => {
    return (
        <div style={{ width: "160px", margin: "30px auto", overflowY: "auto", overflowX: "visible", listStylePosition: "inside" }}>
            <h3>Help:</h3>
            <p>Here are some tips about how to use <strong>Vible</strong>:</p>
            <ol>
                <li>Add a drawring</li>
                <li>Add a text box</li>

            </ol>
            <AccodionUnique />
        </div>
    )
}

export default Help