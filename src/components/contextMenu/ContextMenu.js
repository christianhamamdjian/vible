import React from "react";
import { useContextMenu } from "./useContextMenu"

const ContextMenu = ({ menu }) => {
    const { xPos, yPos, showMenu } = useContextMenu()
    return (
        <div
            defaultStyle={{ opacity: 0 }}
            style={{ opacity: !showMenu ? 0 : 1 }}
        >
            {(interpolatedStyle) => (
                <>
                    {showMenu ? (
                        <div
                            className="menu-container"
                            style={{
                                top: yPos,
                                left: xPos,
                                opacity: interpolatedStyle.opacity,
                            }}
                        >
                            {menu}
                        </div>
                    ) : (
                        <></>
                    )}
                </>
            )}
        </div>
    );
};
export default ContextMenu