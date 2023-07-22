import React from "react"
import './tooltips.css'

import { MoodboardContext } from "../../context/moodboardContext"

const Tooltips = ({ position, tipTop, tipLeft, text, children, width, height, top, bottom, left, right, marginRight, marginLeft }) => {
    const { info } = React.useContext(MoodboardContext)
    console.log(info)
    return (
        <>
            {position === "bottom" && children}
            <div style={{
                textAlign: 'center', padding: "0", height: "2rem", zIndex: "100"
            }}>
                <div
                    className={`${position === "top" ? "tooltip-top" : "tooltip-bottom"}`}
                >
                    <p
                        className="custom-tooltip-text"
                        style={{
                            width: width,
                            height: height,
                            top: top,
                            bottom: bottom,
                            left: left,
                            right: right,
                            marginRight: marginRight,
                            marginLeft: marginLeft,
                            opacity: `${info ? "1" : "0"}`
                        }}>
                        {position === "bottom" &&
                            <span className="top-tip" style={{
                                top: tipTop,
                                left: tipLeft
                            }}>
                            </span>
                        }
                        {text}{position === "top" && <span className="bottom-tip" style={{ top: tipTop, left: tipLeft }}></span>}

                    </p>

                </div>
            </div >
            {position === "top" && children
            }
        </>
    )
}

export default Tooltips