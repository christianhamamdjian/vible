import React, { useState } from "react";
import LeftSideBar from "./LeftSideBar"
import RightSideBar from "./RightSideBar"

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
  <button
    className={`Drawer__toggle-${side}`}
    onClick={onClick}
  >
    {side === "left" ?
      <div style={{
        fontSize: "2rem",
        marginTop: "-.4rem",
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
);

const DrawerContents = ({ side }) => (
  <div
    className="DrawerContents__Container"
  >
    {side === "left" ? <LeftSideBar /> : <RightSideBar />}
  </div>
);

const Drawer = ({ isOpen, side }) => (
  <div
    className={`Drawer__Container--${side} ${isOpen ? `Drawer__${side}--isOpen` : ""}`}
  >
    <DrawerContents side={side} />
  </div>
);
export default SidebarDrawer