import React from "react";

import Accordion from "./components/Accordion";

import "./styles.css";

const Documentation = () => {
  return (
    <div className="accordion-container">
      <Accordion title="What is your return policy?">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Accordion>
      <Accordion title="What is your return policy?">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. <br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </Accordion>
    </div>
  );
};

export default Documentation
