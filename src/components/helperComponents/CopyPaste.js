const handleCopyClick = async (content) => {
    try {
        await navigator.clipboard.writeText(content);
        //alert('Text copied to clipboard');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

const handleGetClipboardContent = async () => {
    try {
        if (navigator.clipboard && typeof navigator.clipboard.readText === 'function') {
            const content = await navigator.clipboard.readText();
            return (JSON.parse(content))
        } else {
            alert('Clipboard access is not supported in this browser.');
        }
    } catch (err) {
        console.error('Failed to read clipboard content: ', err)
    }
}

const handleCopy = (e, id) => {
    if (!id) {
        const pathGroup = paths.filter(path => path.group === "activeGroup")
        const newPathGroup = pathGroup.map(path => ({ ...path, id: path.id + 1 }))
        setClipBoard(newPathGroup)

        handleCopyClick(newPathGroup)
    }
    if (id) {
        const copiedItem = items.find(el => el.id === id)
        setClipBoard(copiedItem)

        handleCopyClick(JSON.stringify(copiedItem))
    }
}

const handlePaste = () => {
    const clipBoardContent = handleGetClipboardContent()
    clipBoardContent.then(result => {
        const pastedItem = {
            ...result,
            id: Date.now(),
            board: activeBoard.id,
            x: 200,
            y: 200,
        }
        setItems(prevItems => [...prevItems, pastedItem])
    })
}