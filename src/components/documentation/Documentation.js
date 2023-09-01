import React, { useState } from "react";

import Accordion from "./components/Accordion";
// import Accordion from "./accordion/Accordion";
import "./styles.css";

const Documentation = () => {
  const [documentationShow, setDocumentationShow] = useState(false)
  const handleDocumentationToggle = () => {
    setDocumentationShow(documentationShow => !documentationShow)
  }
  return (
    <>
      <div className={` documentation ${documentationShow ? "documentation-show" : "documentation-hide"}`}>
        <button onClick={handleDocumentationToggle} className="toggle-documentation">?</button>
        <div className='documentation-container'>
          <div className="accordion-container">
            {/* <Accordion /> */}
            <Accordion title="Drawing">
              Click the drawing button at the top
              Choose a color and line width and start drawing
            </Accordion>
            <Accordion title="Text box">
              Click the text button at the top to add a text box
            </Accordion>
            <Accordion title="Todo">
              Click the todo button at the bottom right to reveal the todo pane
              Add todos
            </Accordion>
            <Accordion title="Gallery">
              <ul>
                <li>Click the gallery button at the bottom left to reveal the gallery pane</li>
                <li>Select the type you want to add from the dropdown menu they will stay there.</li>
                <li>Later you can add these items to the board (add options to drag items to and from the gallery and add more types to the selection</li>
              </ul>
            </Accordion>
            <Accordion title="Add items">
              Click the add item button at the top left to reveal the options

              Image upload or drop-upload from desktop on drop zone or on board.

              Image link using input or select image on web page and drag it to the board (may not work if it is a background image)

              Drag any selected text from any application page or web page to the biard to add it as a text box (can I get a link to the web page the text came from?)

              Drag the link from the address bar to the board to add a link to the web page

              Drag a todo to the board to add it as a text box

              Youtube video link just using the link code to embed the video on the board

              Drag the link from the address bar of a Youtube video to the board to embed the video on the board

              Add a Google map using the location coordinates
            </Accordion>
            <Accordion title="Controls">
              Theme switcher all buttons will get the selected color (resets with page refresh)

              Print the board as pdf keeping the vector lines

              Erase all board

              Erase all lines

              Download the board as a viblle.json file that you can upload to another browser page

              Upload a saved board to add its content (may overlap with current content)

              Zoom in, zoom out and reset zoom (resets when editing because zoomed out page complicates editing) (zoom out may come in handy to print the whole board in one page)

              Calculator:
              Select and copy paste result to boardp (add option to make text box with result or whole operation)

              Calendar:
              Clicking a date creates a new text box with the date
            </Accordion>
            <Accordion title="Editing">
              Lines:

              Text boxes:

              Images:

              Videos:

              Maps:

              Pdfs:

            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documentation
