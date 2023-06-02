import React, { useState } from "react";
import LeftSideBar from "../layout/LeftSideBar"
import RightSideBar from "../layout/RightSideBar"
// import { MoodboardContext } from "../../context/moodboardContext";

const SidebarDrawer = ({ side }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);
  // const { toggleDrawer, isOpen, side } = React.useContext(MoodboardContext);
  return (
    <>
      <DrawerButton side={side} onClick={toggleDrawer} />
      <Drawer isOpen={isOpen} side={side} />
    </>
  );
};

const DrawerButton = ({ onClick, side }) => (
  <button
    className={`Drawer__toggle-${side}`}
    onClick={onClick}
  >
    {side === "left" ? "Tools" : "Controls"}
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