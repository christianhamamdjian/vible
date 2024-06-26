import React from "react"
import './tooltips.css'

import { MoodboardContext } from "../../context/moodboardContext"

const Tooltips = ({ position, tipTop, tipLeft, text, children, width, height, top, bottom, left, right, marginRight, marginLeft }) => {
    const { info } = React.useContext(MoodboardContext)
    return (
        <>
            {position === "bottom" && children}
            <div
                className="tooltips-container"
            >
                <div
                    className={`${position === "top" ? "tooltip-top" : "tooltip-bottom"}`}
                    style={{ display: `${info ? "inline-block" : "none"}` }}
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
                            <span className="top-tip"
                                style={{
                                    top: tipTop,
                                    left: tipLeft
                                }}>
                            </span>
                        }
                        {text}{position === "top" &&
                            <span className="bottom-tip"
                                style={{
                                    top: tipTop,
                                    left: tipLeft
                                }}>
                            </span>}
                    </p>
                </div>
            </div >
            {position === "top" && children
            }
        </>
    )
}

export default Tooltips