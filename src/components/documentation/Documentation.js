import React, { useState } from "react";
import vibleLlogo from "../../assets/logo512.png"
import Accordion from "./components/Accordion";
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


            <img style={{ width: "80px" }} src={vibleLlogo} alt="" />
            <h1>Vible</h1>
            <h2>A moodboard with some extras</h2>
            <p><strong>Vible</strong> stores anything you <strong>drop</strong> on it in your browser's memory, no external
              database is accessed so your board data lives only on the browser you use it on and will remain there as long as
              you don't erase it.</p>
            <p>Everything you add to the board is <strong>automatically saved</strong> and all changes are applied and saved
              instantly.</p>
            <p><strong>Boards</strong> can be <strong>printed</strong> and <strong>downloaded</strong> as a Pdf file.</p>
            <p><strong>Boards</strong> can also be <strong>saved</strong> in Json format for backup, sharing or transfer.</p>
            <p>The left-side <strong>add items</strong> panel shows forms to upload or embed images, videos, maps and pdf
              files</p>
            <p>Select <strong>text from web pages</strong> or applications windows an drag it to the board.</p>
            <p>Select and drag a <strong>Youtube</strong> or a <strong>Google maps</strong> (<a
              href="https://www.google.com/maps/">https://www.google.com/maps/</a>...) <strong>link from the address
                bar</strong> and drop it anywhere on the board to embed the video.</p>
            <p>Select and drag an image <strong>from a web page </strong>and it should show on the board. Note that not all images can
              be linked to.</p>
            <p>Click a <strong>calendar</strong> <strong>date</strong> to get a <strong>box</strong> with the date on the
              board.</p>
            <p>Write <strong>todos</strong>, <strong>drag</strong> them to <strong>reorder</strong> them. Edit them, or mark
              them as completed.</p>
            <p>You can also <strong>drag</strong> todos to the <strong>board</strong> with and expand on them. Completed todos
              will have a (<strong>complete</strong>) text on them.</p>
            <p><strong>Double click</strong> on the <strong>board</strong> will stop editing operations.</p>
            <p>To add a <strong>text box</strong> you can <strong>right click</strong> with the mouse to see a box appear at
              the cursor position.</p>
            <p>You can click the <strong>text tool</strong> at the top. Added todos, calendar dates, gallery color boxes and
              web links are all text boxes and can be edited the same way.</p>
            <p><strong>Double click</strong> a <strong>text box</strong> to modify its size, angle, color, border width,
              border color, text content, text color, text alignment, font family, font size, font style and corner roundness.
            </p>
            <p>Boxes can be <strong>reordered</strong> forward, backwars or brought to the front and sent to the back or
              <strong> duplicated</strong>.
            </p>
            <p>Show or hide the <strong>rating</strong> marks at the bottom right of the box.</p>
            <p>You can also add a <strong>web link</strong> that will show at the top of the box.</p>
            <p><strong>Grab</strong> a box or an image from any point on it to <strong>drag</strong> it around.</p>
            <p><strong>Grab</strong> videos, maps and pdfs from the top bar to <strong>drag</strong> them around. The item
              itself can be interacted with.</p>
            <p>The embedded videos, images, maps and pdfs can be <strong>resized</strong>, <strong>rotated</strong> and
              <strong> reordered</strong>.
            </p>
            <p>When you <strong>hover over any line</strong> it will get automatically <strong>selected</strong> so you can
              grab it and move it around or edit it.</p>
            <p>All drawn <strong>lines</strong> will show at the <strong>front</strong> of other objects, they can be
              <strong> dragged</strong> around, <strong>resized</strong> and <strong>rotated</strong>, <strong>dashed</strong>,
              have <strong>arrow heads</strong>, turn them into <strong>filled shapes</strong>, change their
              <strong> width</strong>, their <strong>color</strong>, their <strong>opacity,</strong> <strong>reorder </strong>
              them or <strong>duplicate</strong> them.
            </p>
            <p>To <strong>delete a line</strong> you can select it and press the <strong>delete key</strong> on your keyboard
              or click the <strong>delete option</strong> on the top form or use the <strong>eraser</strong>.</p>
            <p>When you click the <strong>edit board button</strong> at the top or <strong>double click </strong>a box or an
              <strong> image</strong> or the <strong>top bar</strong> or the other <strong>objects</strong> you will see a
              <strong> rotation handle</strong> on the left side and a <strong>resize handle</strong> at the bottom right that
              you can use to <strong>directly modify</strong> the selected item.
            </p>
            <p>The selected object will show three <strong>control buttons</strong> at the top left, the <strong>red </strong>
              one is to delete the object and will give you a <strong>confirmation</strong> <strong>warning</strong> as it is
              not reversible. The <strong>green</strong> button will activate the editing mode for the selected object and
              show the <strong>orange</strong> button, clicking the orange button it will stop the editing operation.</p>
            <p>You can use the <strong>drag eraser</strong> to remove whole lines or the <strong>partial eraser</strong> to
              erase only parts of them.</p>
            <p>When you use the eraser you can <strong>undo</strong> if you erased something by error.</p>
            <p>With the <strong>line group</strong> tool at the top one can drag over mutiple lines, their color will become
              <strong> red</strong> then you can <strong>grab</strong> one of them and <strong>drag</strong> the
              <strong> group</strong> around or resize and rotate it or change the lines width and color.
            </p>
            <p>Clicking the group button or double clicking the board will finish the grouping operation.</p>
            <p>You can change an <strong>image's opacity</strong> to be able to <strong>trace</strong> over it. </p>
            <p>Drawn lines
              are in <strong>vector format</strong> and can be edited later in a vector illustration application.</p>
            <p>You can use the <strong>erase all items</strong> or the <strong>erase all lines</strong> button on the right-side
              controls panel</p>
            <p>Mix <strong>vector freeform drawings</strong> and <strong>handwriting</strong> with <strong>typed
              text</strong>, <strong>uploaded images</strong>, <strong>linked images</strong>, <strong>Youtube
                videos</strong>, <strong>Google maps</strong> and <strong>Pdf files</strong>.</p>
            <p>On <strong>mobile devices</strong> you can add multiple <strong>Vible</strong> instances to the
              <strong> homescreen</strong> and use it as one of you apps.
            </p>
            <p>There is also a <strong>calculator</strong> that can come in handy. You can select the result and drag it to
              the board.</p>
            <p>In the <strong>gallery</strong> at the bottom you can add color boxes with color code, uplodad images and add
              web links that will all stay there and can be added later to the board.</p>
            <p>If you click the <strong>red delete button</strong> an object you will get a <strong>confirmation warning</strong> as that operation <strong>cannot be undone</strong>.
            </p>
            <p>When you <strong>upload</strong> a saved board in Json format it will be added as a new board. to the existing
              content so be careful to backup the existing content in its own Json file as some lines will be difficult to
              separate if the overlap.</p>
            <p>You can create and edit <strong>multiple boards</strong> using the <strong>Boards</strong> tool at the top.</p>
            <p>You can <strong>zoom</strong> in and out by <strong>clicking</strong> or using a <strong>slider</strong>.
              Zooming out permits to print more of the board content into one page.</p>
            <p>Set the <strong>board</strong> and <strong>buttons</strong> <strong>colors</strong> or choose from
              <strong> suggested colors</strong>.
            </p>
            <p>Clicking the <strong>(i) button</strong> at the top will show <strong>tool tips</strong> next to the buttons.
              Click the button again to hide them.</p>
            <p>You get access to the <strong>documentation</strong> using the (?) button at the top.</p>




            {/* <Accordion>

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
            </Accordion> */}

          </div>
        </div>
      </div>
    </>
  );
};

export default Documentation
