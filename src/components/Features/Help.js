import React from 'react'
import Documentation from '../documentation/Documentation'

const Help = () => {
    return (
        <div style={{ width: "160px", margin: "30px auto", overflowY: "auto", overflowX: "visible", listStylePosition: "inside" }}>
            <h3>Help:</h3>
            {/* <p>Here are some tips about how to use <strong>Vible</strong>:</p>
            <ol>
                <li>Add a drawring</li>
                <li>Add a text box</li>

            </ol> */}
            <Documentation />
        </div>
    )
}

export default Help