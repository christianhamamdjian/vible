import React, { useState } from "react";
import './drawer.css';

const SidebarDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => setIsOpen(!isOpen);

  return (
    <div className="App__Container">
      <div className="App__TitleBar">
        <DrawerButton onClick={toggleDrawer} />
      </div>
      <Drawer isOpen={isOpen} />
    </div>
  );
};

const DrawerButton = ({ onClick }) => (
  <div className="DrawerButton_Container noSelect" onClick={onClick}>
    Toggle Drawer
  </div>
);

const DrawerItem = ({ label }) => (
  <div className="DrawerItem__Container noSelect">{label}</div>
);

const DrawerContents = () => (
  <div className="DrawerContents__Container">
    <DrawerItem label="Item 1" />
    <DrawerItem label="Item 2" />
    <DrawerItem label="Item 3" />
    <DrawerItem label="Item 4" />
  </div>
);

const Drawer = ({ isOpen }) => (
  <div
    className={`Drawer__Container ${isOpen ? "Drawer__Container--isOpen" : ""}`}
  >
    <DrawerContents />
  </div>
);
export default SidebarDrawer