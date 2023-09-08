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
        <button
          onClick={handleDocumentationToggle}
          className="toggle-documentation"
          title="Documentation"
        >
          ?
        </button>
        <div className='documentation-container'>
          <div className="accordion-container">
            <Accordion>

              <Accordion title="Drawing">
                <p><em>Click the drawing button at the top to start drawing or handwriting</em></p>
                <p>Choose a color and line width and start drawing</p>
              </Accordion>

              <Accordion title="Text box">
                <p>Click the text button at the top to add a text box</p>
              </Accordion>

              <Accordion title="Todo">
                <p><em>Click the todo button at the bottom right to reveal the todo pane</em></p>
                <p>Add todos</p>
                <p>Mark as complete</p>
                <p>Edit todo</p>
                <p>Change order with drap and drop</p>
                <p>Drag and drop todo on board</p>
              </Accordion>

              <Accordion title="Gallery">
                <p><em>Click the gallery button at the bottom left to reveal the gallery pane</em></p>
                <p><em>In the gallery ou can add color boxes, web links and upload images to add later to the board</em></p>
                <p>Select the type you want to add from the dropdown menu they will stay there.</p>
                <p>Later you can add these items to the board (add options to drag items to and from the gallery and add more types to the selection</p>

              </Accordion>

              <Accordion title="Add items">
                <p><em>Click the add item button at the top left to reveal the options</em></p>
                <p>Image file <strong>upload</strong> or drop-upload from desktop on <strong>drop zone</strong> or <strong>on
                  board</strong>. (data and file in localstorage)</p>
                <p><strong>Image link</strong> using <strong>input</strong> or select image on web page and <strong>drag</strong>
                  it to the board (may not work if it is a background image)</p>
                <p>Drag any <strong>selected text</strong> from any application page or web page to the board to add it as a text box (can I get a link to the web page the text came from? no need can get it from address bar)</p>
                <p>Drag the link from the address bar to the board to add a <strong>link</strong> to the web page</p>
                <p><strong>Drag a todo</strong> to the board to add it as a text box</p>
                <p><strong>Youtube video link</strong> just using the link code to embed the video on the board</p>
                <p>Drag the <strong>link from the address bar</strong> of a <strong>Youtube video</strong> to the board to embed the video on the board</p>
                <p>Add a <strong>Google map</strong> using the location coordinates</p>
                <p>Upload a <strong>pdf</strong> file (data in localstorage and file jn indexeddb buggy in safari)</p>
              </Accordion>

              <Accordion title="Controls">
                <p><strong>Theme</strong> switcher all buttons will get the selected color (resets with page refresh)</p>
                <p><strong>Print</strong> the board as pdf keeping the vector lines and text. (some items don't get printed or
                  look different)</p>
                <p><strong>Erase</strong> all board</p>
                <p><strong>Erase</strong> all lines</p>
                <p><strong>Download</strong> the board as a viblle.json file that you can upload to another browser page. Backup,
                  transfer or share.</p>
                <p><strong>Upload</strong> a saved board to add its content (may overlap with current content)</p>
                <p><strong>Zoom</strong> in, zoom out and reset zoom (resets when editing because zoomed out page complicates
                  editing) (zoom out may come in handy to print the whole board in one page)</p>
                <p>Zoom slider</p>


                <p><strong>Calculator:</strong></p>
                <p>Select and copy paste result to boardp (add option to make text box with result or whole operation)</p>


                <p><strong>Calendar</strong>:</p>
                <p>Clicking a date creates a new text box with the date</p>

              </Accordion>

              <Accordion title="Tools">
                <p>Eraser:</p>
                <p>Partial eraser:</p>
                <p>Lines group:</p>
              </Accordion>

              <Accordion title="Interactions">
                <p>Hovering over a line selects it</p>
                <p>You can straight away grab it and move it around or edit it</p>
                <p>Click and drag around any text box, image</p>
                <p>Double click to activate editing</p>
                <p>Click and drag around any video, map or pdf from its top bar</p>
                <p>Double click bar to activate editing</p>

              </Accordion>

              <Accordion title="Control buttons">
                <p><strong>Red</strong></p>
                <p><strong>Green</strong></p>
                <p><strong>Orange</strong></p>
              </Accordion>

              <Accordion title="Warnings">

              </Accordion>

              <Accordion title="Tool tips">
                <p>Click the "i" button at top to show a description next to each tool.</p>
              </Accordion>


              <Accordion title="Editing">

                <p><strong>Lines:</strong></p>
                <p>Color</p>
                <p>Width</p>
                <p>Size</p>
                <p>Angle</p>
                <p>Opacity</p>
                <p>Order</p>
                <p>Closed shape</p>
                <p>Fill color</p>
                <p>Dashed</p>
                <p>Arrow heads</p>

                <p><strong>Text boxes:</strong></p>
                <p>Text</p>
                <p>Font family</p>
                <p>Text size</p>
                <p>Text style</p>
                <p>Text color</p>
                <p>Text alignment</p>
                <p>Width</p>
                <p>Height</p>
                <p>Angle</p>
                <p>Drag resize and rotate</p>
                <p>Background color</p>
                <p>Border width and color</p>
                <p>Round corners</p>
                <p>Rating</p>

                <p><strong>Images:</strong></p>
                <p>Width</p>
                <p>Height</p>
                <p>Angle</p>
                <p>Drag resize and rotate</p>
                <p>Opacity</p>
                <p>Order</p>

                <p><strong>Videos:</strong></p>
                <p>Width</p>
                <p>Height</p>
                <p>Angle</p>
                <p>Drag resize and rotate</p>
                <p>Opacity</p>
                <p>Order?</p>

                <p><strong>Maps:</strong></p>
                <p>Width</p>
                <p>Height</p>
                <p>Angle</p>
                <p>Drag resize and rotate</p>
                <p>Opacity</p>
                <p>Order?</p>

                <p><strong>Pdfs:</strong></p>
                <p>Width</p>
                <p>Height</p>
                <p>Angle</p>
                <p>Drag resize and rotate</p>
                <p>Opacity</p>
                <p>Order?</p>


              </Accordion>
            </Accordion>

          </div>
        </div>
      </div>
    </>
  );
};

export default Documentation
