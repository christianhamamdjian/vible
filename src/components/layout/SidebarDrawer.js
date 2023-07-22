import React, { useState } from "react";
import LeftSideBar from "./LeftSideBar"
import RightSideBar from "./RightSideBar"
import Tooltips from '../tooltips/Tooltips'

const SidebarDrawer = ({ side }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <>
      <DrawerButton side={side} isOpen={isOpen} onClick={toggleDrawer} />
      <Drawer isOpen={isOpen} side={side} />
    </>
  )
}

const DrawerButton = ({ onClick, side, isOpen }) => (
  <>

    <button
      className={`drawer-toggle-${side}`}
      onClick={onClick}
    >
      {side === "left" ?

        <div style={{
          fontSize: "2rem",
          marginTop: "-.3rem",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          marginLeft: isOpen ? ".3rem" : "0"
        }}>
          +
        </div>
        :
        <div style={{
          fontSize: "2rem",
          transform: "rotate(90deg)",
          marginRight: "-1.3rem"
        }}>
          ...
        </div>
      }

    </button >
    <Tooltips
      position="bottom"
      width={`${side === "left" ? "5rem" : "5rem"}`}
      height={`${side === "left" ? "4.2rem" : "5rem"}`}
      top={`${side === "left" ? "-3rem" : "-3rem"}`}
      bottom={`${side === "left" ? "90%" : "90%"}`}
      left={`${side === "left" ? "5.5rem" : "-7rem"}`}
      right=""
      marginRight=""
      marginLeft=""
      tipTop={`${side === "left" ? "-.7rem" : "-.7rem"}`}
      tipLeft={`${side === "left" ? "20%" : "80%"}`}
      // style={{ margin: `${side === "left" ? "0 auto" : "0 auto"}` }} 
      text={`${side === "left" ? "Add items to your board!" : "Take control of your board!"}`}
    />
  </>
);

const DrawerContents = ({ side }) => (
  <div
    className="drawerContents-container"
  >
    {side === "left" ? <LeftSideBar /> : <RightSideBar />}
  </div>
);

const Drawer = ({ isOpen, side }) => (
  <div
    className={`drawer-container-${side} ${isOpen ? `drawer-${side}-isOpen` : ""}`}
  >
    <DrawerContents side={side} />
  </div>
);
export default SidebarDrawer