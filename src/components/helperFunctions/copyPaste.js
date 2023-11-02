// // HTML
// // Play
// // Copy to Clipboard

// // < div class="source" contenteditable = "true" > Copy text from this box.</ >
// //     <div class="target" contenteditable="true">And paste it into this one.</div>

// // JavaScript
// // JS
// // Play
// // Copy to Clipboard

// const target = document.querySelector("div.target");

// target.addEventListener("paste", (event) => {
//     event.preventDefault();

//     let paste = (event.clipboardData || window.clipboardData).getData("text");
//     paste = paste.toUpperCase();
//     const selection = window.getSelection();
//     if (!selection.rangeCount) return;
//     selection.deleteFromDocument();
//     selection.getRangeAt(0).insertNode(document.createTextNode(paste));
//     selection.collapseToEnd();
// });



// // < !--The text field-- >
// // <input type="text" value="Hello World" id="myInput">

// //     <!-- The button used to copy the text -->
// //     <button onclick="myFunction()">Copy text</button>

// //     Step 2) Add JavaScript:
// //     Example
// function myFunction() {
//     // Get the text field
//     const copyText = document.getElementById("myInput");

//     // Select the text field
//     copyText.select();
//     copyText.setSelectionRange(0, 99999); // For mobile devices

//     // Copy the text inside the text field
//     navigator.clipboard.writeText(copyText.value);

//     // Alert the copied text
//     alert("Copied the text: " + copyText.value);
// }


const handleCopy = (e) => {
    let data = e.clipboardData.setData('Text');
    console.log(data)
};

const handlePaste = (e) => {
    let data = e.clipboardData.getData('Text');
    console.log(data)
};