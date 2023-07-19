import React from "react"
import './tooltips.css'

const Tooltips = ({ text }) => {
    return (
        <div style={{ textAlign: 'center', margin: '0' }}>
            <div className="custom-tooltip" >
                <span className="custom-tooltip-text" >
                    {text}
                </span>
            </div>
        </div>
    )
}

export default Tooltips


{/* <Tooltips text="Tooltip text content" /> */ }