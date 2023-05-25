function handleDragStart(e) {
    e.dataTransfer.setData('text/plain', 'not_uploaded');
    // ....
}

img.addEventListener('dragstart', handleDragStart, false);

function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    /*If dragged from current page e.dataTransfer.getData("text/plain") will be "not_uploaded"*/
    if (e.dataTransfer.getData("text/plain") === "not_uploaded") {
        // do something
    } else {
        // do other thing
    }
}

el.addEventListener('drop', handleDrop, false);