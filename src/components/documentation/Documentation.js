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
            <li><strong>A moodboard and more</strong></li>
            <br />
            <h2>The Board</h2>
            <Accordion title="What Is Vible And Why You Would Use It?">
              <li><strong>Vible</strong> stores anything you <strong>drop</strong> on it in your browser's memory, no external database is accessed so your board data lives only on the browser you use it on and will remain there as long as you don't erase it.</li>
              <li>Mix <strong>vector freeform drawings</strong> and <strong>handwriting</strong> with <strong>typed text</strong>, <strong>uploaded images</strong>, <strong>linked images</strong>, <strong>Youtube videos</strong>, <strong>Google maps</strong> and <strong>Pdf files</strong>.</li>
              <li>Everything you add to the board is <strong>automatically saved</strong> and all changes are applied and saved instantly.</li>
              <li>On <strong>mobile devices</strong> you can add multiple <strong>Vible</strong> instances to the<strong> homescreen</strong> and use it as one of you apps. </li>
            </Accordion>

            <h2>The Left Add Items panel</h2>
            <Accordion title="Adding Items Using Drag And Drop, Upload Or Embed">
              <ul>
                <li>The left-side <strong>add items</strong> panel shows forms to upload or embed images, videos, maps and pdf files</li>

                <li>Select <strong>text from web pages</strong> or applications windows an drag it to the board.</li>

                <li>Drag the link from the address bar to the board to add a <strong>link</strong> to the web page</li>

                <li>Select and drag a <strong>Youtube</strong> or a <strong>Google maps</strong> (<a href="https://www.google.com/maps/">https://www.google.com/maps/</a>...) <strong>link from the address bar</strong> and drop it anywhere on the board to embed the video.</li>

                <li>Select and drag an image <strong>from a web page </strong>and it should show on the board. Note that not all images can be linked to.</li>

                <li><strong>Click the add item button at the top left to reveal the Upload Or Embed options</strong></li>

                <li>Image file <strong>upload</strong> or drop-upload from desktop on <strong>drop zone</strong> or <strong>on board</strong>.</li>

                <li><strong>Drag a todo</strong> to the board to add it as a text box</li>

                <li><strong>Youtube video link</strong> just using the link code to embed the video on the board</li>

                <li>Add a <strong>Google map</strong> using the location coordinates</li>

                <li>Upload a <strong>pdf</strong> file.</li>
              </ul>
            </Accordion>

            <Accordion title="The Images">
              <li>You can change an <strong>image's opacity</strong> to be able to <strong>trace</strong> over it. </li>
              <li>The images can be <strong>resized</strong>, <strong>rotated</strong> and <strong> reordered</strong>. </li>
            </Accordion>

            <Accordion title="The Videos">
              <li><strong>Click or touch</strong> videos to <strong>drag</strong> them around. The item itself can be interacted with.</li>
              <li>The embedded videos can be <strong>resized</strong>, <strong>rotated</strong> and <strong> reordered</strong>. </li>
            </Accordion>

            <Accordion title="The Maps">
              <li><strong>Click or touch</strong> maps from the top bar to <strong>drag</strong> them around. The item itself can be interacted with.</li>
              <li>The embedded maps can be <strong>resized</strong>, <strong>rotated</strong> and <strong> reordered</strong>. </li>
            </Accordion>

            <Accordion title="The Pdfs">
              <li><strong>Click or touch</strong> pdfs from the top bar to <strong>drag</strong> them around. The item itself can be interacted with.</li>
              <li>The embedded pdfs can be <strong>resized</strong>, <strong>rotated</strong> and <strong> reordered</strong>. </li>
            </Accordion>

            <h2>The Tools</h2>
            <Accordion title="The Lines">
              <li><strong>Click the pen button at the top to activate lines drawing.</strong></li>
              <li>When you <strong>hover over any line</strong> it will get automatically <strong>selected</strong> so you can click or touch it and move it around or edit it.</li>
              <li>All drawn <strong>lines</strong> will show at the <strong>front</strong> of other objects, they can be <strong> dragged</strong> around, <strong>resized</strong> and <strong>rotated</strong>, <strong>dashed</strong>, have <strong>arrow heads</strong>, turn them into <strong>filled shapes</strong>, change their <strong> width</strong>, their <strong>color</strong>, their <strong>opacity,</strong>  <strong>reorder </strong> them or <strong>duplicate</strong> them. </li>
              <li>To <strong>delete a line</strong> you can select it and press the <strong>delete key</strong> on your keyboard or click the <strong>delete option</strong> on the top form or use the <strong>eraser</strong>.</li>
              <li>Drawn lines are in <strong>vector format</strong> and can be edited later in a vector illustration application.</li>
              <li>You can use a tablet with a stylus with palm rejection.</li>
            </Accordion>

            <Accordion title="The Text Box">
              <li>To add a <strong>text box</strong> you can <strong>right click</strong> with the mouse to see a box appear at the cursor position.</li>
              <li>You can click the <strong>text tool</strong> at the top. Added todos, calendar dates, gallery color boxes and web links are all text boxes and can be edited the same way.</li>
              <li><strong>Double click</strong> a <strong>text box</strong> to modify its size, angle, color, border width, border color, text content, text color, text alignment, font family, font size, font style and corner roundness. </li>
              <li><strong>Click or touch</strong> a box or an image from any point on it to <strong>drag</strong> it around.</li>
              <li>Boxes can be <strong>reordered</strong> forward, backwars or brought to the front and sent to the back or <strong> duplicated</strong>. </li>
              <li>Show or hide the <strong>rating</strong> marks at the bottom right of the box.</li>
              <li>You can also add a <strong>web link</strong> that will show at the top of the box.</li>
              <li>Text boxes can be copied and pasted on the same board and between boards.</li>
            </Accordion>

            <Accordion title="The Erasers">
              <li>You can use the <strong>drag eraser</strong> to remove whole lines or the <strong>partial eraser</strong> to erase only parts of them.</li>
              <li>When you use the eraser you can <strong>undo</strong> if you erased something by error.</li>
            </Accordion>

            <Accordion title="Line Group Editing">
              <li>With the <strong>line group</strong> tool at the top one can drag over mutiple lines, their color will become <strong> red</strong> then you can <strong>click or touch</strong> one of them and <strong>drag</strong> the <strong> group</strong> around or resize and rotate it or change the lines width and color.</li>
              <li>Clicking the group button or double clicking the board will finish the grouping operation.</li>
            </Accordion>

            <Accordion title="Activating Editing">
              <li>The top edit button will activate editing on all items on the boards. </li>
              <li>Clicking <strong> the green button</strong> on top of an item will target the selected item and show its editing form at the top.</li>
              <li><strong>Double click</strong> on the <strong>board</strong> will stop editing operations.</li>
            </Accordion>

            <Accordion title="Adding And Editing Boards">
              <li>You can create and edit <strong>multiple boards</strong> using the <strong>Boards</strong> tool at the top.</li>
              <li>You can read the <strong> active board number</strong> on the <strong> Boards</strong> button at the top</li>
            </Accordion>


            <h2>The Right Controls Panel</h2>
            <Accordion title="The Board Colours">
              {/* <li>Set the <strong>board</strong> and <strong>buttons</strong> <strong>colors</strong> or choose from <strong> suggested colors</strong>. </li> */}
              <li>Set the <strong>board colors</strong>.Can be reset to original.</li>
            </Accordion>

            <Accordion title="Print, Download and Upload Boards">
              <li><strong>Boards</strong> can be <strong>printed</strong> and <strong>downloaded</strong> as a Pdf file.</li>
              <li><strong>Boards</strong> can also be <strong>saved</strong> in Json format for backup, sharing or transfer.</li>
              <li>When you <strong>upload</strong> a saved board in Json format it will be added as a new board to your existing set.</li>
            </Accordion>

            <Accordion title="Clearing Items Or Lines">
              <li>You can use the <strong>erase all items</strong> or the <strong>erase all lines</strong> button on the right-side controls panel</li>
            </Accordion>

            <Accordion title="Zooming">
              <li>You can <strong>zoom</strong> in and out by <strong>clicking</strong> or using a <strong>slider</strong>. Zooming out permits to print more of the board content into one page.</li>
            </Accordion>

            <Accordion title="The Calculator">
              <li><strong>Calculator:</strong></li>
              <li>There is also a <strong>calculator</strong> that can come in handy. You can select the result and drag it to the board.</li>
            </Accordion>

            <Accordion title="The Calendar">
              <li><strong>Calendar</strong>:</li>
              <li>Clicking a date creates a new text box with the date</li>
            </Accordion>

            <h2>The Todo Panel</h2>
            <Accordion title="Todo">
              <li><strong>Click the todo button at the bottom right to reveal the todo pane</strong></li>
              <li>Write <strong>todos</strong>, <strong>drag</strong> them to <strong>reorder</strong> them. Edit them, or mark
                them as completed.</li>
              <li>You can also <strong>drag</strong> todos to the <strong>board</strong> with and expand on them. Completed todos
                will have a (<strong>complete</strong>) text on them.</li>
            </Accordion>


            <h2>The Gallery Panel</h2>
            <Accordion title="Gallery">
              <li><strong>Click the gallery button at the bottom left to reveal the gallery pane</strong></li>
              <li><strong>In the gallery you can add color boxes that show the color code, web links and upload images.</strong></li>
              <li>Select the type you want to add from the dropdown menu they will remain there.</li>
              <li>Later you can add these items to the board (add options to drag items to and from the gallery and add more types to the selection</li>
            </Accordion>





            <h2>Working With The Board</h2>
            <Accordion title="Interactions">
              <li>Hovering over a line selects it</li>
              <li>You can straight away click or touch it and move it around or edit it</li>
              <li>Click and drag around any text box, image</li>
              <li>Double click to activate editing</li>
              <li>Click and drag around any video, map or pdf from its top bar</li>
              <li>Double click bar to activate editing</li>
            </Accordion>

            <Accordion title="The Control Buttons">
              <li>The selected object will show three <strong>control buttons</strong> at the top left, the <strong>red </strong> one is to delete the object and will give you a <strong>confirmation</strong> <strong>warning</strong> as it is not reversible. The <strong>green</strong> button will activate the editing mode for the selected object and show the <strong>orange</strong> button, clicking the orange button it will stop the editing operation.</li>
            </Accordion>

            <Accordion title="Warnings">
              <li>If you click the <strong>red delete button</strong> an object you will get a <strong>confirmation warning</strong> as that operation <strong>cannot be undone</strong>.</li>
            </Accordion>

            <Accordion title="Tool tips">
              <li>Clicking the <strong>(i) button</strong> at the top will show <strong>tool tips</strong> next to the buttons. Click the button again to hide them.</li>
              <li>You will also get an information popup when you hover over a button and wait.</li>
            </Accordion>

            <Accordion title="Editing items">
              <li>When you click the <strong>edit board button</strong> at the top or <strong>double click </strong>a box or an <strong> image</strong> or the <strong>top bar</strong> or the other <strong>objects</strong> you will see a <strong> rotation handle</strong> on the left side and a <strong>resize handle</strong> at the bottom right that you can use to <strong>directly modify</strong> the selected item. </li>

              <li><strong>The editing options by item:</strong></li>

              <li><strong>Lines:</strong></li>
              <li>Color</li>
              <li>Width</li>
              <li>Size</li>
              <li>Angle</li>
              <li>Opacity</li>
              <li>Order</li>
              <li>Closed shape</li>
              <li>Fill color</li>
              <li>Dashed</li>
              <li>Arrow heads</li>
              <li>Duplicate</li>
              <li>Copy and Paste</li>

              <li><strong>Text boxes:</strong></li>
              <li>Text content</li>
              <li>Font family</li>
              <li>Text size</li>
              <li>Text style</li>
              <li>Text color</li>
              <li>Text alignment</li>
              <li>Width</li>
              <li>Height</li>
              <li>Angle</li>
              <li>Drag resize and rotate</li>
              <li>Background color</li>
              <li>Border width and color</li>
              <li>Round corners</li>
              <li>Rating</li>
              <li>Duplicate</li>

              <li><strong>Images:</strong></li>
              <li>Width</li>
              <li>Height</li>
              <li>Angle</li>
              <li>Drag resize and rotate</li>
              <li>Opacity</li>
              <li>Cropping</li>
              <li>Round corners</li>
              <li>Order</li>
              <li>Duplicate</li>

              <li><strong>Videos:</strong></li>
              <li>Width</li>
              <li>Height</li>
              <li>Angle</li>
              <li>Drag resize and rotate</li>
              <li>Order</li>
              <li>Duplicate</li>

              <li><strong>Maps:</strong></li>
              <li>Width</li>
              <li>Height</li>
              <li>Angle</li>
              <li>Drag resize and rotate</li>
              <li>Order</li>
              <li>Duplicate</li>

              <li><strong>Pdfs:</strong></li>
              <li>Width</li>
              <li>Height</li>
              <li>Angle</li>
              <li>Drag resize and rotate</li>
              <li>Order</li>
              <li>Duplicate</li>

            </Accordion>

            {/* <h2>The Documentation</h2>
            <Accordion title="The Documentation">
              <li>You get access to the <strong>documentation</strong> using the (?) button at the top.</li>
            </Accordion> */}

          </div>
        </div>}
      </div>
    </>
  );
};

export default Documentation
