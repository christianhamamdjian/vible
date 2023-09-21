import React, { useState, useContext } from "react";
import LeftSideBar from "./LeftSideBar"
import RightSideBar from "./RightSideBar"
import Tooltips from '../tooltips/Tooltips'
import { MoodboardContext } from "../../context/moodboardContext";

const SidebarDrawer = ({ side }) => {
  const { image, imageLink, video, map, pdf, activeBoard, getTextColor } = useContext(MoodboardContext)
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  const buttonsColor = activeBoard.buttonsColor

  return (
    <>
      <DrawerButton buttonsColor={buttonsColor} side={side} isOpen={isOpen} onClick={toggleDrawer} getTextColor={getTextColor} />
      <Drawer image={image} imageLink={imageLink} video={video} map={map} pdf={pdf} isOpen={isOpen} side={side} />
    </>
  )
}

const DrawerButton = ({ onClick, side, isOpen, buttonsColor, getTextColor }) => (
  <>

    <button
      className={`drawer-toggle-${side} themable`}
      style={{ backgroundColor: isOpen ? "rgb(130, 70, 186)" : buttonsColor, color: `${getTextColor(buttonsColor)}` }}
      title={`${side === "left" ? "Add items" : "Control panel"}`}
      onClick={onClick}
    >
      {side === "left" ?

        <div
          style={{
            fontSize: "2rem",
            marginTop: "-.3rem",
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            marginLeft: isOpen ? ".3rem" : "0"
          }}>
          +
        </div>
        :
        <div
          style={{
            fontSize: "2rem",
            transform: "rotate(90deg)",
            marginRight: "-1.3rem"
          }}>
          ...
        </div>
      }
      <Tooltips
        position="bottom"
        width={`${side === "left" ? "4rem" : "4rem"}`}
        height={`${side === "left" ? "4.5rem" : "4.5rem"}`}
        top={`${side === "left" ? "-6.3rem" : "-6.5rem"}`}
        bottom={`${side === "left" ? "90%" : "90%"}`}
        left={`${side === "left" ? ".3rem" : "0rem"}`}
        right=""
        marginRight=""
        marginLeft=""
        tipTop={`${side === "left" ? "-.7rem" : "-.7rem"}`}
        tipLeft={`${side === "left" ? "45%" : "55%"}`}
        text={`${side === "left" ? "Add items to your board" : "Take control of your board"}`}
      />
    </button >

  </>
);

const DrawerContents = ({ side }) => (
  <div
    className={`${side === "left" ? "drawerContents-container-left" : "drawerContents-container-right"}`}
  >
    {side === "left" ? <LeftSideBar /> : <RightSideBar />}
  </div>
);

const Drawer = ({ isOpen, side, image, imageLink, video, map, pdf }) => (
  <div
    className={`drawer-container-${side} ${isOpen ? `drawer-${side}-isOpen` : ""} ${isOpen && (image || imageLink || video || map || pdf) ? `drawer-${side}-isMoreOpen` : ""}`}
  >
    {isOpen && side && <DrawerContents side={side} />}
  </div>
)

export default SidebarDrawer