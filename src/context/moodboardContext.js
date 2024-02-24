import React, { useState, useEffect, useRef, createContext } from "react"
import { useLocalStorage } from "../components/hooks/useLocalStorage"
import getTextColor from "../components/utils/getTextColor"
import partialErase from "../components/helperFunctions/partialErase"
import { loadPathsFromLocalStorage, getCenterPoint, rotatePath, scalePath } from "../components/helperFunctions/pathOperations"
import { handlePdfDelete } from "../components/helperFunctions/itemsOperations"
import boxModel from "../models/box-model"
import imageModel from "../models/image-model"
//import imageLinkModel from "../models/imageLink-model"
import videoModel from "../models/video-model"
import mapModel from "../models/map-model"
import pdfModel from "../models/pdf-model"
import { quotes } from "../data/quotes_data.js"

const MoodboardContext = createContext()

export default function MoodboardProvider({ children }) {
    const [boards, setBoards] = useLocalStorage("boards", [{ id: Date.now(), name: 1, boardColor: "#ffffff", buttonsColor: "#ffffff", boardBackground: "plainColour" }])
    const [activeBoard, setActiveBoard] = useLocalStorage("activeBoard", { ...boards[0] })
    const [boardIndex, setBoardIndex] = useState(0)

    const [paths, setPaths] = useState(loadPathsFromLocalStorage() || [])
    const [tempPath, setTempPath] = useState(null)
    const [savedItems, setSavedItems] = useLocalStorage("items", [])
    const [items, setItems] = useState([])
    const [galleryItems, setGalleryItems] = useLocalStorage("galleryItems", [])

    const [isDrawing, setIsDrawing] = useState(false)
    const [drawing, setDrawing] = useState(false)
    const [isEditingPath, setIsEditingPath] = useState(null)
    const [isEditingPaths, setIsEditingPaths] = useState(false)
    const [isErasing, setIsErasing] = useState(false)
    const [isPartialErasing, setIsPartialErasing] = useState(false)
    const [dragErasing, setDragErasing] = useState(false)
    const [dragPartialErasing, setDragPartialErasing] = useState(false)
    const [isGrouping, setIsGrouping] = useState(false)
    const [dragGrouping, setDragGrouping] = useState(false)
    const [groupDragging, setGroupDragging] = useState(false)

    const [pathColor, setPathColor] = useState('#000000')
    const [pathLine, setPathLine] = useState(4)
    const [rotation, setRotation] = useState([])
    const [scaling, setScaling] = useState([])
    const [selectedPath, setSelectedPath] = useState(null)

    const [itemText, setItemText] = useState('Text ...')
    const [itemColor, setItemColor] = useState('#f4b416')
    const [itemLink, setItemLink] = useState('')
    const [itemUrl, setItemUrl] = useState('')
    const [itemVideoUrl, setItemVideoUrl] = useState('')
    const [itemImageUrl, setItemImageUrl] = useState('')
    const [itemMapUrl, setItemMapUrl] = useState('')

    const [editingItem, setEditingItem] = useState(null)
    const [editingText, setEditingText] = useState(null)
    const [editingImage, setEditingImage] = useState(null)
    const [editingImageLink, setEditingImageLink] = useState(null)
    const [editingVideo, setEditingVideo] = useState(null)
    const [editingMap, setEditingMap] = useState(null)
    const [editingPdf, setEditingPdf] = useState(null)

    const [todosShow, setTodosShow] = useState(false)

    const [draw, setDraw] = useState(false)
    const [write, setWrite] = useState(false)
    const [image, setImage] = useState(false)
    const [imageLink, setImageLink] = useState(false)
    const [video, setVideo] = useState(false)
    const [map, setMap] = useState(false)
    const [pdf, setPdf] = useState(false)

    const [imageUploadValue, setImageUploadValue] = useState("")
    const [pdfUploadValue, setPdfUploadValue] = useState("")

    const [clipBoard, setClipBoard] = useState(null)
    const [zoom, setZoom] = useState(10000)
    const [isEditingBoard, setIsEditingBoard] = useState(false)

    const [draggingSvg, setDraggingSvg] = useState(false)
    const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 })
    const [svgOffset, setSvgOffset] = useState({ x: 0, y: 0 })
    const [svgSize, setSvgSize] = useState({ width: 0, height: 0 })
    const [selectedRectId, setSelectedRectId] = useState(null)
    const [rectOffsets, setRectOffsets] = useState({})

    const [initialDistance, setInitialDistance] = useState(null);

    const [isResizing, setIsResizing] = useState(false)
    const [mousedownPoints, setMousedownPoints] = useState({ x: 0, y: 0 })
    const [rectangleSize, setRectangleSize] = useState({ width: 100, height: 100 })
    const [resizeIconPosition, setResizeIconPosition] = useState({ x: 0, y: 0 })
    const [isDraggingRect, setIsDraggingRect] = useState(false)

    const [isRotating, setIsRotating] = useState(false)
    const [angleOffset, setAngleOffset] = useState({ x: 0, y: 0 })

    const [info, setInfo] = useState(false)
    const [showBoards, setShowBoards] = useState(false)

    const [pdfId, setPdfId] = useState("")

    const [selectedStars, setSelectedStars] = useState(0)

    const [errorMessage, setErrorMessage] = useState('');

    const [historyErase, setHistoryErase] = useState([])
    const [positionErase, setPositionErase] = useState(0);

    const [tool, setTool] = useState("")

    const divRef = useRef(null)
    const svgRef = useRef(null)
    const itemRef = useRef(null)
    const pathRef = useRef(null)

    useEffect(() => {
        loadPathsFromLocalStorage()
        setHistoryErase((prevHistory) => [...prevHistory, { paths: paths }])
        setItems(savedItems)
        updateButtonColors()
    }, [])

    useEffect(() => {
        setSavedItems(items)
        setPdfId(Date.now())
    }, [items])

    useEffect(() => {
        savePathsToLocalStorage()
    }, [paths])

    useEffect(() => {
        updateColors()
    }, [boards, activeBoard])

    const handleShowBoards = () => {
        setShowBoards(showBoards => !showBoards)
        setIsDrawing(false)
        setIsErasing(false)
        setIsPartialErasing(false)
        setIsGrouping(false)
        setIsEditingBoard(false)
        setEditingItem(null)
        setEditingText(null)
        setIsEditingPath(null)
        setIsEditingPaths(false)
        setSelectedPath(null)
        setEditingImage(null)
        setEditingImageLink(null)
        setEditingVideo(null)
        setEditingMap(null)
        setEditingPdf(null)

        setDraw(false)
        setWrite(false)
        setImage(false)
        setImageLink(false)
        setVideo(false)
        setMap(false)
        setPdf(false)
    }

    function getRandomQuote(e) {
        e.preventDefault()
        const randomQuote = Math.floor(Math.random() * quotes.length)
        const chosenQuote = quotes[randomQuote]["quote"]
        const itemId = Date.now()
        const newItem = boxModel(itemId, activeBoard.id, chosenQuote, "#E279D9", "#ffffff", itemLink, itemUrl)
        setItems((prevItems) => [...prevItems, newItem])
        setItemText('Text')
        setItemColor('#f4b416')
    }

    function savePathsToLocalStorage() {
        const savingPaths = paths.map((path) => {
            return ({ ...path, path: [`M${path["path"].map((point) => `${point.x} ${point.y}`).join(' L')}`] })
        })
        localStorage.setItem('paths', JSON.stringify(savingPaths))
    }


    const changeTool = (tool) => {
        setTool(tool)
    }
    const handleCopy = (e, id) => {
        if (!id) {
            const pathGroup = paths.filter(path => path.group === "activeGroup")
            const newPathGroup = pathGroup.map(path => ({ ...path, id: path.id + 1 }))
            setClipBoard(newPathGroup)
        }
        if (id) {
            const copiedItem = items.find(el => el.id === id)
            setClipBoard(copiedItem)
        }
    }
    const handlePaste = () => {
        if (clipBoard.length) {
            const newPaths = clipBoard.map(path => ({ ...path, board: activeBoard.id }))
            setPaths(prevPaths => [...prevPaths, ...newPaths])
        }
        const pastedItem = {
            ...clipBoard,
            id: Date.now(),
            board: activeBoard.id,
            x: 200,
            y: 200,
        }
        setItems(prevItems => [...prevItems, pastedItem])
    }
    const handleClearClipBoard = (e) => {
        e.stopPropagation()
        setClipBoard(null)
    }
    const handleChangeBoard = (boardId) => {
        const toUpdate = boards.find((el) => el.id === boardId)
        setActiveBoard(toUpdate)
        setHistoryErase([])
        setPositionErase(0)
        setHistoryErase((prevHistory) => [...prevHistory, { paths: paths }])
    }

    const handleAddNewBoard = () => {
        const newId = Date.now()
        const newBoard = { id: newId, name: boards.length + 1, boardColor: "#ffffff", buttonsColor: "#ffffff", boardBackground: "plainColour" }
        setBoards(prevBoards => [...prevBoards, newBoard])
        setActiveBoard(newBoard)
        setBoardIndex(parseInt(boards.length / 2))
        setHistoryErase([])
        setPositionErase(0)
        setHistoryErase((prevHistory) => [...prevHistory, { paths: paths }])
    }
    const handleBoardIndexUpdate = (index) => {
        setBoardIndex(index)
    }
    const handleDeleteBoard = (chunkContent) => {
        if (chunkContent.length - 1 === 0) {
            setBoardIndex(boardIndex - 1)
        }
        const newBoards = boards.filter((el) => el.id !== activeBoard.id)
        const newItems = items.filter((el) => el.board !== activeBoard.id)
        const newPaths = paths.filter((el) => el.board !== activeBoard.id)
        setItems(newItems)
        setPaths(newPaths)
        if (boards.length === 1) {
            handleAddNewBoard()
            setActiveBoard(boards[0])
        }
        if (boards.length > 1 && boardIndex === 0) {
            setActiveBoard(boards[0])
        }
        if (boards.length > 1 && boardIndex !== 0) {
            setActiveBoard(boards[0])
        }
        const reorderedBoards = newBoards.map((el, index) => ({ ...el, name: index + 1 }))
        setBoards(reorderedBoards)

        setHistoryErase([])
        setPositionErase(0)
        setHistoryErase((prevHistory) => [...prevHistory, { paths: paths }])
    }

    const handleBoardColorChange = (e) => {
        const newColor = e.target.value
        setBoards(prevBoards =>
            prevBoards.map(board => {
                if (board.id === activeBoard.id) {
                    return { ...board, boardColor: newColor }
                }
                return board
            })
        )
        setActiveBoard({ ...activeBoard, boardColor: newColor })
        let board = document.getElementById("board-svg")
        board.style.backgroundColor = newColor
    }

    const handleButtonsColorChange = (e) => {
        const newColor = e.target.value
        setBoards(prevBoards =>
            prevBoards.map(board => {
                if (board.id === activeBoard.id) {
                    return { ...board, buttonsColor: newColor }
                }
                return board
            })
        )
        setActiveBoard({ ...activeBoard, buttonsColor: newColor })
        let buttons = document.getElementsByClassName("themable")
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = newColor;
        }
    }

    const handleColorReset = () => {
        setBoards(prevBoards =>
            prevBoards.map(board => {
                if (board.id === activeBoard.id) {
                    return { ...board, boardColor: "#ffffff", buttonsColor: "#ffffff", boardBackground: "plainColour" }
                }
                return board
            })
        )
        setActiveBoard({ ...activeBoard, boardColor: "#ffffff", buttonsColor: "#ffffff", boardBackground: "" })
    }

    const handleShowBackgroundPattern = (e) => {
        const newBackground = e.target.value
        setBoards(prevBoards =>
            prevBoards.map(board => {
                if (board.id === activeBoard.id) {
                    return { ...board, boardBackground: newBackground }
                }
                return board
            })
        )
        setActiveBoard({ ...activeBoard, boardBackground: newBackground })
    }

    const handleRating = (i, id) => {
        setSelectedStars(i + 1)
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, rating: i + 1 }
                }
                return item
            })
        )
        setSelectedStars(0)
    }
    const updateButtonColors = () => {
        const actionBoard = boards.find(el => el.id === activeBoard.id)
        let buttons = document.getElementsByClassName("themable")
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = actionBoard["buttonsColor"]
        }
    }
    const updateColors = () => {
        const actionBoard = boards.find(el => el.id === activeBoard.id)
        //let board = document.getElementById("board-svg")
        let board = svgRef.current
        if (board) {
            board.style.backgroundColor = actionBoard && actionBoard["boardColor"]
        }
        let buttons = document.getElementsByClassName("themable")
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.backgroundColor = actionBoard && actionBoard["buttonsColor"]
        }
    }

    // Paths order
    const moveToFront = (arr, id) => {
        const newArr = [...arr]
        const fromIndex = newArr.findIndex((el) => el.id === id)
        const element = newArr[fromIndex]
        newArr.splice(fromIndex, 1)
        newArr.splice(arr.length, 0, element)
        setPaths(newArr)
    }
    const moveToBack = (arr, id) => {
        const newArr = [...arr];
        const fromIndex = newArr.findIndex((el) => el.id === id)
        const element = newArr[fromIndex]
        newArr.splice(fromIndex, 1)
        newArr.splice(0, 0, element)
        setPaths(newArr)
    }
    const moveForward = (arr, id) => {
        const newArr = [...arr]
        const fromIndex = newArr.findIndex((el) => el.id === id)
        const element = newArr[fromIndex]
        newArr.splice(fromIndex, 1)
        newArr.splice(fromIndex + 1, 0, element)
        setPaths(newArr)
    }
    const moveBackward = (arr, id) => {
        const newArr = [...arr];
        const fromIndex = newArr.findIndex((el) => el.id === id)
        const element = newArr[fromIndex]
        newArr.splice(fromIndex, 1)
        newArr.splice(fromIndex - 1, 0, element)
        setPaths(newArr)
    }
    const handleMoveToFront = (id) => {
        moveToFront(paths, id)
    }
    const handleMoveToBack = (id) => {
        moveToBack(paths, id)
    }
    const handleMoveForward = (id) => {
        moveForward(paths, id)
    }
    const handleMoveBackward = (id) => {
        moveBackward(paths, id)
    }

    // Items order
    const moveItemToFront = (arr, id) => {
        const newArr = [...arr]
        const fromIndex = newArr.findIndex((el) => el.id === id)
        const element = newArr[fromIndex]
        newArr.splice(fromIndex, 1)
        newArr.splice(arr.length, 0, element)
        setItems(newArr)
    }
    const moveItemToBack = (arr, id) => {
        const newArr = [...arr];
        const fromIndex = newArr.findIndex((el) => el.id === id)
        const element = newArr[fromIndex]
        newArr.splice(fromIndex, 1)
        newArr.splice(0, 0, element)
        setItems(newArr)
    }
    const moveItemForward = (arr, id) => {
        const newArr = [...arr]
        const fromIndex = newArr.findIndex((el) => el.id === id)
        const element = newArr[fromIndex]
        newArr.splice(fromIndex, 1)
        newArr.splice(fromIndex + 1, 0, element)
        setItems(newArr)
    }
    const moveItemBackward = (arr, id) => {
        const newArr = [...arr];
        const fromIndex = newArr.findIndex((el) => el.id === id)
        const element = newArr[fromIndex]
        newArr.splice(fromIndex, 1)
        newArr.splice(fromIndex - 1, 0, element)
        setItems(newArr)
    }
    const handleMoveItemToFront = (id) => {
        moveItemToFront(items, id)
    }
    const handleMoveItemToBack = (id) => {
        moveItemToBack(items, id)
    }
    const handleMoveItemForward = (id) => {
        moveItemForward(items, id)
    }
    const handleMoveItemBackward = (id) => {
        moveItemBackward(items, id)
    }

    // Add Elements
    const handleAddBox = (e) => {
        e.preventDefault()
        const itemId = Date.now()
        const newItem = boxModel(itemId, activeBoard.id, "Click me to edit. \nClick the board to stop editing.", itemColor, "#ffffff", itemLink, itemUrl)
        setItems((prevItems) => [...prevItems, newItem])
        setItemText('Text')
        setItemColor('#f4b416')
    }

    const handleAddGalleryBox = (color) => {
        const itemId = Date.now()
        const newItem = boxModel(itemId, activeBoard.id, color, color, getTextColor(itemColor), itemLink, itemUrl)
        setItems((prevItems) => [...prevItems, newItem])
        setItemText('Text')
        setItemColor('#f4b416')
    }
    const handleAddTodoBox = (text, completed) => {
        const itemId = Date.now()
        const itemText = `${text} ${completed ? "(Completed)" : ""}`
        const newItem = boxModel(itemId, activeBoard.id, itemText, "#940019", getTextColor(itemColor), itemLink, itemUrl)
        setItems((prevItems) => [...prevItems, newItem])
        setItemText('Text')
        setItemColor('#f4b416')
    }
    const handleAddDateBox = (text) => {
        const itemId = Date.now()
        const itemText = `New event on ${text.toLocaleDateString('en-GB')} \n\nDetails:`
        const newItem = boxModel(itemId, activeBoard.id, itemText, "#a057c1", getTextColor(itemColor), itemLink, itemUrl)
        setItems((prevItems) => [...prevItems, newItem])
        setItemText('Text')
        setItemColor('#f4b416')
    }
    const handleAddGalleryImage = (image) => {
        setItems([...items, image])
    }
    const handleAddGalleryLink = (link) => {
        const itemId = Date.now()
        const newItem = boxModel(itemId, activeBoard.id, link.content, itemColor, getTextColor(itemColor), link.content, link.link)
        setItems((prevItems) => [...prevItems, newItem])
        setItemText('Text')
        setItemColor('#f4b416')
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                setErrorMessage('File size exceeds the limit (2 MB). Please select a smaller file.');
            } else {
                setErrorMessage('')
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        const newItem = imageModel(Date.now(), activeBoard.id, e.target.result)
                        setItems((prevItems) => [...prevItems, newItem])
                    }
                    reader.readAsDataURL(file)
                    setImageUploadValue("")
                }
            }
        }
    }
    const handleImageDropUpload = (e) => {
        const file = e
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                alert('File size exceeds the limit (2 MB). Please select a smaller file.');
            } else {
                setErrorMessage('')
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader()
                    reader.onload = (e) => {
                        const newItem = imageModel(Date.now(), activeBoard.id, e.target.result)
                        setItems((prevItems) => [...prevItems, newItem])
                    }
                    reader.readAsDataURL(file)
                }
            }
        }
    }
    const handleTextDropUpload = (e) => {
        const text = e.dataTransfer.getData('text')
        const isUrl = e.dataTransfer.getData('url')
        const googleMapUrlStart = "https://www.google.com/maps"
        const youtubeUrlStart = "https://www.youtube.com/watch?v="
        let newText = isUrl
        let youtubeCode = newText.replace(youtubeUrlStart, "")
        const urlEnd = youtubeCode.indexOf("=")
        let youtubeCodeFinal = urlEnd > -1 ? youtubeCode.slice(0, urlEnd + 1) : youtubeCode
        if (text && isUrl && !text.startsWith(googleMapUrlStart) && !text.startsWith(youtubeUrlStart)) {
            const itemId = Date.now()
            const newItem = boxModel(itemId, activeBoard.id, text, "#ffffff", getTextColor(itemColor), "Web link", text)
            setItems((prevItems) => [...prevItems, newItem])
        }
        if (isUrl && isUrl.includes(youtubeUrlStart)) {
            handleDropVideo(youtubeCodeFinal)
        }
        if (isUrl && (text.startsWith(googleMapUrlStart))) {
            function extractword(str, start, end) {
                let startindex = str.indexOf(start) + 1;
                let endindex = str.indexOf(end, startindex);
                if (startindex !== -1 && endindex !== -1 && endindex > startindex)
                    return str.substring(startindex, endindex)
            }
            const googleCoordinates = () => extractword(text, "@", "z")
            const newItem = mapModel(Date.now(), activeBoard.id, googleCoordinates())
            setItems((prevItems) => [...prevItems, newItem])
        }
        if (text && !isUrl
            && ((text.startsWith('http')
                || text.startsWith('https'))
                && (text.endsWith('jpg')
                    || text.endsWith('jpeg')
                    || text.endsWith('png')
                    || text.endsWith('webp')
                    || text.endsWith('svg')
                ))) {
            e.preventDefault()
            const newItem = {
                id: Date.now(),
                board: activeBoard.id,
                imageUrl: text,
                x: 250,
                y: 300,
                width: 100,
                angle: 0,
                type: "imageUrl",
                opacity: 1,
                cropHeight: 0,
                cropWidth: 0,
                roundCorners: 0,
            }
            setItems((prevItems) => [...prevItems, newItem])
        }
        if (text && !isUrl && (text.startsWith('http') || text.startsWith('https'))) {
            const itemId = Date.now()
            const newItem = boxModel(itemId, activeBoard.id, text, "#ffffff", getTextColor(itemColor), "Web link", text)
            setItems((prevItems) => [...prevItems, newItem])
        }
        if (text && !isUrl && (!text.startsWith('http') || !text.startsWith('https'))) {
            const itemId = Date.now()
            const newItem = boxModel(itemId, activeBoard.id, text, "#ffffff", getTextColor(itemColor))
            setItems((prevItems) => [...prevItems, newItem])
        }

        if (isUrl && !isUrl.startsWith(googleMapUrlStart) && !isUrl.startsWith(youtubeUrlStart) && (isUrl.startsWith('http') || isUrl.startsWith('https'))) {
            const itemId = Date.now()
            const newItem = boxModel(itemId, activeBoard.id, isUrl, "#ffffff", getTextColor(itemColor), "Web link", isUrl)
            setItems((prevItems) => [...prevItems, newItem])
        }
    }
    const handlePdfUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function () {
                const arrayBuffer = reader.result;
                uploadToIndexedDB(arrayBuffer);
                const newItem = pdfModel(pdfId, activeBoard.id)
                setItems((prevItems) => [...prevItems, newItem]);
            };
            reader.readAsArrayBuffer(file);
            setPdfUploadValue("")
        }
    }
    const uploadToIndexedDB = (arrayBuffer) => {
        const request = indexedDB.open('vible-database', 1);
        request.onupgradeneeded = function (event) {
            const db = event.target.result;
            db.createObjectStore('pdfs');
        };

        request.onsuccess = function (event) {
            const db = event.target.result;
            const transaction = db.transaction('pdfs', 'readwrite');
            const store = transaction.objectStore('pdfs');
            const uploadRequest = store.put(arrayBuffer, pdfId);

            uploadRequest.onsuccess = function () {
                setPdfId("")
                console.log('PDF uploaded successfully!');
            };

            uploadRequest.onerror = function () {
                console.error('Error uploading PDF.');
            };
        };

        request.onerror = function () {
            console.error('Error opening IndexedDB.');
        };
    }
    const handleAddVideo = (e) => {
        e.preventDefault()
        const newItem = videoModel(Date.now(), activeBoard.id, itemVideoUrl)
        setItems((prevItems) => [...prevItems, newItem])
        setItemVideoUrl('')
    }
    const handleDropVideo = (e) => {
        const newItem = {
            id: Date.now(),
            board: activeBoard.id,
            videoUrl: e,
            x: 250,
            y: 300,
            width: 300,
            height: 250,
            angle: 0,
            type: "video"
        }
        setItems((prevItems) => [...prevItems, newItem])
        setItemVideoUrl('')
    }
    const handleAddImage = (e) => {
        e.preventDefault()
        const newItem = {
            id: Date.now(),
            board: activeBoard.id,
            imageUrl: itemImageUrl,
            x: 250,
            y: 300,
            width: 100,
            height: "auto",
            angle: 0,
            type: "imageUrl",
            opacity: 1,
            cropHeight: 0,
            cropWidth: 0,
            roundCorners: 0,
        }
        setItems((prevItems) => [...prevItems, newItem])
        setItemImageUrl("")
    }
    const handleAddMap = (e) => {
        e.preventDefault()
        const newItem = mapModel(Date.now(), activeBoard.id, itemMapUrl)
        setItems((prevItems) => [...prevItems, newItem])
        setItemMapUrl("")
    }
    const resetPathsGroup = () => {
        setPaths(prevPaths => prevPaths.map(el => ({ ...el, group: "noGroup" })))
    }
    const handleSvgPointerDown = (e, rectId) => {

        if (e.target.id !== 'box-text'
            && e.target.id !== 'box-handel'
            && e.target.id !== 'video'
            && e.target.id !== 'image'
            && e.target.id !== 'image-url'
            && e.target.id !== 'map-url'
            && e.target.id !== 'pdf'
            && e.target.id !== 'box-container'
            && e.target.id !== 'box-object'
            && e.target.id !== 'resize'
            && e.target.id !== 'rotate'
            && e.target.id !== 'delete-button'
            && e.target.id !== 'delete-text'
            && e.target.id !== 'delete-confirm'
            && e.target.id !== 'delete-confirmation'
            && e.target.id !== "rating-star"
            && e.target.id !== "box-rating"
            && !e.target.classList.contains('box-editor')
            && !e.target.classList.contains('field')
        ) {
            handleStopEditItem()
        }
        if (e.target.id === 'move' && editingText) {
            setIsDraggingRect(true)
            setSelectedRectId(rectId)
        }
        if (rectId) {
            handleRectPointerDown(e, rectId)
        }
        // if (!rectId) {
        //     handleStopEditItem()
        // }
        resetPathsGroup()

        if (selectedPath || isEditingPath) {
            setTool("")
            setSelectedPath(null)
            setIsEditingPath(null)
        }
        if (isErasing) {
            setDragErasing(true)
            return
        }
        if (isPartialErasing) {
            setDragPartialErasing(true)
            return
        }
        if (isGrouping) {
            setDragGrouping(true)
            return
        }
        if (!isDrawing && !isErasing && !isPartialErasing && !editingText) {
            const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
            setSvgOffset({
                x: clientX - svgPosition.x,
                y: clientY - svgPosition.y,
            })
            setDraggingSvg(true)
        }
        // Start drawing
        if (isDrawing && !isErasing && !isPartialErasing) {
            if (e.targetTouches && e.targetTouches.length > 1) return
            const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
            const svgPoint = svgRef.current.createSVGPoint()
            svgPoint.x = clientX
            svgPoint.y = clientY
            const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse())
            setSelectedPath(null)
            setDrawing(true)
            const newPath = {
                id: Date.now(),
                board: activeBoard.id,
                group: "noGroup",
                color: pathColor || "#000000",
                line: +pathLine || 2,
                opacity: 1,
                path: [transformedPoint],
                closed: "",
                dashed: "",
                arrowStart: "",
                arrowEnd: ""
            }
            setTempPath(() => ({ ...newPath }))
        }
    }
    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];

            const initialDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);

            setInitialDistance(initialDistance);
        }
    };
    const handleTouchMove = (e) => {
        if (e.touches.length === 2) {
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];

            const currentDistance = Math.hypot(touch2.clientX - touch1.clientX, touch2.clientY - touch1.clientY);

            if (initialDistance !== null) {
                const scaleFactor = currentDistance / initialDistance;

                if (currentDistance > initialDistance) {
                    handleZoomIn()
                }
                if (currentDistance < initialDistance) {
                    handleZoomOut()
                }

                // svgRef.current.style.transform = `scale(${scaleFactor})`;
                // svgRef.current.style.transformOrigin = '0 0'
            }
        }
    };

    const handleTouchEnd = () => {
        setInitialDistance(null);
    };

    const handleSvgPointerMove = (e, rectId) => {
        if (e.target.hasPointerCapture(e.pointerId)) {
            e.target.releasePointerCapture(e.pointerId);
        }
        const item = items.find(el => el.id === selectedRectId)
        if (rectId) {
            handleRectPointerMove(e, rectId)
        }
        if (isResizing) {
            const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
            const currentPoints = { x: clientX, y: clientY };
            const dx = currentPoints.x - mousedownPoints.x;
            const dy = currentPoints.y - mousedownPoints.y;

            if (item.type !== "pdf" || item.type !== "imageUrl") {
                setRectangleSize(() => ({
                    width: rectangleSize.width + dx,
                    height: rectangleSize.height + dy,
                }))
            }
            handleResize(e, selectedRectId)
            setMousedownPoints(currentPoints)
            updateResizeIcon(dx, dy)
        }

        if (isRotating) {

            if (item.type === "image") {
                let newImage = document.createElement("img")
                newImage.src = item.src

                const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
                const rect = items.find((r) => r.id === selectedRectId)
                const calculatedHeight = newImage && ((newImage.naturalHeight / newImage.naturalWidth) * rect.width)
                const centerX = rect.x + rect.width / 2;
                const centerY = rect.y + calculatedHeight / 2;
                const newAngle = Math.atan2(centerY - clientY, centerX - clientX);
                const angleDiff = newAngle - angleOffset.x;
                const newRotation = (angleDiff * 180) / Math.PI;
                setItems(prevItems =>
                    prevItems.map(item => {
                        if (item.id === selectedRectId) {
                            return { ...item, angle: Math.floor(newRotation) }
                        }
                        return item
                    })
                )
            } else if (item.type === "imageUrl") {
                let newImage = document.createElement("img")
                const imageSource = item.imageUrl
                newImage.src = imageSource

                const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
                const rect = items.find((r) => r.id === selectedRectId)
                const calculatedHeight = newImage && ((newImage.naturalHeight / newImage.naturalWidth) * rect.width)
                const centerX = rect.x + rect.width / 2;
                const centerY = rect.y + calculatedHeight / 2;
                const newAngle = Math.atan2(centerY - clientY, centerX - clientX);
                const angleDiff = newAngle - angleOffset.x;
                const newRotation = (angleDiff * 180) / Math.PI;
                setItems(prevItems =>
                    prevItems.map(item => {
                        if (item.id === selectedRectId) {
                            return { ...item, angle: Math.floor(newRotation) }
                        }
                        return item
                    })
                )
            } else {
                const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
                const rect = items.find((r) => r.id === selectedRectId)
                const centerX = rect.x + rect.width / 2;
                const centerY = rect.y + rect.height / 2;
                const newAngle = Math.atan2(centerY - clientY, centerX - clientX);
                const angleDiff = newAngle - angleOffset.x;
                const newRotation = (angleDiff * 180) / Math.PI;
                setItems(prevItems =>
                    prevItems.map(item => {
                        if (item.id === selectedRectId) {
                            return { ...item, angle: Math.floor(newRotation) }
                        }
                        return item
                    })
                )
            }
        }

        if (!isDrawing && !drawing && draggingSvg && !isDraggingRect && !isResizing && !isRotating) {
            const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
            const divRect = svgRef.current.getBoundingClientRect()
            const maxX = svgSize.width - divRect.width
            const maxY = svgSize.height - divRect.height
            let newX = clientX - svgOffset.x
            let newY = clientY - svgOffset.y
            newX = Math.min(0, Math.max(newX, maxX))
            newY = Math.min(0, Math.max(newY, maxY))
            setSvgPosition({ x: newX, y: newY })
        }

        // Drawing
        if (isDrawing && drawing && !draggingSvg && !isErasing && !selectedRectId) {
            e.preventDefault()
            const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
            const svgPoint = svgRef.current.createSVGPoint()
            svgPoint.x = clientX
            svgPoint.y = clientY
            const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse())
            setTempPath(prevPath => ({ ...prevPath, path: [...tempPath["path"], transformedPoint] }))
        }
    }
    const handleSvgPointerLeave = (e) => {
        setDraggingSvg(false)
    }
    const handleSvgPointerUp = () => {

        handleRectPointerUp()

        setDraggingSvg(false)
        if (drawing) {
            setPaths(prevPaths => [...prevPaths, tempPath])
            setHistoryErase((prevHistory) => [...prevHistory.slice(0, positionErase + 1), { paths: [...paths, tempPath] }]);
            setPositionErase((prevPosition) => prevPosition + 1);
            setDrawing(false)
            setTempPath(null)
        }
        if (dragErasing) {
            setDragErasing(false)
        }
        if (dragPartialErasing) {
            setDragPartialErasing(false)
        }
        if (dragGrouping) {
            setDragGrouping(false)
        }
        if (isResizing) {
            setIsResizing(false)
        }
        if (isRotating) {
            setIsRotating(false)
        }
        if (groupDragging) {
            setGroupDragging(false)
        }
    }

    const handleRectPointerDown = (e, rectId) => {
        if (e.target.id === 'box-text'
            || e.target.id === 'box-handel'
            || e.target.id === 'video'
            || e.target.id === 'image'
            || e.target.id === 'image-url'
            || e.target.id === 'map-url'
            || e.target.id === 'pdf'
            || e.target.id === 'box-container'
            || e.target.id === 'box-object'
            || e.target.id === 'resize'
            || e.target.id === 'rotate'
            || e.target.id === 'delete-button'
            || e.target.id === 'delete-text'
            || e.target.id === 'delete-confirm'
            || e.target.id === 'delete-confirmation'
            || e.target.id === "rating-star"
            || e.target.id === "box-rating"
            || e.target.classList.contains('box-editor')
            || e.target.classList.contains('field')
        ) {
            handleEditItem(e, rectId)
        }
        if (isDrawing) return
        if (isErasing || isPartialErasing || isGrouping) {
            setIsErasing(false)
            setIsPartialErasing(false)
            setIsGrouping(false)
        }
        const rectItem = items.find(el => el.id === rectId)

        const rectType = rectItem.type

        if (e.target.id === 'resize') {
            setIsResizing(true)
            setIsDraggingRect(false)
            const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
            setMousedownPoints({ x: clientX, y: clientY })

            if (rectType === "imageUrl") {
                updateResizeIcon(clientX, clientY)
            }
            if (rectType === "box" || rectType === "image" || rectType === "video" || rectType === "mapUrl") {
                setRectangleSize(() => ({
                    width: rectItem.width,
                    height: rectItem.height,
                }))
            }
        }

        if (e.target.id === 'rotate') {
            setIsDraggingRect(false)
            if (rectType === "image") {
                let newImage = document.createElement("img")
                newImage.src = rectItem.src
                setIsRotating(true)
                const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
                const rect = items.find((item) => item.id === rectId)
                const calculatedHeight = newImage && ((newImage.naturalHeight / newImage.naturalWidth) * rect.width)
                const centerX = rect.x + rect.width / 2
                const centerY = rect.y + calculatedHeight / 2
                const angle = Math.atan2(centerY - clientY, centerX - clientX)
                setAngleOffset({ x: Math.floor(Math.abs(angle)) })

            } else if (rectType === "imageUrl") {
                let newImage = document.createElement("img")
                const imageSource = rectItem.imageUrl
                newImage.src = imageSource
                setIsRotating(true)
                const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
                const rect = items.find((item) => item.id === rectId)
                const calculatedHeight = newImage && ((newImage.naturalHeight / newImage.naturalWidth) * rect.width)
                const centerX = rect.x + rect.width / 2
                const centerY = rect.y + calculatedHeight / 2
                const angle = Math.atan2(centerY - clientY, centerX - clientX)
                setAngleOffset({ x: Math.floor(Math.abs(angle)) })
            } else {
                setIsRotating(true)
                const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
                const rect = items.find((item) => item.id === rectId)
                const centerX = rect.x + rect.width / 2
                const centerY = rect.y + rect.height / 2
                const angle = Math.atan2(centerY - clientY, centerX - clientX)
                setAngleOffset({ x: Math.floor(Math.abs(angle)) })
            }
            // if (rectType === "box" && editingText) {
            //     setIsDraggingRect(false)
            // }
        }

        setSelectedRectId(rectId)
        setIsDraggingRect(true)
        const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
        const rect = items.find((r) => r.id === rectId)
        const rectOffset = {
            x: Math.floor(clientX) - rect.x,
            y: Math.floor(clientY) - rect.y,
        }

        setRectOffsets((prevOffsets) => ({
            ...prevOffsets,
            [rectId]: rectOffset,
        }))
    }

    const handleRectPointerMove = (e, rectId) => {

        if (isResizing || isRotating) {
            // e.stopPropagation()
            // e.preventDefault()
            return
        }
        if (e.target.id === 'box-text') {
            return
        }
        if (rectId !== selectedRectId) {
            return
        }
        if (isDraggingRect) {
            const { clientX, clientY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
            const rectOffset = rectOffsets[rectId]
            const rectIndex = items.findIndex(el => el.id === rectId)

            const newX = Math.floor(clientX) - rectOffset.x
            const newY = Math.floor(clientY) - rectOffset.y
            const updatedRectangles = [...items]
            const updatedRect = { ...updatedRectangles[rectIndex], x: newX, y: newY }
            updatedRectangles[updatedRectangles.length] = updatedRect
            updatedRectangles.splice(rectIndex, 1)
            setItems([...updatedRectangles])
        }

    }

    const handleRectPointerUp = (rectId) => {

        if (isResizing) {
            setIsResizing(false)
        }
        if (isRotating) {
            setIsRotating(false)
        }
        setRectOffsets((prevOffsets) => {
            const { [rectId]: deletedOffset, ...restOffsets } = prevOffsets
            return restOffsets
        })

        setSelectedRectId(null)
        setIsDraggingRect(false)
    }

    const updateResizeIcon = (dx, dy) => {
        setResizeIconPosition((prevPosition) => ({
            x: prevPosition.x + dx,
            y: prevPosition.y + dy,
        }));
    }

    const handleResize = (e, id) => {
        const resizable = items.find(item => item.id === id)
        const size = rectangleSize
        if (resizable && resizable.type === "image") {
            setItems(prevItems =>
                prevItems.map(item => {
                    if (item.id === id) {
                        return { ...item, width: size.width, height: "auto" }
                    }
                    return item
                })
            )
        }
        if (resizable && resizable.type === "imageUrl") {
            setItems(prevItems =>
                prevItems.map(item => {
                    if (item.id === id) {
                        return { ...item, width: size.width, height: "auto" }
                    }
                    return item
                })
            )
        }
        if (resizable && resizable.type === "box") {
            setItems(prevItems =>
                prevItems.map(item => {
                    if (item.id === id) {
                        return { ...item, width: size.width, height: size.height }
                    }
                    return item
                })
            )
        }
        if (resizable && resizable.type === "video") {
            setItems(prevItems =>
                prevItems.map(item => {
                    if (item.id === id) {
                        return { ...item, width: size.width, height: size.height }
                    }
                    return item
                })
            )
        }
        if (resizable && resizable.type === "mapUrl") {
            setItems(prevItems =>
                prevItems.map(item => {
                    if (item.id === id) {
                        return { ...item, width: size.width, height: size.height }
                    }
                    return item
                })
            )
        }
        if (resizable && resizable.type === "pdf") {
            setItems(prevItems =>
                prevItems.map(item => {
                    if (item.id === id) {
                        return { ...item, width: size.width, height: size.height }
                    }
                    return item
                })
            )
        }
    }

    // Paths
    // Single path hadling
    const handlePathClick = (e, index, id) => {
        if (!isGrouping) {
            setSelectedPath(index)
            setIsEditingPath({ status: true, id: id })
        }
    }
    const handlePathSelect = (e, index, id) => {
        if (isDraggingRect || isDrawing || isEditingBoard || editingItem) { return }
        if (isErasing && dragErasing) {
            handleDeletePath(id)
        }
        if (isPartialErasing && dragPartialErasing) {
            const { clientX: startX, clientY: startY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
            const startPoint = { x: startX, y: startY }
            handlePartialErasePath(id, startPoint)
        }
        if (isGrouping && dragGrouping) {
            handleGroupPaths(id)
        }
        if (!isErasing && !dragErasing && !isPartialErasing && !dragPartialErasing && !isGrouping && !dragGrouping) {
            setSelectedPath(index)
            setIsEditingPath({ status: true, id: id })
        }
    }
    const handlePathDeSelect = () => {
        setSelectedPath(null)
        setIsEditingPath(null)
    }
    const handlePathDrag = (e, index, id) => {
        e.stopPropagation()
        const { clientX: startX, clientY: startY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
        if (drawing || isDrawing) { return }
        if (!drawing || !isDrawing) {
            stopAllTopForms()
            setSelectedPath(index)
            setIsEditingPath({ status: true, id: id })
            document.addEventListener('keydown', function (e) {
                const key = e.key;
                if (key === "Backspace") {
                    handleDeletePath(id)
                }
            });
        }
        if (isErasing) {
            handleDeletePath(id)
        }
        if (isPartialErasing) {
            const startPoint = { x: startX, y: startY }
            handlePartialErasePath(id, startPoint)
        }
        if (isGrouping) {
            handleGroupPaths(id)
        }
        const handleMouseMove = (e) => {
            e.preventDefault()
            const { clientX: currentX, clientY: currentY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
            const deltaX = currentX - startX
            const deltaY = currentY - startY
            if (selectedPath !== null) {
                const updatedPaths = paths.map((path, index) => {
                    if (index === selectedPath) {
                        return ({
                            ...path, path: path["path"].map((point) => ({
                                x: point.x + deltaX,
                                y: point.y + deltaY,
                            }))
                        })
                    }
                    return path
                })
                setPaths(updatedPaths)
            }
        }
        const handleMouseUp = () => {
            window.removeEventListener('pointermove', handleMouseMove)
            window.removeEventListener('pointerup', handleMouseUp)
            window.removeEventListener('touchmove', handleMouseMove)
            window.removeEventListener('touchend', handleMouseUp)
        }
        window.addEventListener('pointermove', handleMouseMove)
        window.addEventListener('pointerup', handleMouseUp)
        window.addEventListener('touchmove', handleMouseMove)
        window.addEventListener('touchend', handleMouseUp)
    }

    const handlePartialErasePath = (id, startPoint) => {
        const targetPath = paths.find(el => el.id === id)
        const newPaths = partialErase(startPoint, targetPath["path"])
        const pathsToCreate = [
            {
                id: Date.now(),
                board: activeBoard.id,
                group: "noGroup",
                color: targetPath.color,
                line: +targetPath.line,
                opacity: targetPath.opacity,
                path: newPaths[0],
                closed: targetPath.closed,
                dashed: targetPath.dashed,
                arrowStart: targetPath.arrowStart,
                arrowEnd: targetPath.arrowEnd
            },
            {
                id: Date.now() + 1,
                board: activeBoard.id,
                group: "noGroup",
                color: targetPath.color,
                line: +targetPath.line,
                opacity: targetPath.opacity,
                path: newPaths[1],
                closed: targetPath.closed,
                dashed: targetPath.dashed,
                arrowStart: targetPath.arrowStart,
                arrowEnd: targetPath.arrowEnd
            }
        ]
        const filteredPaths = paths.filter((path) => path.id !== id)
        setPaths([...filteredPaths, ...pathsToCreate])
        setSelectedPath(null)
        setIsEditingPath(null)
    }

    // Path Group handling
    const handleGrouping = () => {
        stopAllTopForms()
        setTool("")
        if (isGrouping) {
            resetPathsGroup()
            setSelectedPath(null)
            setIsEditingPath(null)
            setPathLine(pathLine)
        }
        setIsGrouping(isGrouping => !isGrouping)
        setSelectedPath(null)
        setIsEditingPath(null)
        setIsDrawing(false)
        setIsEditingBoard(false)
        setIsErasing(false)
        setIsPartialErasing(false)
        setInfo(false)
    }
    const handleGroupPaths = (added) => {
        setPaths(prevPaths => prevPaths.map(el => el.id === added ? { ...el, group: "activeGroup" } : el))
        setGroupDragging(true)
    }
    const handlePathGroupDrag = (e) => {
        const pathGroup = paths.filter(path => path.group === "activeGroup")
        const { clientX: startX, clientY: startY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
        const handleMouseMove = (e) => {
            e.preventDefault()
            const { clientX: currentX, clientY: currentY } = e.touches ? e.touches[0] || e.originalEvent.touches[0] || e.originalEvent.changedTouches[0] : e
            const deltaX = currentX - startX
            const deltaY = currentY - startY

            const updatedPaths = pathGroup.map((path) => {
                return ({
                    ...path, path: path["path"].map((point) => ({
                        x: point.x + deltaX,
                        y: point.y + deltaY,
                    }))
                })
            })
            setPaths(prevPaths => {
                const newPaths = prevPaths.filter(ele => !updatedPaths.find(x => x.id === ele.id))
                return [...newPaths, ...updatedPaths]
            })
        }
        const handleMouseUp = () => {
            window.removeEventListener('pointermove', handleMouseMove)
            window.removeEventListener('pointerup', handleMouseUp)
        }
        window.addEventListener('pointermove', handleMouseMove)
        window.addEventListener('pointerup', handleMouseUp)

    }


    const handleRotateChange = (e, amount) => {
        const rotate = (amount === "increase") ? +1 : -1
        const updatedPaths = paths.map((path, index) => {
            if (index === selectedPath) {
                const center = getCenterPoint(path["path"])
                return ({
                    ...path, path: rotatePath(path["path"], center, rotate)
                })
            }
            return path
        })
        setRotation(rotate)
        setPaths(updatedPaths)
    }


    const handleScaleChange = (e, amount) => {
        const scale = (amount === "increase") ? 1.09 : 0.9
        const updatedPaths = paths.map((path, index) => {
            if (index === selectedPath) {
                const center = getCenterPoint(path["path"])
                return ({
                    ...path, path: scalePath(path["path"], center, scale)
                })
            }
            return path
        })
        setScaling(scale)
        setPaths(updatedPaths)
    }

    // Line Group functions
    const handleGroupRotateChange = (e, amount) => {
        const pathGroup = paths.filter(path => path.group === "activeGroup")
        const notGouped = paths.filter(path => path.group === "noGroup")
        const pathCollect = pathGroup.map(el => el.path)
        const pathPoints = pathCollect.flat()
        const rotate = (amount === "increase") ? +1 : -1
        const center = getCenterPoint(pathPoints)
        const updatedPaths = pathGroup.map((path) => {
            return ({
                ...path, path: rotatePath(path["path"], center, rotate)
            })
        })
        setRotation(rotate)
        setPaths([...notGouped, ...updatedPaths])
    }

    const handleGroupScaleChange = (e, amount) => {
        const pathGroup = paths.filter(path => path.group === "activeGroup")
        const notGouped = paths.filter(path => path.group === "noGroup")
        const pathCollect = pathGroup.map(el => el.path)
        const pathPoints = pathCollect.flat()
        const scale = (amount === "increase") ? 1.09 : 0.9
        const center = getCenterPoint(pathPoints)
        const updatedPaths = pathGroup.map((path) => {
            return ({
                ...path, path: scalePath(path["path"], center, scale)
            })
        })
        setScaling(scale)
        setPaths([...notGouped, ...updatedPaths])
    }
    const handleGroupLineChange = (e, op) => {
        setPathLine(pathLine)
        const pathGroup = paths.filter(path => path.group === "activeGroup")
        const notGouped = paths.filter(path => path.group === "noGroup")
        const updatedPaths = pathGroup.map((path) => {
            let line = op === "increase" ? pathLine + 1 : pathLine - 1
            if (line >= 1) {
                setPathLine(line)
                return ({
                    ...path, line: line
                })
            } else {
                setPathLine(pathLine)
                return ({
                    ...path, line: 1
                })
            }
        })
        setPaths([...notGouped, ...updatedPaths])
    }

    const handleGroupColorChange = (e) => {
        const pathGroup = paths.filter(path => path.group === "activeGroup")
        const notGouped = paths.filter(path => path.group === "noGroup")
        const color = e.target.value
        const updatedPaths = pathGroup.map((path) => {
            return ({
                ...path, color: color
            })
        })
        setPathColor(color)
        setPaths([...notGouped, ...updatedPaths])
    }

    const handleEditPaths = () => {
        setIsEditingPaths(isEditingPaths => !isEditingPaths)
        setIsEditingPath(null)
        setIsDrawing(false)
        setIsErasing(false)
        setIsPartialErasing(false)
        setSelectedPath(null)
    }
    const handleDuplicatePath = (id) => {
        const pathToCopy = paths.find(path => path.id === id)
        const pathCopy = { ...pathToCopy, board: activeBoard.id, id: Date.now() }
        setPaths(prevPaths => [...prevPaths, pathCopy])
    }

    // Text Box
    const handleItemChange = (e, id, property) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, [property]: property === "showRating" || property === "showBorder" || property === "fontStyle" || property === "textAlignLeft" || property === "textAlignCenter" ? e.target.checked : e.target.value }
                }
                return item
            })
        )
    }
    const handleDuplicateBox = (id) => {
        const boxToCopy = items.find(item => item.id === id)
        const boxCopy = { ...boxToCopy, board: activeBoard.id, id: Date.now() }
        setItems(prevItems => [...prevItems, boxCopy])
    }

    // Drawing
    const handleDrawing = () => {
        if (editingItem) return
        if (isDrawing || isEditingPath) {
            setSelectedPath(null)
            setIsEditingPath(null)
            setPathColor("#000000")
            setPathLine(4)
        }
        setIsDrawing(isDrawing => !isDrawing)
        setPathColor("#000000")
        setPathLine(4)
        setIsErasing(false)
        setIsPartialErasing(false)
        setIsEditingPath(null)
        setIsEditingPaths(false)
        setIsGrouping(false)
        setDragGrouping(false)
        resetPathsGroup()
        setIsEditingBoard(false)
        setShowBoards(false)
        setInfo(false)
    }
    const handleEraser = () => {
        stopAllTopForms()
        setIsErasing(isErasing => !isErasing)
        setIsDrawing(false)
        setSelectedPath(null)
        setIsEditingPath(null)
        setIsEditingPaths(false)
        setIsGrouping(false)
        setDragGrouping(false)
        resetPathsGroup()
        setIsPartialErasing(false)
        setIsEditingBoard(false)
        setInfo(false)
    }
    const handlePartialEraser = () => {
        stopAllTopForms()
        setIsPartialErasing(isPartialErasing => !isPartialErasing)
        setIsDrawing(false)
        setSelectedPath(null)
        setIsEditingPath(null)
        setIsEditingPaths(false)
        setIsGrouping(false)
        setDragGrouping(false)
        resetPathsGroup()
        setIsErasing(false)
        setIsEditingBoard(false)
        setInfo(false)
    }
    const handleDeletePath = (erased) => {
        const newPaths = paths.filter((path) => path.id !== erased)
        handleChangeErase(newPaths)
        setIsEditingPath(null)
        setSelectedPath(null)
        setPathColor("#000000")
        setPathLine(pathLine)
    }
    const handleChangeErase = (newPaths) => {
        setPaths(newPaths);
        setHistoryErase((prevHistory) => [...prevHistory.slice(0, positionErase + 1), { paths: newPaths }]);
        setPositionErase((prevPosition) => prevPosition + 1);
    }
    const handleUndoErase = () => {
        if (positionErase > 0) {
            setPositionErase((prevPosition) => prevPosition - 1);
            setPaths(historyErase[positionErase - 1]["paths"]);
        }
    };
    const handleRedoErase = () => {
        if (positionErase < historyErase.length - 1) {
            setPositionErase((prevPosition) => prevPosition + 1);
            setPaths(historyErase[positionErase + 1]["paths"]);
        }
    };


    const handleLineColor = (e) => {
        setPathColor(e.target.value)
    }
    const handleLineWidth = (e) => {
        setPathLine(e.target.value)
    }


    // Line Change function 
    const handleLineWidthChange = (e, id, op) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    let line = op === "increase" ? path.line + 1 : path.line - 1
                    return { ...path, line: line >= 1 ? line : 1 }
                }
                return path
            })
        )
    }
    const handleLineColorChange = (e, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, color: e.target.value }
                }
                return path
            })
        )
    }
    const handleLineFillChange = (e, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, fill: e.target.value }
                }
                return path
            })
        )
    }
    const handleLineClosedChange = (e, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, closed: e.target.checked }
                }
                return path
            })
        )
    }
    const handleLineOpacityChange = (e, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, opacity: e.target.value }
                }
                return path
            })
        )
    }
    const handleLineDashedChange = (e, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, dashed: e.target.checked }
                }
                return path
            })
        )
    }
    const handleLineArrowStartChange = (e, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, arrowStart: e.target.checked }
                }
                return path
            })
        )
    }
    const handleLineArrowEndChange = (e, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, arrowEnd: e.target.checked }
                }
                return path
            })
        )
    }

    const stopLineEditing = () => {
        setIsEditingPath(null)
        setSelectedPath(null)
        setPathColor("#000000")
        setPathLine(4)
    }

    // Gallery
    const addGalleryItem = (item) => {
        setGalleryItems([...galleryItems, item])
    }
    const deleteGalleryItem = (index) => {
        const newItems = [...galleryItems]
        newItems.splice(index, 1)
        setGalleryItems(newItems)
    }

    const handleTodoAddToBoard = (text, completed) => {
        if (text !== "") {
            handleAddTodoBox(text, completed)
        }
    }

    // Helper functions
    const handleDeleteItem = (id) => {
        const itemType = items.find(item => item.id === id)
        if (itemType.type === "pdf") {
            handlePdfDelete(id)
        }
        if (items.length === 1) {
            setIsEditingBoard(false)
        }
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
        setEditingText(null)
        setEditingImage(null)
        setEditingVideo(null)
        setEditingMap(null)
        setEditingPdf(null)
    }

    // Text box inputs
    const handleItemText = (e) => {
        setItemText(e.target.value)
    }
    const handleItemColor = (e) => {
        setItemColor(e.target.value)
    }
    const handleItemLink = (e) => {
        setItemLink(e.target.value)
    }
    const handleItemUrl = (e) => {
        setItemUrl(e.target.value)
    }
    const handleItemVideoUrl = (e) => {
        setItemVideoUrl(e.target.value)
    }
    const handleItemImageUrl = (e) => {
        setItemImageUrl(e.target.value)
    }
    const handleItemMapUrl = (e) => {
        setItemMapUrl(e.target.value)
    }

    // Editing functions
    const handleEditItem = (e, id) => {
        // setSelectedRectId(id)
        if (isDrawing) return
        const itemType = items.find(el => el.id === id).type
        switch (itemType) {
            case 'box':
                stopAllTopForms()
                if (editingImage) {
                    setEditingImage(null)
                }
                if (editingImageLink) {
                    setEditingImageLink(null)
                }
                if (editingText) {
                    setEditingText(null)
                    setIsEditingBoard(false)
                    setWrite(false)
                }
                if (isEditingBoard) {
                    setEditingText({ status: true, id: id })
                    setWrite(false)
                }
                setEditingText({ status: true, id: id })
                setIsEditingBoard(true)
                handleWrite()
                break;
            case 'image':
                stopAllTopForms()
                if (editingText) {
                    setEditingText(null)
                }
                setEditingImage({ status: true, id: id })
                setIsEditingBoard(true)
                handleImage()
                break;
            case 'imageUrl':
                stopAllTopForms()
                if (editingText) {
                    setEditingText(null)
                }
                setEditingImageLink({ status: true, id: id })
                setIsEditingBoard(true)
                handleImageLink()
                break;
            case 'video':
                stopAllTopForms()
                setEditingVideo({ status: true, id: id })
                setIsEditingBoard(true)
                handleVideo()
                break;
            case 'mapUrl':
                stopAllTopForms()
                setEditingMap({ status: true, id: id })
                setIsEditingBoard(true)
                handleMap()
                break;
            case 'pdf':
                stopAllTopForms()
                setEditingPdf({ status: true, id: id })
                setIsEditingBoard(true)
                break;
            default:
                break;
        }
        setEditingItem({ status: true, id: id })
        if (tool !== "") {
            setTool("")
        }
    }
    const handleStartEditItem = (e, id) => {
        if (e.target.id === "box-text") {
            setIsDraggingRect(false)
            setEditingText({ status: true, id: id })
            setIsEditingBoard(true)
            handleWrite()
            document.body.style.position = "fixed"
        }
        setIsDraggingRect(false)
        document.body.style.position = "fixed"
    }
    const handleStopEditItem = () => {
        if (editingText) {
            document.body.style.position = "static"
        }
        if (editingText || isEditingPath || editingImage || editingImageLink || editingVideo || editingMap || editingPdf || isEditingBoard || editingItem || tool !== "") {
            setEditingItem(null)
            setEditingText(null)
            setIsEditingBoard(false)
            setIsEditingPath(null)
            setIsEditingPaths(false)
            setEditingImage(null)
            setEditingImageLink(null)
            setEditingVideo(null)
            setEditingMap(null)
            setEditingPdf(null)
            setSelectedPath(null)
            setWrite(false)
            setImage(false)
            setImageLink(false)
            setVideo(false)
            setMap(false)
            setPdf(false)
            setTool("")
        }
    }


    // Togge draw
    const handleDraw = () => {
        setDraw(draw => !draw)
        isGrouping && setIsGrouping(false)
        isDrawing && setIsDrawing(false)
        isErasing && setIsErasing(false)
    }

    // Toggle functions
    const handleInfo = () => {
        setInfo(info => !info)
    }
    const handleWrite = () => {
        setWrite(write => !write)
    }
    const handleImage = () => {
        setImage(image => !image)
    }
    const handleImageLink = () => {
        setImageLink(imageLink => !imageLink)
    }
    const handleVideo = () => {
        setVideo(video => !video)
    }
    const handleMap = () => {
        setMap(map => !map)
    }
    const handlePdf = () => {
        setPdf(pdf => !pdf)
    }
    const handleTodosToggle = () => {
        setTodosShow(todosShow => !todosShow)
    }

    const handleClearBoard = () => {
        const currentBoardItems = items.filter(el => el.board !== activeBoard.id)
        const boardPdfs = items.filter(el => el.type === "pdf" && el.board === activeBoard.id)
        if (boardPdfs.length > 0) {
            boardPdfs.forEach(el => handlePdfDelete(el.id))
        }
        setItems(currentBoardItems)
    }
    const handleClearPaths = () => {
        const currentBoardPaths = paths.filter((el) => el.board !== activeBoard.id)
        setPaths(currentBoardPaths)
    }
    const handleZoomIn = () => {
        setZoom(zoom => zoom -= 100)
    }
    const handleResetZoom = () => {
        setZoom(10000)
    }
    const handleZoomOut = () => {
        setZoom(zoom => zoom += 100)
    }
    const handleZoomSlider = (e) => {
        setZoom(e.target.value)
    }

    const handleEditingBoard = () => {
        setIsEditingBoard(isEditingBoard => !isEditingBoard)
        if (isEditingBoard) {
            stopAllTopForms()
        }
        setIsDrawing(false)
        setIsErasing(false)
        setIsPartialErasing(false)
        setIsGrouping(false)
        setZoom(10000)
    }

    const stopAllTopForms = () => {
        setIsEditingBoard(false)
        setShowBoards(false)
        setEditingItem(null)
        setEditingText(null)
        setIsEditingPath(null)
        setIsEditingPaths(false)
        setSelectedPath(null)
        setEditingImage(null)
        setEditingImageLink(null)
        setEditingVideo(null)
        setEditingMap(null)
        setEditingPdf(null)
        setInfo(false)

        setWrite(false)
        setImage(false)
        setImageLink(false)
        setVideo(false)
        setMap(false)
        setPdf(false)
        setPathLine(4)
    }


    return (
        <MoodboardContext.Provider
            value={{
                // Properties
                info,
                isDrawing,
                paths,
                tempPath,
                isErasing,
                isPartialErasing,
                pathColor,
                pathLine,
                svgRef,
                pathRef,
                itemRef,
                items,
                itemText,
                itemColor,
                itemLink,
                itemUrl,
                itemVideoUrl,
                itemImageUrl,
                itemMapUrl,
                editingItem,
                editingText,
                editingImage,
                editingImageLink,
                editingVideo,
                editingMap,
                editingPdf,
                galleryItems,
                write,
                image,
                imageLink,
                video,
                map,
                pdf,
                draw,
                zoom,
                isEditingBoard,
                isEditingPath,
                isEditingPaths,
                rotation,
                scaling,
                selectedPath,
                todosShow,
                svgPosition,
                divRef,
                draggingSvg,
                isDraggingRect,
                selectedRectId,
                selectedStars,
                canUndoErase: positionErase > 0,
                canRedoErase: positionErase < historyErase.length - 1,
                isGrouping,
                tool,
                boards,
                activeBoard,
                boardIndex,
                showBoards,
                clipBoard,
                imageUploadValue,
                pdfUploadValue,
                errorMessage,
                // Methods
                handleShowBoards,
                handleBoardColorChange,
                handleButtonsColorChange,
                handleColorReset,
                changeTool,
                handlePartialEraser,
                handleGrouping,
                handleUndoErase,
                handleRedoErase,
                handleRating,
                handleInfo,
                handleSvgPointerMove,
                handlePathClick,
                handlePathDrag,
                handlePathGroupDrag,
                handlePathSelect,
                handlePathDeSelect,
                handleAddBox,
                handleImageUpload,
                handlePdfUpload,
                handleImageDropUpload,
                handleTextDropUpload,
                handleAddVideo,
                handleAddImage,
                handleAddMap,
                handleDeleteItem,
                handleItemText,
                handleItemColor,
                handleItemLink,
                handleItemUrl,
                handleItemVideoUrl,
                handleItemImageUrl,
                handleItemMapUrl,
                handleEditItem,
                handleStopEditItem,
                handleStartEditItem,
                handleItemChange,
                handleDrawing,
                handleEraser,
                handleDeletePath,
                handleLineColor,
                handleLineWidth,
                addGalleryItem,
                deleteGalleryItem,
                handleAddGalleryBox,
                handleAddGalleryImage,
                handleAddGalleryLink,
                handleDraw,
                handleWrite,
                handleImage,
                handleImageLink,
                handleVideo,
                handleMap,
                handlePdf,
                handleClearBoard,
                handleClearPaths,
                getTextColor,
                handleZoomIn,
                handleZoomOut,
                handleResetZoom,
                handleZoomSlider,
                handleEditingBoard,
                handleTodosToggle,
                handleLineWidthChange,
                handleLineColorChange,
                handleLineFillChange,
                handleLineOpacityChange,
                handleLineDashedChange,
                handleLineArrowStartChange,
                handleLineArrowEndChange,
                handleLineClosedChange,
                stopLineEditing,
                handleScaleChange,
                handleRotateChange,
                handleEditPaths,
                handlePdfDelete,
                handleTodoAddToBoard,
                handleSvgPointerDown,
                handleSvgPointerUp,
                handleSvgPointerLeave,
                handleRectPointerDown,
                handleRectPointerMove,
                handleRectPointerUp,
                handleMoveToFront,
                handleMoveToBack,
                handleMoveForward,
                handleMoveBackward,
                handleMoveItemToFront,
                handleMoveItemToBack,
                handleMoveItemForward,
                handleMoveItemBackward,
                handleDuplicatePath,
                handleDuplicateBox,
                handleGroupRotateChange,
                handleGroupScaleChange,
                handleAddDateBox,
                handleGroupLineChange,
                handleGroupColorChange,
                handleChangeBoard,
                handleAddNewBoard,
                handleDeleteBoard,
                handleBoardIndexUpdate,
                handleCopy,
                handlePaste,
                handleClearClipBoard,
                handleShowBackgroundPattern,
                getRandomQuote,
                setPaths,
                handleTouchStart,
                handleTouchMove,
                handleTouchEnd
            }}>
            {children}
        </MoodboardContext.Provider>
    )
}

export { MoodboardContext, MoodboardProvider }
