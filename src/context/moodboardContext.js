import React, { useState, useEffect, useRef, createContext } from "react"
import { useLocalStorage } from "../components/hooks/useLocalStorage"
import getTextColor from "../components/utils/getTextColor"
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
    const [dragErasing, setDragErasing] = useState(false)

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
    // const [rectangleRotation, setRectangleRotation] = useState(0)
    // const [rotatePoints, setRotatePoints] = useState({ x: 0, y: 0 })
    const [angleOffset, setAngleOffset] = useState({ x: 0, y: 0 })

    const [info, setInfo] = useState(false)

    const divRef = useRef(null)
    const svgRef = useRef(null)
    const itemRef = useRef(null)
    const pathRef = useRef(null)

    const [pdfId, setPdfId] = useState("")

    useEffect(() => {
        setPdfId(Date.now())
    }, [items])

    useEffect(() => {
        loadPathsFromLocalStorage()
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
            link: itemLink,
            url: itemUrl,
            width: 140,
            height: 60,
            angle: 0,
            type: "box"
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
            link: itemLink,
            url: itemUrl,
            width: 140,
            height: 60,
            angle: 0,
            type: "box"
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
            link: itemLink,
            url: itemUrl,
            width: 140,
            height: 60,
            type: "box"
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
            color: itemColor,
            link: itemLink,
            url: itemUrl,
            width: 140,
            height: 60,
            type: "box"
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
            link: link.content,
            url: link.link,
            type: "box"
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
                width: "10",
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
                width: "10",
                height: "auto",
                type: "image"
            }
            setItems((prevItems) => [...prevItems, newItem])
        }
        reader.readAsDataURL(file)
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
    }
    const handleAddImage = (e) => {
        e.preventDefault()
        const newItem = {
            id: Date.now(),
            imageUrl: itemImageUrl,
            x: 100,
            y: 100,
            width: "100",
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

    const handleSvgPointerDown = (e) => {
        // if (editingText) return
        if (selectedPath || isEditingPath) {
            setSelectedPath(null)
            setIsEditingPath(false)
        }
        if (isErasing) {
            setDragErasing(true)
            return
        }
        if (e.target.id === 'resize') {
            setIsResizing(true)
            setIsDraggingRect(false)
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            setMousedownPoints({ x: clientX, y: clientY })
        }

        if (!isDrawing && !editingText && !selectedPath && !isErasing) {
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            setSvgOffset({
                x: clientX - svgPosition.x,
                y: clientY - svgPosition.y,
            })
            setDraggingSvg(true)
        }

        // Start drawing
        if (isDrawing && !isErasing) {
            if (e.targetTouches && e.targetTouches.length > 1) return
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const svgPoint = svgRef.current.createSVGPoint()
            svgPoint.x = clientX
            svgPoint.y = clientY
            const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse())
            setSelectedPath(null)
            setDrawing(true)
            setPaths([...paths, { id: Date.now(), color: pathColor || "#000000", line: pathLine || 2, path: [transformedPoint] }])
        }
    }

    const handleSvgPointerMove = (e) => {
        if (isResizing) {
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const currentPoints = { x: clientX, y: clientY };
            const dx = currentPoints.x - mousedownPoints.x;
            const dy = currentPoints.y - mousedownPoints.y;

            setRectangleSize((prevSize) => ({
                width: prevSize.width + dx,
                height: prevSize.height + dy,
            }));

            handleResize(e, selectedRectId, rectangleSize)
            setMousedownPoints(currentPoints);
            updateResizeIcon(dx, dy);
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
        if (isResizing) {
            setIsResizing(false)
        }
        if (isRotating) {
            setIsRotating(false)
        }
    }

    const handleRectPointerDown = (e, rectId) => {
        // if (isDrawing || editingText || isResizing || isRotating) return
        if (isDrawing) return

        if (e.target.id === 'rotate') {
            setIsRotating(true)
            setIsDraggingRect(false)
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const rect = items.find((item) => item.id === rectId)
            const centerX = rect.x + rect.width / 2
            const centerY = rect.y + rect.height / 2
            const angle = Math.atan2(centerY - clientY, centerX - clientX)
            setAngleOffset({ x: angle })
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
        if (!draggingSvg || rectId !== selectedRectId) return
        if (isResizing || isRotating) return
        if (isDraggingRect && !isResizing || !isRotating) {
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
        if (isResizing) {
            setIsResizing(false)
        }
        if (isRotating) {
            setIsRotating(false)
        }
    }

    const updateResizeIcon = (dx, dy) => {
        setResizeIconPosition((prevPosition) => ({
            x: prevPosition.x + dx,
            y: prevPosition.y + dy,
        }));
    }

    const handleResize = (e, id, size) => {
        const resizable = items.find(item => item.id === id)
        if (resizable.type === "image" && size.width >= 5 && resizable.height <= 200) {
            setItems(prevItems =>
                prevItems.map(item => {
                    if (item.id === id) {
                        return { ...item, width: size.width, height: size.height }
                    }
                    return item
                })
            )
        }
        if (resizable.type === "box" && size.width >= 100 && size.height >= 100) {
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

    //Paths
    const handlePathClick = (e, index, id) => {
        setSelectedPath(index)
        setIsEditingPath({ status: true, id: id })
    }
    const handlePathSelect = (e, index, id) => {
        e.preventDefault()
        if (isDrawing) {
            return
        }
        if (isErasing && dragErasing) {
            handleDeletePath(id)
        }
        if (!isErasing && !dragErasing) {
            setSelectedPath(index)
            setIsEditingPath({ status: true, id: id })
        }
    }

    const handlePathDrag = (e, index, id) => {
        e.stopPropagation()
        if (drawing || isDrawing) { return }
        if (!drawing || !isDrawing) {
            setSelectedPath(index)
            setIsEditingPath({ status: true, id: id })
        }
        if (isErasing) {
            handleDeletePath(id)
        }
        const { clientX: startX, clientY: startY } = e.touches ? e.touches[0] : e

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

    const handleEditPaths = () => {
        setIsEditingPaths(isEditingPaths => !isEditingPaths)
        setIsEditingPath(false)
        setIsDrawing(false)
        setIsErasing(false)
        setSelectedPath(null)
    }

    // Text Box
    const handleItemChange = (e, id, property) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, [property]: e.target.value }
                }
                return item
            })
        )
    }

    // Drawing
    const handleDrawing = () => {
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
        setIsEditingPath(false)
        setIsEditingPaths(false)
    }
    const handleEraser = () => {
        setIsErasing(isErasing => !isErasing)
        setIsDrawing(false)
        setSelectedPath(null)
        setIsEditingPath(false)
        setIsEditingPaths(false)
    }
    const handleDeletePath = (erased) => {
        setPaths((prevPaths) => prevPaths.filter((path) => path.id !== erased))
        if (paths.length === 1) {
            setIsErasing(false)
        }
        setIsEditingPath(null)
        setSelectedPath(null)
        setPathColor("#000000")
        setPathLine(2)
    }
    const handleLineColor = (e) => {
        setPathColor(e.target.value)
    }
    const handleLineWidth = (e) => {
        setPathLine(e.target.value)
    }
    const handleLineWidthChange = (e, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, line: e.target.value }
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
    }

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

    // Editing
    const handleEditImage = (e, id) => {
        setEditingImage({ status: true, id: id })
        setIsEditingBoard(true)
        handleImage()
    }

    const handleEditBox = (id) => {
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
    }
    const handleEditVideo = (id) => {
        setEditingVideo({ status: true, id: id })
        setIsEditingBoard(true)
        handleVideo()
    }
    const handleEditMap = (id) => {
        setEditingMap({ status: true, id: id })
        setIsEditingBoard(true)
        handleMap()
    }
    const handleEditPdf = (id) => {
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
    }
    const handleStopEditItem = () => {
        if (editingText || isEditingPath || editingImage || editingVideo || editingMap || editingPdf || isEditingBoard) {
            setEditingText(null)
            setIsEditingBoard(null)
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
        }
    }

    // Toggle functions
    const handleInfo = () => {
        setInfo(info => !info)
    }
    const handleDraw = () => {
        setDraw(draw => !draw)
        isDrawing && setIsDrawing(false)
        isErasing && setIsErasing(false)
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
    const handleZoomOut = () => {
        setZoom(zoom => zoom += 400)
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
        setZoom(10000)
    }

    const handleTodosToggle = () => {
        setTodosShow(todosShow => !todosShow)
    }

    return (
        <MoodboardContext.Provider
            value={{
                // Properties
                info,
                isDrawing,
                paths,
                isErasing,
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
                // Methods
                handleInfo,
                handleSvgPointerMove,
                handlePathClick,
                handlePathDrag,
                handlePathSelect,
                handleAddBox,
                handleImageUpload,
                handlePdfUpload,
                handleImageDropUpload,
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
                handleEditBox,
                handleEditImage,
                handleEditVideo,
                handleEditMap,
                handleEditPdf,
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
                handleEditingBoard,
                handleTodosToggle,
                handleLineWidthChange,
                handleLineColorChange,
                handleLineFillChange,
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
                handleAddBoxOnSpot
            }}>
            {children}
        </MoodboardContext.Provider>
    )
}

export { MoodboardContext, MoodboardProvider }
