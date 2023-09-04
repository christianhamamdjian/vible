import React, { useState, useEffect, useRef, createContext } from "react"
import { useLocalStorage } from "../components/hooks/useLocalStorage"
import getTextColor from "../components/utils/getTextColor"
// import partialErase from "../components/helpers/partialErase"
import { loadPathsFromLocalStorage, getCenterPoint, rotatePath, scalePath } from "../components/utils/pathOperations"
import { handlePdfDelete } from "../components/utils/itemsOperations"

const MoodboardContext = createContext()

export default function MoodboardProvider({ children }) {
    const [paths, setPaths] = useState(loadPathsFromLocalStorage() || [])
    const [items, setItems] = useLocalStorage("items", [])
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
    const [pathLine, setPathLine] = useState(3)
    const [rotation, setRotation] = useState([])
    const [scaling, setScaling] = useState([])
    const [selectedPath, setSelectedPath] = useState(null)

    const [itemText, setItemText] = useState('Text')
    const [itemColor, setItemColor] = useState('#f4b416')
    const [itemLink, setItemLink] = useState('')
    const [itemUrl, setItemUrl] = useState('')
    const [itemVideoUrl, setItemVideoUrl] = useState('')
    const [itemImageUrl, setItemImageUrl] = useState('')
    const [itemMapUrl, setItemMapUrl] = useState('')

    const [editingItem, setEditingItem] = useState(null)
    const [editingText, setEditingText] = useState(null)
    const [editingImage, setEditingImage] = useState(null)
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

    const [zoom, setZoom] = useState(10000)
    const [isEditingBoard, setIsEditingBoard] = useState(false)

    const [draggingSvg, setDraggingSvg] = useState(false)
    const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 })
    const [svgOffset, setSvgOffset] = useState({ x: 0, y: 0 })
    const [svgSize, setSvgSize] = useState({ width: 0, height: 0 })
    const [selectedRectId, setSelectedRectId] = useState(null)
    const [rectOffsets, setRectOffsets] = useState({})

    const [isResizing, setIsResizing] = useState(false)
    const [mousedownPoints, setMousedownPoints] = useState({ x: 0, y: 0 })
    const [rectangleSize, setRectangleSize] = useState({ width: 100, height: 100 })
    const [resizeIconPosition, setResizeIconPosition] = useState({ x: 0, y: 0 })
    const [isDraggingRect, setIsDraggingRect] = useState(false)

    const [isRotating, setIsRotating] = useState(false)
    const [angleOffset, setAngleOffset] = useState({ x: 0, y: 0 })

    const [info, setInfo] = useState(false)

    const divRef = useRef(null)
    const svgRef = useRef(null)
    const itemRef = useRef(null)
    const pathRef = useRef(null)

    const [pdfId, setPdfId] = useState("")

    const [selectedStars, setSelectedStars] = useState(0)

    const [historyErase, setHistoryErase] = useState([])
    const [positionErase, setPositionErase] = useState(0);

    const [tool, setTool] = useState("")
    const changeTool = (tool) => {
        setTool(tool)
    }
    const calculateDistance = (point1, point2) => {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
    const partialErase = (clickedPoint, pathPoints) => {
        // let closestPoint = null;
        let closestIndex = 0;
        let closestDistance = Number.MAX_VALUE;

        for (const [i, pathPoint] of pathPoints.entries()) {
            const distance = calculateDistance(clickedPoint, pathPoint);

            if (distance < closestDistance) {
                closestDistance = distance;
                // closestPoint = pathPoint;
                closestIndex = i;
            }
        }
        const p1 = pathPoints.slice(0, closestIndex);
        const p2 = pathPoints.slice(closestIndex);
        return ([p1, p2]);
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

    useEffect(() => {
        setPdfId(Date.now())
    }, [items])

    useEffect(() => {
        loadPathsFromLocalStorage()
        setHistoryErase((prevHistory) => [...prevHistory, { paths: paths }])
    }, [])

    useEffect(() => {
        savePathsToLocalStorage()
    }, [paths])

    function savePathsToLocalStorage() {
        const savingPaths = paths.map((path) => {
            return ({ ...path, path: [`M${path["path"].map((point) => `${point.x} ${point.y}`).join(' L')}`] })
        })
        localStorage.setItem('paths', JSON.stringify(savingPaths))
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
        const newItem = {
            id: itemId,
            x: 200,
            y: 200,
            text: itemText,
            color: itemColor,
            textColor: getTextColor(itemColor),
            link: itemLink,
            url: itemUrl,
            width: 140,
            height: 140,
            angle: 0,
            type: "box",
            font: "Roboto",
            fontStyle: false,
            fontSize: "10",
            rating: 0,
            showRating: "",
            showBorder: "",
            roundedCorners: "6",
            textAlignCenter: "",
            textAlignLeft: "",
            borderWidth: "",
            borderColor: ""
        }
        setItems((prevItems) => [...prevItems, newItem])
        setItemText('Text')
        setItemColor('#f4b416')
    }

    const handleAddBoxOnSpot = (e) => {
        e.preventDefault()
        const { clientX, clientY } = e.touches ? e.touches[0] : e
        const itemId = Date.now()
        const newItem = {
            id: itemId,
            x: clientX,
            y: clientY,
            text: itemText,
            color: itemColor,
            textColor: getTextColor(itemColor),
            link: itemLink,
            url: itemUrl,
            width: 140,
            height: 140,
            angle: 0,
            type: "box",
            font: "Roboto",
            fontStyle: false,
            fontSize: "10",
            rating: 0,
            showRating: "",
            showBorder: "",
            roundedCorners: "6",
            textAlignCenter: "",
            textAlignLeft: "",
            borderWidth: "",
            borderColor: ""
        }
        setItems((prevItems) => [...prevItems, newItem])
        setItemText('Text')
        setItemColor('#f4b416')
    }
    const handleAddGalleryBox = (color) => {
        const itemId = Date.now()
        const newItem = {
            id: itemId,
            x: 200,
            y: 200,
            text: color,
            color: color,
            textColor: getTextColor(itemColor),
            link: itemLink,
            url: itemUrl,
            width: 140,
            height: 140,
            type: "box",
            font: "Roboto",
            fontStyle: false,
            fontSize: "10",
            rating: 0,
            showRating: "",
            showBorder: "",
            roundedCorners: "6",
            textAlignCenter: "",
            textAlignLeft: "",
            borderWidth: "",
            borderColor: ""
        }
        setItems((prevItems) => [...prevItems, newItem])
        setItemText('Text')
        setItemColor('#f4b416')
    }
    const handleAddTodoBox = (text) => {
        const itemId = Date.now()
        const newItem = {
            id: itemId,
            x: 200,
            y: 200,
            text: text,
            //color: itemColor,
            color: "#940019",
            textColor: getTextColor(itemColor),
            link: itemLink,
            url: itemUrl,
            width: 140,
            height: 140,
            type: "box",
            font: "Roboto",
            fontStyle: false,
            fontSize: "10",
            rating: 0,
            showRating: "",
            showBorder: "",
            roundedCorners: "6",
            textAlignCenter: "",
            textAlignLeft: "",
            borderWidth: "",
            borderColor: ""
        }
        setItems((prevItems) => [...prevItems, newItem])
        setItemText('Text')
        setItemColor('#f4b416')
    }
    const handleAddDateBox = (text) => {
        console.log(text.toLocaleString())
        const itemId = Date.now()
        const newItem = {
            id: itemId,
            x: 200,
            y: 200,
            text: text.toLocaleString(),
            // color: itemColor,
            color: "#2e4757",
            textColor: "#ffffff",
            link: itemLink,
            url: itemUrl,
            width: 140,
            height: 140,
            type: "box",
            font: "Roboto",
            fontStyle: false,
            fontSize: "10",
            rating: 0,
            showRating: "",
            showBorder: "",
            roundedCorners: "6",
            textAlignCenter: "",
            textAlignLeft: "",
            borderWidth: "",
            borderColor: ""
        }
        setItems((prevItems) => [...prevItems, newItem])
        setItemText('Text')
        setItemColor('#f4b416')
    }
    const handleAddGalleryImage = (image) => {
        setItems([...items, image])
    }
    const handleAddGalleryLink = (link) => {
        const itemId = Date.now()
        const newItem = {
            id: itemId,
            x: 0,
            y: 0,
            text: link.content,
            color: itemColor,
            textColor: getTextColor(itemColor),
            link: link.content,
            url: link.link,
            width: 140,
            height: 140,
            type: "box",
            type: "box",
            font: "Roboto",
            fontStyle: false,
            fontSize: "10",
            rating: 0,
            showRating: "",
            showBorder: "",
            roundedCorners: "6",
            textAlignCenter: "",
            textAlignLeft: "",
            borderWidth: "",
            borderColor: ""
        }
        setItems((prevItems) => [...prevItems, newItem])
        setItemText('Text')
        setItemColor('#f4b416')
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            const newItem = {
                id: Date.now(),
                src: e.target.result,
                x: 100,
                y: 100,
                // width: 20,
                width: 100,
                height: "auto",
                opacity: 1,
                angle: 0,
                type: "image"
            }
            setItems((prevItems) => [...prevItems, newItem])
        }
        reader.readAsDataURL(file)
    }
    const handleImageDropUpload = (e) => {
        const file = e
        const reader = new FileReader()
        reader.onload = (e) => {
            const newItem = {
                id: Date.now(),
                src: e.target.result,
                x: 100,
                y: 100,
                width: 100,
                opacity: 1,
                angle: 0,
                height: "auto",
                type: "image"
            }
            setItems((prevItems) => [...prevItems, newItem])
        }
        reader.readAsDataURL(file)
    }
    const handleTextDropUpload = (e) => {
        const text = e.dataTransfer.getData('text')
        const youTubeUrl = e.dataTransfer.getData('url')
        const urlStart = "https://www.youtube.com/watch?v="
        let newText = youTubeUrl
        let youtubeCode = newText.replace(urlStart, "")
        if (youTubeUrl && youTubeUrl.includes(urlStart)) {
            // console.log(youtubeCode)
            handleDropVideo(youtubeCode)
        }
        if (text
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
                imageUrl: text,
                x: 100,
                y: 100,
                width: 100,
                type: "imageUrl"
            }
            setItems((prevItems) => [...prevItems, newItem])
        }
        if (text && !youTubeUrl && (text.startsWith('http') || text.startsWith('https'))) {
            const itemId = Date.now()
            const newItem = {
                id: itemId,
                x: 200,
                y: 200,
                text: text,
                color: "#ffffff",
                textColor: getTextColor(itemColor),
                link: "Web link",
                url: text,
                width: 140,
                height: 140,
                type: "box",
                font: "Roboto",
            }
            setItems((prevItems) => [...prevItems, newItem])
        }
        if (text && !youTubeUrl && (!text.startsWith('http') || !text.startsWith('https'))) {
            const itemId = Date.now()
            const newItem = {
                id: itemId,
                x: 200,
                y: 200,
                text: text,
                color: "#ffffff",
                textColor: getTextColor(itemColor),
                link: "",
                url: "",
                width: 140,
                height: 140,
                type: "box",
                font: "Roboto",
            }
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
                const newItem = {
                    id: pdfId,
                    x: 100,
                    y: 200,
                    width: "100",
                    height: "160",
                    type: "pdf"
                };
                setItems((prevItems) => [...prevItems, newItem]);
            };
            reader.readAsArrayBuffer(file);
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
        const newItem = {
            id: Date.now(),
            videoUrl: itemVideoUrl,
            x: 100,
            y: 200,
            width: 300,
            height: 250,
            type: "video"
        }
        setItems((prevItems) => [...prevItems, newItem])
        setItemVideoUrl('')
    }
    const handleDropVideo = (e) => {
        const newItem = {
            id: Date.now(),
            videoUrl: e,
            x: 100,
            y: 200,
            width: 300,
            height: 250,
            type: "video"
        }
        setItems((prevItems) => [...prevItems, newItem])
        setItemVideoUrl('')
    }
    const handleAddImage = (e) => {
        e.preventDefault()
        const newItem = {
            id: Date.now(),
            imageUrl: itemImageUrl,
            x: 100,
            y: 100,
            width: 100,
            height: "auto",
            type: "imageUrl"
        }
        setItems((prevItems) => [...prevItems, newItem])
    }
    const handleAddMap = (e) => {
        e.preventDefault()
        const newItem = {
            id: Date.now(),
            mapUrl: itemMapUrl,
            x: 100,
            y: 200,
            width: 300,
            height: 250,
            type: "mapUrl"
        }
        setItems((prevItems) => [...prevItems, newItem])
    }
    const resetPathsGroup = () => {
        setPaths(prevPaths => prevPaths.map(el => ({ ...el, group: "noGroup" })))
    }
    const handleSvgPointerDown = (e) => {
        resetPathsGroup()
        if (selectedPath || isEditingPath) {
            setSelectedPath(null)
            setIsEditingPath(false)
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
        // if (e.target.id === 'resize') {
        //     console.log(e.target.id)
        //     setIsResizing(true)
        //     setIsDraggingRect(false)
        //     const { clientX, clientY } = e.touches ? e.touches[0] : e
        //     setMousedownPoints({ x: clientX, y: clientY })
        // }
        if (!isDrawing && !isErasing && !isPartialErasing && !editingText) {
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            setSvgOffset({
                x: clientX - svgPosition.x,
                y: clientY - svgPosition.y,
            })
            setDraggingSvg(true)
        }
        // Start drawing
        if (isDrawing && !isErasing && !isPartialErasing) {
            if (e.targetTouches && e.targetTouches.length > 1) return
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const svgPoint = svgRef.current.createSVGPoint()
            svgPoint.x = clientX
            svgPoint.y = clientY
            const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse())
            setSelectedPath(null)
            setDrawing(true)
            setPaths([...paths, {
                id: Date.now(),
                group: "noGroup",
                color: pathColor || "#000000",
                line: +pathLine || 2,
                opacity: 1,
                path: [transformedPoint],
                closed: "",
                dashed: "",
                arrowStart: "",
                arrowEnd: ""
            }])
        }
    }

    const handleSvgPointerMove = (e) => {
        if (isResizing) {
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const currentPoints = { x: clientX, y: clientY };
            const dx = currentPoints.x - mousedownPoints.x;
            const dy = currentPoints.y - mousedownPoints.y;
            const item = items.find(el => el.id === selectedRectId)
            if (item.type === "box") {
                setRectangleSize((prevSize) => ({
                    width: Math.max(100, Math.min(600, prevSize.width + dx)),
                    height: Math.max(100, Math.min(600, prevSize.height + dy)),
                }))
            }
            if (item.type === "image") {
                setRectangleSize((prevSize) => ({
                    width: Math.max(50, Math.min(600, prevSize.width + dx)),
                    height: Math.max(50, Math.min(600, prevSize.height + dy)),
                }))
            }
            if (item.type === "imageUrl") {
                setRectangleSize((prevSize) => ({
                    width: Math.max(50, Math.min(600, prevSize.width + dx)),
                    height: Math.max(50, Math.min(600, prevSize.height + dy)),
                }))
            }
            if (item.type === "video") {
                setRectangleSize((prevSize) => ({
                    width: Math.max(50, Math.min(600, prevSize.width + dx)),
                    height: Math.max(50, Math.min(600, prevSize.height + dy)),
                }))
            }
            if (item.type === "mapUrl") {
                setRectangleSize((prevSize) => ({
                    width: Math.max(50, Math.min(400, prevSize.width + dx)),
                    height: Math.max(50, Math.min(400, prevSize.height + dy)),
                }))
            }
            if (item.type === "pdf") {
                setRectangleSize((prevSize) => ({
                    width: Math.max(50, Math.min(300, prevSize.width + dx)),
                    height: Math.max(50, Math.min(300, prevSize.height + dy)),
                }))
            }
            // handleResize(e, selectedRectId, rectangleSize)
            handleResize(e, selectedRectId)
            setMousedownPoints(currentPoints)
            updateResizeIcon(dx, dy)

        }

        if (isRotating) {
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const rect = items.find((r) => r.id === selectedRectId)
            const centerX = rect.x + rect.width / 2;
            const centerY = rect.y + rect.height / 2;
            const newAngle = Math.atan2(centerY - clientY, centerX - clientX);
            const angleDiff = newAngle - angleOffset.x;
            const newRotation = (angleDiff * 180) / Math.PI;
            setItems(prevItems =>
                prevItems.map(item => {
                    if (item.id === selectedRectId) {
                        return { ...item, angle: newRotation }
                    }
                    return item
                })
            )
        }

        if (!isDrawing && !drawing && draggingSvg && !isDraggingRect && !isResizing && !isRotating) {
            // e.preventDefault()
            const { clientX, clientY } = e.touches ? e.touches[0] : e
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
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const svgPoint = svgRef.current.createSVGPoint()
            svgPoint.x = clientX
            svgPoint.y = clientY
            const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse())
            const currentPath = { ...paths[paths.length - 1] }
            currentPath["path"].push(transformedPoint)
            const updatedPaths = [...paths]
            updatedPaths[paths.length - 1] = currentPath
            setPaths(updatedPaths)
            setHistoryErase((prevHistory) => [...prevHistory.slice(0, positionErase + 1), { paths: updatedPaths }]);
            setPositionErase((prevPosition) => prevPosition + 1);
        }
    }

    const handleSvgPointerUp = () => {
        setDraggingSvg(false)
        if (drawing) {
            setDrawing(false)
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
        if (isDrawing) return
        if (isErasing || isPartialErasing || isGrouping) {
            setIsErasing(false)
            setIsPartialErasing(false)
            setIsGrouping(false)
        }
        const rectItem = items.find(el => el.id === rectId)
        const rectType = rectItem.type
        if (e.target.id === 'resize') {
            // console.log(e.target.id)
            setIsResizing(true)
            setIsDraggingRect(false)
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            setMousedownPoints({ x: clientX, y: clientY })
        }
        if (e.target.id === 'rotate') {
            // console.log(e.target.id)
            setIsRotating(true)
            setIsDraggingRect(false)
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const rect = items.find((item) => item.id === rectId)
            const centerX = rect.x + rect.width / 2
            const centerY = rect.y + rect.height / 2
            const angle = Math.atan2(centerY - clientY, centerX - clientX)
            setAngleOffset({ x: angle })
        }
        if (rectType === "box" && editingText) {
            setIsDraggingRect(false)
        }
        setSelectedRectId(rectId)
        setIsDraggingRect(true)
        const { clientX, clientY } = e.touches ? e.touches[0] : e
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
        if (!draggingSvg || rectId !== selectedRectId || isResizing || isRotating) return
        if (isDraggingRect) {
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const rectOffset = rectOffsets[rectId]
            const rectIndex = items.findIndex((r) => r.id === rectId)
            const newX = Math.floor(clientX) - rectOffset.x
            const newY = Math.floor(clientY) - rectOffset.y
            const updatedRectangles = [...items]
            const updatedRect = { ...updatedRectangles[rectIndex], x: newX, y: newY }
            updatedRectangles[rectIndex] = updatedRect
            setItems(updatedRectangles)
        }
    }

    const handleRectPointerUp = (rectId) => {
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
                        return { ...item, width: size.width, height: size.height }
                    }
                    return item
                })
            )
        }
        if (resizable && resizable.type === "imageUrl") {
            setItems(prevItems =>
                prevItems.map(item => {
                    if (item.id === id) {
                        return { ...item, width: size.width, height: size.height }
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
        } if (resizable && resizable.type === "mapUrl") {
            setItems(prevItems =>
                prevItems.map(item => {
                    if (item.id === id) {
                        return { ...item, width: size.width, height: size.height }
                    }
                    return item
                })
            )
        } if (resizable && resizable.type === "pdf") {
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
        e.preventDefault()
        if (isDraggingRect || isDrawing || isEditingBoard || editingItem) { return }
        // if (isDrawing) {
        //     return
        // }
        if (isErasing && dragErasing) {
            handleDeletePath(id)
        }
        if (isPartialErasing && dragPartialErasing) {
            const { clientX: startX, clientY: startY } = e.touches ? e.touches[0] : e
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
        const { clientX: startX, clientY: startY } = e.touches ? e.touches[0] : e
        if (drawing || isDrawing) { return }
        if (!drawing || !isDrawing) {
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
            const { clientX: currentX, clientY: currentY } = e.touches ? e.touches[0] : e
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
        if (isGrouping) {
            resetPathsGroup()
            setSelectedPath(null)
            setIsEditingPath(false)
        }
        setIsGrouping(isGrouping => !isGrouping)
        setSelectedPath(null)
        setIsEditingPath(false)
        setIsDrawing(false)
        setIsEditingBoard(false)
        setIsErasing(false)
        setIsPartialErasing(false)
    }
    const handleGroupPaths = (added) => {
        setPaths(prevPaths => prevPaths.map(el => el.id === added ? { ...el, group: "activeGroup" } : el))
        setGroupDragging(true)
    }
    const handlePathGroupDrag = (e) => {
        const pathGroup = paths.filter(path => path.group === "activeGroup")
        const { clientX: startX, clientY: startY } = e.touches ? e.touches[0] : e
        const handleMouseMove = (e) => {
            e.preventDefault()
            const { clientX: currentX, clientY: currentY } = e.touches ? e.touches[0] : e
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
        const rotate = (amount === "increase") ? +10 : -10
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
        const scale = (amount === "increase") ? 1.2 : 0.8
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
        const rotate = (amount === "increase") ? +10 : -10
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
        const scale = (amount === "increase") ? 1.2 : 0.8
        const center = getCenterPoint(pathPoints)
        const updatedPaths = pathGroup.map((path) => {
            return ({
                ...path, path: scalePath(path["path"], center, scale)
            })
        })
        setScaling(scale)
        setPaths([...notGouped, ...updatedPaths])
    }
    const handleGroupLineChange = (e) => {
        const pathGroup = paths.filter(path => path.group === "activeGroup")
        const notGouped = paths.filter(path => path.group === "noGroup")
        const line = e.target.value
        const updatedPaths = pathGroup.map((path) => {
            return ({
                ...path, line: line
            })
        })
        setPathLine(line)
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
        setIsEditingPath(false)
        setIsDrawing(false)
        setIsErasing(false)
        setIsPartialErasing(false)
        setSelectedPath(null)
    }
    const handleDuplicatePath = (id) => {
        const pathToCopy = paths.find(path => path.id === id)
        const pathCopy = { ...pathToCopy, id: Date.now() }
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
        const boxCopy = { ...boxToCopy, id: Date.now() }
        setItems(prevItems => [...prevItems, boxCopy])
    }

    // Drawing
    const handleDrawing = () => {
        if (editingItem) return
        if (isDrawing || isEditingPath) {
            setSelectedPath(null)
            setIsEditingPath(false)
            setPathColor("#000000")
            setPathLine(2)
        }
        setIsDrawing(isDrawing => !isDrawing)
        setPathColor("#000000")
        setPathLine(3)
        setIsErasing(false)
        setIsPartialErasing(false)
        setIsEditingPath(false)
        setIsEditingPaths(false)
        setIsGrouping(false)
        setDragGrouping(false)
        resetPathsGroup()
        setIsEditingBoard(false)
    }
    const handleEraser = () => {
        setIsErasing(isErasing => !isErasing)
        setIsDrawing(false)
        setSelectedPath(null)
        setIsEditingPath(false)
        setIsEditingPaths(false)
        setIsGrouping(false)
        setDragGrouping(false)
        resetPathsGroup()
        setIsPartialErasing(false)
        setIsEditingBoard(false)
    }
    const handlePartialEraser = () => {
        setIsPartialErasing(isPartialErasing => !isPartialErasing)
        setIsDrawing(false)
        setSelectedPath(null)
        setIsEditingPath(false)
        setIsEditingPaths(false)
        setIsGrouping(false)
        setDragGrouping(false)
        resetPathsGroup()
        setIsErasing(false)
        setIsEditingBoard(false)
    }
    const handleDeletePath = (erased) => {
        const newPaths = paths.filter((path) => path.id !== erased)
        handleChangeErase(newPaths)
        setIsEditingPath(null)
        setSelectedPath(null)
        setPathColor("#000000")
        setPathLine(2)
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
    const handleLineWidthChange = (e, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, line: +e.target.value }
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
        setPathLine(2)
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

    const handleTodoAddToBoard = (text) => {
        if (text !== "") {
            handleAddTodoBox(text)
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
        if (isDrawing) return
        const itemType = items.find(el => el.id === id).type
        // console.log(itemType)
        switch (itemType) {
            case 'box':
                if (editingImage) {
                    setEditingImage(null)
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
                if (editingText) {
                    setEditingText(null)
                }
                setEditingImage({ status: true, id: id })
                setIsEditingBoard(true)
                handleImage()
                break;
            case 'imageUrl':
                if (editingText) {
                    setEditingText(null)
                }
                setEditingImage({ status: true, id: id })
                setIsEditingBoard(true)
                handleImage()
                break;
            case 'video':
                setEditingVideo({ status: true, id: id })
                setIsEditingBoard(true)
                handleVideo()
                break;
            case 'mapUrl':
                setEditingMap({ status: true, id: id })
                setIsEditingBoard(true)
                handleMap()
                break;
            case 'pdf':
                setEditingPdf({ status: true, id: id })
                setIsEditingBoard(true)
                setIsEditingPath(false)
                setIsEditingPaths(false)
                setEditingVideo(false)
                setEditingMap(false)
                setSelectedPath(null)
                setWrite(false)
                setImage(false)
                setVideo(false)
                setMap(false)
                break;
            default:
                break;
        }
        setEditingItem({ status: true, id: id })
        if (tool !== "") {
            setTool("")
        }
    }

    const handleStopEditItem = () => {
        if (editingText || isEditingPath || editingImage || editingVideo || editingMap || editingPdf || isEditingBoard || editingItem || tool !== "") {
            setEditingItem(null)
            setEditingText(null)
            setIsEditingBoard(false)
            setIsEditingPath(null)
            setIsEditingPaths(null)
            setEditingImage(null)
            setEditingVideo(null)
            setEditingMap(null)
            setEditingPdf(null)
            setSelectedPath(null)
            setWrite(false)
            setImage(false)
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
        setItems([])
        setPaths([])
        handlePdfDelete()
    }
    const handleClearPaths = () => {
        setPaths([])
    }
    const handleZoomIn = () => {
        setZoom(zoom => zoom -= 400)
    }
    const handleResetZoom = () => {
        setZoom(10000)
    }
    const handleZoomOut = () => {
        setZoom(zoom => zoom += 400)
    }
    const handleZoomSlider = (e) => {
        setZoom(e.target.value)
    }

    const handleEditingBoard = () => {
        setIsEditingBoard(isEditingBoard => !isEditingBoard)
        if (isEditingBoard) {
            setEditingText(null)
            setIsEditingBoard(false)
            setIsEditingPath(false)
            setIsEditingPaths(false)
            setSelectedPath(null)
            setWrite(false)
        }
        setIsDrawing(false)
        setIsErasing(false)
        setIsPartialErasing(false)
        setIsGrouping(false)
        setZoom(10000)
    }

    // const stopAllTopForms = () => {
    //     setIsEditingBoard(false)

    //     setEditingItem(null)
    //     setEditingText(null)
    //     setIsEditingPath(null)
    //     setIsEditingPaths(null)
    //     setSelectedPath(null)
    //     setEditingImage(null)
    //     setEditingVideo(null)
    //     setEditingMap(null)
    //     setEditingPdf(null)

    //     setWrite(false)
    //     setImage(false)
    //     setVideo(false)
    //     setMap(false)
    //     setPdf(false)
    // }


    return (
        <MoodboardContext.Provider
            value={{
                // Properties
                info,
                isDrawing,
                paths,
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
                editingVideo,
                editingMap,
                editingPdf,
                galleryItems,
                write,
                image,
                video,
                imageLink,
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
                isPartialErasing,
                tool,
                zoom,
                // Methods
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
                handleRectPointerDown,
                handleRectPointerMove,
                handleRectPointerUp,
                handleAddBoxOnSpot,
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
                handleGroupColorChange
            }}>
            {children}
        </MoodboardContext.Provider>
    )
}

export { MoodboardContext, MoodboardProvider }
