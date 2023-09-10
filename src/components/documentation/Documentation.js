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
        {documentationShow && <div className='documentation-container'>
          <div className="accordion-container">
            <img style={{ width: "80px" }} src={vibleLlogo} alt="" />
            <br />
            {/* <h1>Vible</h1> */}
            <br />
            <p><strong>A moodboard and more</strong></p>
            <br />
            <h2>The Board</h2>
            <Accordion title="The Board">
              <p><strong>Vible</strong> stores anything you <strong>drop</strong> on it in your browser's memory, no external database is accessed so your board data lives only on the browser you use it on and will remain there as long as you don't erase it.</p>
              <p>Mix <strong>vector freeform drawings</strong> and <strong>handwriting</strong> with <strong>typed text</strong>, <strong>uploaded images</strong>, <strong>linked images</strong>, <strong>Youtube videos</strong>, <strong>Google maps</strong> and <strong>Pdf files</strong>.</p>
              <p>Everything you add to the board is <strong>automatically saved</strong> and all changes are applied and saved instantly.</p>
              <p>On <strong>mobile devices</strong> you can add multiple <strong>Vible</strong> instances to the<strong> homescreen</strong> and use it as one of you apps. </p>
            </Accordion>

            <Accordion title="Adding Items With Drag And Drop">
              <p>The left-side <strong>add items</strong> panel shows forms to upload or embed images, videos, maps and pdf files</p>
              <p>Select <strong>text from web pages</strong> or applications windows an drag it to the board.</p>
              <p>Select and drag a <strong>Youtube</strong> or a <strong>Google maps</strong> (<a href="https://www.google.com/maps/">https://www.google.com/maps/</a>...) <strong>link from the address bar</strong> and drop it anywhere on the board to embed the video.</p>
              <p>Select and drag an image <strong>from a web page </strong>and it should show on the board. Note that not all images can be linked to.</p>
            </Accordion>

            <h2>The Tools</h2>
            <Accordion title="The lines">
              <p><em>Click the pen button at the top to activate lines drawing.</em></p>
              <p>When you <strong>hover over any line</strong> it will get automatically <strong>selected</strong> so you can click or touch it and move it around or edit it.</p>
              <p>All drawn <strong>lines</strong> will show at the <strong>front</strong> of other objects, they can be <strong> dragged</strong> around, <strong>resized</strong> and <strong>rotated</strong>, <strong>dashed</strong>, have <strong>arrow heads</strong>, turn them into <strong>filled shapes</strong>, change their <strong> width</strong>, their <strong>color</strong>, their <strong>opacity,</strong>  <strong>reorder </strong> them or <strong>duplicate</strong> them. </p>
              <p>To <strong>delete a line</strong> you can select it and press the <strong>delete key</strong> on your keyboard or click the <strong>delete option</strong> on the top form or use the <strong>eraser</strong>.</p>
              <p>Drawn lines are in <strong>vector format</strong> and can be edited later in a vector illustration application.</p>
              <p>You can use a tablet with a stylus with palm rejection.</p>
            </Accordion>

            <Accordion title="The Text Box">
              <p>To add a <strong>text box</strong> you can <strong>right click</strong> with the mouse to see a box appear at the cursor position.</p>
              <p>You can click the <strong>text tool</strong> at the top. Added todos, calendar dates, gallery color boxes and web links are all text boxes and can be edited the same way.</p>
              <p><strong>Double click</strong> a <strong>text box</strong> to modify its size, angle, color, border width, border color, text content, text color, text alignment, font family, font size, font style and corner roundness. </p>
              <p><strong>Click or touch</strong> a box or an image from any point on it to <strong>drag</strong> it around.</p>
              <p>Boxes can be <strong>reordered</strong> forward, backwars or brought to the front and sent to the back or <strong> duplicated</strong>. </p>
              <p>Show or hide the <strong>rating</strong> marks at the bottom right of the box.</p>
              <p>You can also add a <strong>web link</strong> that will show at the top of the box.</p>
              <p>Text boxes can be copied and pasted on the same board and between boards.</p>
            </Accordion>

            <Accordion title="The Erasers">
              <p>You can use the <strong>drag eraser</strong> to remove whole lines or the <strong>partial eraser</strong> to erase only parts of them.</p>
              <p>When you use the eraser you can <strong>undo</strong> if you erased something by error.</p>
            </Accordion>

            <Accordion title="Line Group Editing">
              <p>With the <strong>line group</strong> tool at the top one can drag over mutiple lines, their color will become <strong> red</strong> then you can <strong>click or touch</strong> one of them and <strong>drag</strong> the <strong> group</strong> around or resize and rotate it or change the lines width and color.</p>
              <p>Clicking the group button or double clicking the board will finish the grouping operation.</p>
            </Accordion>

            <Accordion title="Activating Editing">
              <p>The top edit button will activate editing on all items on the boards. </p>
              <p>Clicking <strong> the green button</strong> on top of an item will target the selected item and show its editing form at the top.</p>
              <p><strong>Double click</strong> on the <strong>board</strong> will stop editing operations.</p>
            </Accordion>

            <Accordion title="Adding And Editing Boards">
              <p>You can create and edit <strong>multiple boards</strong> using the <strong>Boards</strong> tool at the top.</p>
              <p>You can read the <strong> active board number</strong> on the <strong> Boards</strong> button at the top</p>
            </Accordion>


            <h2>The Left Add Items panel</h2>
            <Accordion title="Adding items">
              <p><em>Click the add item button at the top left to reveal the options</em></p>
              <p>Image file <strong>upload</strong> or drop-upload from desktop on <strong>drop zone</strong> or <strong>on board</strong>. (data and file in localstorage)</p>
              <p><strong>Image link</strong> using <strong>input</strong> or select image on web page and <strong>drag</strong> it to the board (may not work if it is a background image)</p>
              <p>Drag any <strong>selected text</strong> from any application page or web page to the board to add it as a text box (can I get a link to the web page the text came from? no need can get it from address bar)</p>
              <p>Drag the link from the address bar to the board to add a <strong>link</strong> to the web page</p>
              <p><strong>Drag a todo</strong> to the board to add it as a text box</p>
              <p><strong>Youtube video link</strong> just using the link code to embed the video on the board</p>
              <p>Drag the <strong>link from the address bar</strong> of a <strong>Youtube video</strong> to the board to embed the video on the board</p>
              <p>Add a <strong>Google map</strong> using the location coordinates</p>
              <p>Upload a <strong>pdf</strong> file (data in localstorage and file jn indexeddb buggy in safari)</p>
            </Accordion>

            <Accordion title="The Images">
              <p>You can change an <strong>image's opacity</strong> to be able to <strong>trace</strong> over it. </p>
              <p>The images can be <strong>resized</strong>, <strong>rotated</strong> and <strong> reordered</strong>. </p>
            </Accordion>

            <Accordion title="The Videos">
              <p><strong>Click or touch</strong> videos to <strong>drag</strong> them around. The item itself can be interacted with.</p>
              <p>The embedded videos can be <strong>resized</strong>, <strong>rotated</strong> and <strong> reordered</strong>. </p>
            </Accordion>

            <Accordion title="The Maps">
              <p><strong>Click or touch</strong> maps from the top bar to <strong>drag</strong> them around. The item itself can be interacted with.</p>
              <p>The embedded maps can be <strong>resized</strong>, <strong>rotated</strong> and <strong> reordered</strong>. </p>
            </Accordion>

            <Accordion title="The Pdfs">
              <p><strong>Click or touch</strong> pdfs from the top bar to <strong>drag</strong> them around. The item itself can be interacted with.</p>
              <p>The embedded pdfs can be <strong>resized</strong>, <strong>rotated</strong> and <strong> reordered</strong>. </p>
            </Accordion>

            <h2>The Right Controls Panel</h2>
            <Accordion title="The Board Colours">
              <p>Set the <strong>board</strong> and <strong>buttons</strong> <strong>colors</strong> or choose from <strong> suggested colors</strong>. </p>
            </Accordion>

            <Accordion title="Print, Download and Upload Boards">
              <p><strong>Boards</strong> can be <strong>printed</strong> and <strong>downloaded</strong> as a Pdf file.</p>
              <p><strong>Boards</strong> can also be <strong>saved</strong> in Json format for backup, sharing or transfer.</p>
              <p>When you <strong>upload</strong> a saved board in Json format it will be added as a new board to your existing set.</p>
            </Accordion>

            <Accordion title="Clearing Items Or Lines">
              <p>You can use the <strong>erase all items</strong> or the <strong>erase all lines</strong> button on the right-side controls panel</p>
            </Accordion>

            <Accordion title="Zooming">
              <p>You can <strong>zoom</strong> in and out by <strong>clicking</strong> or using a <strong>slider</strong>. Zooming out permits to print more of the board content into one page.</p>
            </Accordion>

            <Accordion title="The Calculator">
              <p><strong>Calculator:</strong></p>
              <p>There is also a <strong>calculator</strong> that can come in handy. You can select the result and drag it to the board.</p>
            </Accordion>

            <Accordion title="The Calendar">
              <p><strong>Calendar</strong>:</p>
              <p>Clicking a date creates a new text box with the date</p>
            </Accordion>

            <h2>The Todo Panel</h2>
            <Accordion title="Todo">
              <p><em>Click the todo button at the bottom right to reveal the todo pane</em></p>
              <p>Write <strong>todos</strong>, <strong>drag</strong> them to <strong>reorder</strong> them. Edit them, or mark
                them as completed.</p>
              <p>You can also <strong>drag</strong> todos to the <strong>board</strong> with and expand on them. Completed todos
                will have a (<strong>complete</strong>) text on them.</p>
            </Accordion>


            <h2>The Gallery Panel</h2>
            <Accordion title="Gallery">
              <p><em>Click the gallery button at the bottom left to reveal the gallery pane</em></p>
              <p><em>In the gallery you can add color boxes that show the color code, web links and upload images.</em></p>
              <p>Select the type you want to add from the dropdown menu they will remain there.</p>
              <p>Later you can add these items to the board (add options to drag items to and from the gallery and add more types to the selection</p>
            </Accordion>


            <h2>The Documentation</h2>
            <Accordion title="The Documentation">
              <p>You get access to the <strong>documentation</strong> using the (?) button at the top.</p>
            </Accordion>


            <h2>Working With The Board</h2>
            <Accordion title="Interactions">
              <p>Hovering over a line selects it</p>
              <p>You can straight away click or touch it and move it around or edit it</p>
              <p>Click and drag around any text box, image</p>
              <p>Double click to activate editing</p>
              <p>Click and drag around any video, map or pdf from its top bar</p>
              <p>Double click bar to activate editing</p>
            </Accordion>

            <Accordion title="The Control Buttons">
              <p>The selected object will show three <strong>control buttons</strong> at the top left, the <strong>red </strong> one is to delete the object and will give you a <strong>confirmation</strong> <strong>warning</strong> as it is not reversible. The <strong>green</strong> button will activate the editing mode for the selected object and show the <strong>orange</strong> button, clicking the orange button it will stop the editing operation.</p>
            </Accordion>

            <Accordion title="Warnings">
              <p>If you click the <strong>red delete button</strong> an object you will get a <strong>confirmation warning</strong> as that operation <strong>cannot be undone</strong>.</p>
            </Accordion>

            <Accordion title="Tool tips">
              <p>Clicking the <strong>(i) button</strong> at the top will show <strong>tool tips</strong> next to the buttons. Click the button again to hide them.</p>
              <p>You will also get an information popup when you hover over a button and wait.</p>
            </Accordion>

            <Accordion title="Editing items">
              <p>When you click the <strong>edit board button</strong> at the top or <strong>double click </strong>a box or an <strong> image</strong> or the <strong>top bar</strong> or the other <strong>objects</strong> you will see a <strong> rotation handle</strong> on the left side and a <strong>resize handle</strong> at the bottom right that you can use to <strong>directly modify</strong> the selected item. </p>

              <p><strong>The editing options by item:</strong></p>

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
              <p>Duplicate</p>
              <p>Copy and Paste</p>

              <p><strong>Text boxes:</strong></p>
              <p>Text content</p>
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
              <p>Duplicate</p>

              <p><strong>Images:</strong></p>
              <p>Width</p>
              <p>Height</p>
              <p>Angle</p>
              <p>Drag resize and rotate</p>
              <p>Opacity</p>
              <p>Cropping</p>
              <p>Round corners</p>
              <p>Order</p>
              <p>Duplicate</p>

              <p><strong>Videos:</strong></p>
              <p>Width</p>
              <p>Height</p>
              <p>Angle</p>
              <p>Drag resize and rotate</p>
              <p>Order</p>
              <p>Duplicate</p>

              <p><strong>Maps:</strong></p>
              <p>Width</p>
              <p>Height</p>
              <p>Angle</p>
              <p>Drag resize and rotate</p>
              <p>Order</p>
              <p>Duplicate</p>

              <p><strong>Pdfs:</strong></p>
              <p>Width</p>
              <p>Height</p>
              <p>Angle</p>
              <p>Drag resize and rotate</p>
              <p>Order</p>
              <p>Duplicate</p>

            </Accordion>

          </div>
        </div>}
      </div>
    </>
  );
};

export default Documentation
