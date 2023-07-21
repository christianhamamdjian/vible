import React from "react"
import './tooltips.css'

const Tooltips = ({ position, text, children }) => {
    return (
        <>
            {children}
            <div style={{ textAlign: 'center', margin: '0' }}>
                <div className={`${position === "top" ? "tooltip-top" : "tooltip-bottom"}`} >
                    <span className="custom-tooltip-text" >
                        {text}
                    </span>
                </div>
            </div>
        </>
    )
}

export default Tooltips


{/* <Tooltips text="Tooltip text content" /> */ }