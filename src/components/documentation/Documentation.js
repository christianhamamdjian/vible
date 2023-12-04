import React, { useState } from "react";
import vibleLlogo from "../../assets/logo512.png"
import Accordion from "./components/Accordion";
import { MoodboardContext } from "../../context/moodboardContext"

const Documentation = () => {
  const { getTextColor, activeBoard } = React.useContext(MoodboardContext)

  const [documentationShow, setDocumentationShow] = useState(false)
  const handleDocumentationToggle = () => {
    setDocumentationShow(documentationShow => !documentationShow)
  }
  const buttonsColor = activeBoard.buttonsColor
  return (
    <>
      <div className={` documentation ${documentationShow ? "documentation-show" : "documentation-hide"}`}>
        <button
          onClick={handleDocumentationToggle}
          className="toggle-documentation themable"
          style={{ backgroundColor: documentationShow ? "rgb(130, 70, 186)" : buttonsColor, color: getTextColor(buttonsColor) }}
          title="Documentation"
        >
          ?
        </button>
        {documentationShow && <div className='documentation-container'>
          <div className="accordion-container">
            <header className="docu-header">
              <img
                className="documentation-logo"
                //style={{ width: "80px" }} 
                src={vibleLlogo} alt="" />
              <h1 className="docu-title">A moodboard and more</h1>
            </header>
            <h2>The Board</h2>
            <Accordion title="What Is Vible And Why You Would Use It?">
              <ul>
                <li><strong>Vible</strong> stores anything you <strong>drop</strong> on it in your browser's memory, no external database is accessed so your board data lives only in the memory of the browser you use it on and will remain there as long as you don't erase it.</li>
                <li><strong>Notice!</strong> For a smoother experience use Chrome browsers and avoid using Vible on Safari browsers. If you must use Safari, any strange behaviour can be fixed by refreshing the web page. If you reach the bottom of a text box make sure to make it larger as scrolling doesn't work at the moment on Safari.</li>
                <li><strong>DISCLAMER!</strong> Although anything you create with Vible or add to its boards will only be visible on the web browser you are using when you created it and<strong> not on the website "vible.netlify.app"</strong> or on your other browsers this data will be visible to anyone who has access to your browser if you haven't deleted it or by any malicious code that can access your browser data. Using this version of Vible <strong>you should not enter</strong> any personal photos, private or sensitive information like passwords, bank-card numbers or personal or business details.</li>
                <li><strong>Vible</strong> can be useful when brainstorming ideas, comparing images from various sources, colours and typography when designing a layout, for rough illustration, doodles and handwriting, for planning a trip or as a tool for learning.</li>
                <li>Mix <strong>vector freeform drawings</strong> and <strong>handwriting</strong> with <strong>typed text</strong>, <strong>uploaded images</strong>, <strong>linked images</strong>, <strong>Youtube videos</strong>, <strong>Google maps</strong> and <strong>Pdf files</strong>.</li>
                <li>Everything you add to the board is <strong>automatically saved</strong> and all changes are applied and saved instantly.</li>
                <li>On <strong>mobile devices</strong> you can add multiple <strong>Vible</strong> instances to the<strong> homescreen</strong> and use it as one of you apps. </li>
              </ul>
            </Accordion>
            <Accordion title="Use Cases">
              <ul>
                <li>Drag images from your desktop to the board.</li>
                <li>Resize, crop, rotate, reorder or give them round corners.</li>
                <br />
                <li>Create a box by clicking the "Add Text" button at the top.</li>
                <li>Double click the box or click the edit button at the top and click the green button to target the box.</li>
                <li>Change its color by selecting a color using the eye dropper from the color picker over an image.</li>
                <li>Turn the box into a circle using the round corners tool.</li>
                <li>Change its opacity.</li>
                <li>Type the color formula.</li>
                <br />
                <li>Change the text font and resize it.</li>
                <li>Change its color and style.</li>
                <li>Change its border color and width.</li>
                <li>Activate the rating.</li>
                <li>Duplicate it and give the copy a different color.</li>
                <li>Give your favourite a higher rating.</li>
                <br />
                <li>Enter a location's coordinates in the Google maps tool on the left sidebar.</li>
                <li>Write a comment.</li>
                <li>Draw a line from the comment to the map.</li>
                <li>Make the line dashed and activate the arrow head.</li>
              </ul>
            </Accordion>
            <h2>The Left Add Items Panel</h2>
            <Accordion title="Adding Items Using Drag And Drop, Upload Or Embed">
              <ul>
                <li>The left-side <strong>add items</strong> panel shows forms to upload or embed images, videos, maps and pdf files.</li>

                <li>Select <strong>text from web pages</strong> or applications windows an drag it to the board.</li>

                <li>Drag the link from the address bar to the board to add a <strong>link</strong> to the web page.</li>

                <li>Select and drag a <strong>Youtube</strong> or a <strong>Google maps</strong> (<a href="https://www.google.com/maps/">https://www.google.com/maps/</a>...) <strong>link from the address bar</strong> and drop it anywhere on the board to embed the video.</li>

                <li>Select and drag an image <strong>from a web page </strong>and it should show on the board. Note that not all images can be linked to.</li>

                <li><strong>Click the add item button at the top left to reveal the Upload Or Embed options</strong>.</li>

                <li>Image file <strong>upload</strong> or drop-upload from desktop on <strong>drop zone</strong> or <strong>on board</strong>.</li>

                <li><strong>Drag a todo</strong> to the board to add it as a text box.</li>

                <li><strong>Youtube video link</strong> just using the link code to embed the video on the board.</li>

                <li>Add a <strong>Google map</strong> using the location coordinates.</li>

                <li>Upload a <strong>pdf</strong> file.</li>
              </ul>
            </Accordion>

            <Accordion title="The Images">
              <ul>
                <li>You can change an <strong>image's opacity</strong> to be able to <strong>trace</strong> over it. </li>
                <li>The images can be <strong>resized</strong>, <strong>rotated</strong> and <strong> reordered</strong>. </li>
              </ul>
            </Accordion>

            <Accordion title="The Videos">
              <ul>
                <li><strong>Click or touch</strong> videos to <strong>drag</strong> them around. The item itself can be interacted with.</li>
                <li>The embedded videos can be <strong>resized</strong>, <strong>rotated</strong> and <strong> reordered</strong>. </li>
              </ul>
            </Accordion>

            <Accordion title="The Maps">
              <ul>
                <li><strong>Click or touch</strong> maps from the top bar to <strong>drag</strong> them around. The item itself can be interacted with.</li>
                <li>The embedded maps can be <strong>resized</strong>, <strong>rotated</strong> and <strong> reordered</strong>. </li>
              </ul>
            </Accordion>

            <Accordion title="The Pdfs">
              <ul>
                <li><strong>Click or touch</strong> pdfs from the top bar to <strong>drag</strong> them around. The item itself can be interacted with.</li>
                <li>The embedded pdfs can be <strong>resized</strong>, <strong>rotated</strong> and <strong> reordered</strong>. </li>
              </ul>
            </Accordion>

            <h2>The Tools</h2>
            <Accordion title="The Lines">
              <ul>
                <li><strong>Click the pen button at the top to activate lines drawing.</strong></li>
                <li>When you <strong>hover over any line</strong> it will get automatically <strong>selected</strong> so you can click or touch it and move it around or edit it.</li>
                <li>All drawn <strong>lines</strong> will show at the <strong>front</strong> of other objects, they can be <strong> dragged</strong> around, <strong>resized</strong> and <strong>rotated</strong>, <strong>dashed</strong>, have <strong>arrow heads</strong>, turn them into <strong>filled shapes</strong>, change their <strong> width</strong>, their <strong>color</strong>, their <strong>opacity,</strong>  <strong>reorder </strong> them or <strong>duplicate</strong> them. </li>
                <li>To <strong>delete a line</strong> you can select it and press the <strong>delete key</strong> on your keyboard or click the <strong>delete option</strong> on the top form or use the <strong>eraser</strong>.</li>
                <li>Drawn lines are in <strong>vector format</strong> and can be edited later in a vector illustration application.</li>
                <li>You can use a tablet with a stylus with palm rejection.</li>
              </ul>
            </Accordion>

            <Accordion title="The Text Box">
              <ul>
                {/* <li>To add a <strong>text box</strong> you can <strong>right click</strong> with the mouse to see a box appear at the cursor position.</li> */}
                <li>You can click the <strong>text tool</strong> at the top. Added todos, calendar dates, gallery color boxes and web links are all text boxes and can be edited the same way.</li>
                <li><strong>Double click</strong> a <strong>text box</strong> to modify its size, angle, color, border width, border color, text content, text color, text alignment, font family, font size, font style and corner roundness. </li>
                <li><strong>Click or touch</strong> a box or an image from any point on it to <strong>drag</strong> it around.</li>
                <li>Boxes can be <strong>reordered</strong> forward, backwars or brought to the front and sent to the back or <strong> duplicated</strong>. </li>
                <li>Show or hide the <strong>rating</strong> marks at the bottom right of the box.</li>
                <li>You can also add a <strong>web link</strong> that will show at the top of the box.</li>
                <li>Text boxes can be copied and pasted on the same board and between boards. While editing the box you have the option to copy it, a paste button will appear at the top, navigate to another board and paste it or click the (x) sign at the bottom of the button to erase the clipboard content. </li>
              </ul>
            </Accordion>

            <Accordion title="The Erasers">
              <ul>
                <li>You can use the <strong>drag eraser</strong> to remove whole lines or the <strong>partial eraser</strong> to erase only parts of them.</li>
                <li>When you use the eraser you can <strong>undo</strong> if you erased something by error.</li>
              </ul>
            </Accordion>

            <Accordion title="Line Group Editing">
              <ul>
                <li>With the <strong>line group</strong> tool at the top one can drag over mutiple lines, their color will become <strong> red</strong> then you can <strong>click or touch</strong> one of them and <strong>drag</strong> the <strong> group</strong> around or resize and rotate it or change the lines width and color.</li>
                <li>Clicking the group button or double clicking the board will finish the grouping operation.</li>
              </ul>
            </Accordion>

            <Accordion title="Activating Items Editing">
              <ul>
                <li>The top edit button will activate editing on all items on the boards. </li>
                <li>Clicking <strong> the green button</strong> on top of an item will target the selected item and show its editing form at the top.</li>
                <li><strong>Double click</strong> on the <strong>board</strong> will stop editing operations.</li>
              </ul>
            </Accordion>

            <Accordion title="Adding And Editing Boards">
              <ul>
                <li>You can create and edit <strong>multiple boards</strong> using the <strong>Boards</strong> tool at the top.</li>
                <li>You can read the <strong> active board number</strong> on the <strong> Boards</strong> button at the top</li>
              </ul>
            </Accordion>


            <h2>The Right Controls Panel</h2>
            <Accordion title="The Board Colours">
              <ul>
                {/* <li>Set the <strong>board</strong> and <strong>buttons</strong> <strong>colors</strong> or choose from <strong> suggested colors</strong>. </li> */}
                <li>Set the <strong>board background colour</strong> and <strong>the buttons colour</strong>. Colours can be reset to original.</li>
              </ul>
            </Accordion>

            <Accordion title="Print, Download and Upload Boards">
              <ul>
                <li><strong>Boards</strong> can be <strong>printed</strong> and <strong>downloaded</strong> as a Pdf file.</li>
                <li><strong>Boards</strong> can also be <strong>saved</strong> in Json format for backup, sharing or transfer.</li>
                <li>When you <strong>upload</strong> a saved board in Json format it will be added as a new board to your existing set.</li>
              </ul>
            </Accordion>

            <Accordion title="Clearing Items Or Lines">
              <ul>
                <li>You can use the <strong>erase all items</strong> or the <strong>erase all lines</strong> button on the right-side controls panel</li>
              </ul>
            </Accordion>

            <Accordion title="Zooming">
              <ul>
                <li>You can <strong>zoom</strong> in and out by <strong>clicking</strong> or using a <strong>slider</strong>. Zooming out permits to print more of the board content into one page.</li>
              </ul>
            </Accordion>

            <Accordion title="The Calculator">
              <ul>
                <li>There is also a <strong>calculator</strong> that can come in handy. You can select the result and drag it to the board.</li>
              </ul>
            </Accordion>

            <Accordion title="The Calendar">
              <ul>
                <li>Clicking a date creates a new text box with that date in it.</li>
              </ul>
            </Accordion>

            <h2>The Todo Panel</h2>
            <Accordion title="Using Todos">
              <ul>
                <li><strong>Click the todo button at the bottom right to reveal the todo pane</strong></li>
                <li>Write <strong>todos</strong>, <strong>drag</strong> them to <strong>reorder</strong> them. Edit them, or mark
                  them as completed.</li>
                <li>You can also <strong>drag</strong> todos to the <strong>board</strong> with and expand on them. Completed todos
                  will have a (<strong>complete</strong>) text on them.</li>
              </ul>
            </Accordion>


            <h2>The Gallery Panel</h2>
            <Accordion title="Using The Gallery">
              <ul>
                <li><strong>Click the gallery button at the bottom left to reveal the gallery pane.</strong></li>
                <li><strong>In the gallery you can add color boxes that show the color code, web links and upload images.</strong></li>
                <li>Select the type you want to add from the dropdown menu they will remain there.</li>
                <li>Later you can add these items to the board (add options to drag items to and from the gallery and add more types to the selection.</li>
              </ul>
            </Accordion>





            <h2>Working With The Board</h2>
            <Accordion title="Interactions">
              <ul>
                <li>Hovering over a line selects it.</li>
                <li>You can straight away click or touch it and move it around or edit it.</li>
                <li>Click and drag around any text box, image.</li>
                <li>Double click to activate editing.</li>
                <li>Click and drag around any video, map or pdf from its top bar.</li>
                <li>Double click bar to activate editing.</li>
              </ul>
            </Accordion>

            <Accordion title="The Control Buttons">
              <ul>
                <li>The selected object will show three <strong>control buttons</strong> at the top left, the <strong>red </strong> one is to delete the object and will give you a <strong>confirmation</strong> <strong>warning</strong> as it is not reversible. The <strong>green</strong> button will activate the editing mode for the selected object and show the <strong>orange</strong> button, clicking the orange button it will stop the editing operation.</li>
              </ul>
            </Accordion>

            <Accordion title="Warnings">
              <ul>
                <li>If you click the <strong>red delete button</strong> an object you will get a <strong>confirmation warning</strong> as that operation <strong>cannot be undone</strong>.</li>
              </ul>
            </Accordion>

            <Accordion title="Tool Tips">
              <ul>
                <li>Clicking the <strong>(i) button</strong> at the top will show <strong>tool tips</strong> next to the buttons. Click the button again to hide them.</li>
                <li>You will also get an information popup when you hover over a button and wait.</li>
              </ul>
            </Accordion>

            <Accordion title="Editing Items">
              <ul>
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
              </ul>
            </Accordion>



            {/* <h2>The Documentation</h2>
            <Accordion title="The Documentation">
              <li>You get access to the <strong>documentation</strong> using the (?) button at the top.</li>
            </Accordion> */}

          </div>
          <p className="copyright" >&copy; Christian Hamamdjian 2023</p>
        </div>}

      </div>

    </>
  );
};

export default Documentation
