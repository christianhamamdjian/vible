import React, { useState, useEffect, useRef, useReducer, createContext } from "react"
import { useLocalStorage } from "../components/hooks/useLocalStorage"
import getTextColor from "../components/utils/getTextColor"
import { loadPathsFromLocalStorage, getCenterPoint, rotatePath, scalePath } from "../components/utils/pathOperations"
import { handlePdfDelete } from "../components/utils/itemsOperations"
import reducer from "../reducers/reducer"
import * as ACTIONS from '../reducers/actions'

const initialState = {
    itemText: "Text",
    itemColor: "#f4b416",
    itemLink: "",
    itemUrl: "",
    itemVideoUrl: "",
    itemImageUrl: "",
    itemMapUrl: "",
}

const MoodboardContext = createContext()

export default function MoodboardProvider({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)

    const addText = (text) => {
        dispatch({ type: ACTIONS.ADD_TEXT, payload: text })
    }
    const addColor = (color) => {
        dispatch({ type: ACTIONS.ADD_COLOR, payload: color })
    }
    const addLink = (link) => {
        dispatch({ type: ACTIONS.ADD_LINK, payload: link })
    }
    const addUrl = (url) => {
        dispatch({ type: ACTIONS.ADD_URL, payload: url })
    }
    const addVideoUrl = (videoUrl) => {
        dispatch({ type: ACTIONS.ADD_VIDEO_URL, payload: videoUrl })
    }
    const addImageUrl = (imageUrl) => {
        dispatch({ type: ACTIONS.ADD_IMAGE_URL, payload: imageUrl })
    }
    const addMapUrl = (mapUrl) => {
        dispatch({ type: ACTIONS.ADD_MAP_URL, payload: mapUrl })
    }

    // useState
    const [paths, setPaths] = useState(loadPathsFromLocalStorage() || [])
    const [items, setItems] = useLocalStorage("items", [])
    const [galleryItems, setGalleryItems] = useLocalStorage("galleryItems", [])

    const [isDrawing, setIsDrawing] = useState(false)
    const [drawing, setDrawing] = useState(false)
    const [isEditingPath, setIsEditingPath] = useState(null)
    const [isEditingPaths, setIsEditingPaths] = useState(false)
    const [isErasing, setIsErasing] = useState(false)

    const [pathColor, setPathColor] = useState('#000000')
    const [pathLine, setPathLine] = useState(2)
    const [rotation, setRotation] = useState([])
    const [scaling, setScaling] = useState([])
    const [selectedPath, setSelectedPath] = useState(null)

    const [editingText, setEditingText] = useState(null)
    const [editingImage, setEditingImage] = useState(null)

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

    const divRef = useRef(null)
    const svgRef = useRef(null)
    const itemRef = useRef(null)
    const pathRef = useRef(null)

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
            x: 100,
            y: 100,
            text: state.itemText,
            color: state.itemColor,
            link: state.itemLink,
            url: state.itemUrl,
            width: "140px",
            height: "60px",
            angle: 0,
            type: "box"
        }
        setItems((prevItems) => [...prevItems, newItem])
        addText('Text')
        addColor('#f4b416')
    }
    const handleAddGalleryBox = (color) => {
        const itemId = Date.now()
        const newItem = {
            id: itemId,
            x: 100,
            y: 100,
            text: state.itemText,
            color: color,
            link: state.itemLink,
            url: state.itemUrl,
            type: "box"
        }
        setItems((prevItems) => [...prevItems, newItem])
        addText('Text')
        addColor('#f4b416')
    }
    const handleAddTodoBox = (text) => {
        const itemId = Date.now()
        const newItem = {
            id: itemId,
            x: 100,
            y: 100,
            text: text,
            color: state.itemColor,
            link: state.itemLink,
            url: state.itemUrl,
            type: "box"
        }
        setItems((prevItems) => [...prevItems, newItem])
        addText('Text')
        addColor('#f4b416')
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
            text: state.itemText,
            color: state.itemColor,
            link: link.content,
            url: link.link,
            type: "box"
        }
        setItems((prevItems) => [...prevItems, newItem])
        addText('Text')
        addColor('#f4b416')
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
                width: "100",
                height: "auto",
                type: "image"
            }
            setItems((prevItems) => [...prevItems, newItem])
        }
        reader.readAsDataURL(file)
    }

    const handleAddVideo = (e) => {
        e.preventDefault()
        const newItem = {
            id: Date.now(),
            videoUrl: state.itemVideoUrl,
            x: 100,
            y: 100,
            type: "video"
        }
        setItems((prevItems) => [...prevItems, newItem])
    }
    const handleAddImage = (e) => {
        e.preventDefault()
        const newItem = {
            id: Date.now(),
            imageUrl: state.itemImageUrl,
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
            mapUrl: state.itemMapUrl,
            x: 100,
            y: 100,
            type: "mapUrl"
        }
        setItems((prevItems) => [...prevItems, newItem])
    }

    const handleSvgPointerDown = (e) => {
        if (editingText) return
        if (selectedPath || isEditingPath) {
            setSelectedPath(null)
            setIsEditingPath(false)
        }
        if (!isDrawing && !editingText && !selectedPath) {
            e.preventDefault()
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const svgRect = svgRef.current.getBoundingClientRect()
            const divRect = divRef.current.getBoundingClientRect()
            setSvgOffset({
                x: clientX - svgRect.left + divRect.left - svgPosition.x,
                y: clientY - svgRect.top + divRect.top - svgPosition.y,
            })
            setDraggingSvg(true)
        }

        // Start drawing
        if (isDrawing) {
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const svgPoint = svgRef.current.createSVGPoint()
            svgPoint.x = Math.floor(clientX)
            svgPoint.y = Math.floor(clientY)
            const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse())
            setSelectedPath(null)
            setDrawing(true)
            setPaths([...paths, { id: Date.now(), color: pathColor || "#000000", line: pathLine || 2, path: [transformedPoint] }])
        }
    }

    const handleSvgPointerMove = (e) => {
        if (!isDrawing && !drawing && draggingSvg && !selectedRectId) {
            e.preventDefault()
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const divRect = svgRef.current.getBoundingClientRect()
            const maxX = svgSize.width - divRect.width
            const maxY = svgSize.height - divRect.height
            let newX = Math.floor(clientX) - svgOffset.x - divRect.left
            let newY = Math.floor(clientY) - svgOffset.y - divRect.top
            newX = Math.min(0, Math.max(newX, maxX))
            newY = Math.min(0, Math.max(newY, maxY))
            setSvgPosition({ x: newX, y: newY })
        }

        // Drawing
        if (isDrawing && drawing && !draggingSvg && !isErasing && !selectedRectId) {
            const { clientX, clientY } = e.touches ? e.touches[0] : e
            const svgPoint = svgRef.current.createSVGPoint()
            svgPoint.x = Math.floor(clientX)
            svgPoint.y = Math.floor(clientY)
            const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse())
            const currentPath = { ...paths[paths.length - 1] }
            currentPath["path"].push(transformedPoint)
            const updatedPaths = [...paths]
            updatedPaths[paths.length - 1] = currentPath
            setPaths(updatedPaths)
        }
    }

    const handleSvgPointerUp = (e) => {
        setDraggingSvg(false)
        if (drawing) {
            setDrawing(false)
        }
    }

    const handleRectPointerDown = (e, rectId) => {
        if (isDrawing || editingText) return
        setSelectedRectId(rectId)
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

    const handleRectPointerUp = (rectId) => {
        setRectOffsets((prevOffsets) => {
            const { [rectId]: deletedOffset, ...restOffsets } = prevOffsets
            return restOffsets
        })
        setSelectedRectId(null)
    }


    //Paths
    const handlePathClick = (index, id) => {
        if (isErasing) {
            handleDeletePath(id)
        }
        setSelectedPath(index)
        setIsEditingPath({ status: true, id: id })
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

    // Image
    const handleEditImage = (id) => {
        setEditingImage({ status: true, id: id })
    }
    const handleStopEditImage = () => {
        setEditingImage(null)
    }

    // Drawing
    const handleDrawing = () => {
        if (isDrawing || isEditingPath) {
            setSelectedPath(null)
            setIsEditingPath(false)
        }
        setIsDrawing(isDrawing => !isDrawing)
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
        setIsEditingPath(null)
        setSelectedPath(null)
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
        // setItemText(e.target.value)
        addText(e.target.value)
    }
    const handleItemColor = (e) => {
        addColor(e.target.value)
    }
    const handleItemLink = (e) => {
        addLink(e.target.value)
    }
    const handleItemUrl = (e) => {
        addUrl(e.target.value)
    }
    const handleItemVideoUrl = (e) => {
        addVideoUrl(e.target.value)
    }
    const handleItemImageUrl = (e) => {
        addImageUrl(e.target.value)
    }
    const handleItemMapUrl = (e) => {
        addMapUrl(e.target.value)
    }
    const handleEditBox = (e, id) => {
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
    const handleStopEditBox = () => {
        if (editingText || isEditingPath) {
            setEditingText(null)
            setIsEditingBoard(false)
            setIsEditingPath(false)
            setIsEditingPaths(false)
            setSelectedPath(null)
            setWrite(false)
        }
    }

    // Toggle functions
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
        setZoom(zoom => zoom -= 100)
    }
    const handleZoomOut = () => {
        setZoom(zoom => zoom += 100)
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

                //useReducer state
                ...state,
                itemText: state.itemText,
                itemColor: state.itemColor,
                itemLink: state.itemLink,
                itemUrl: state.itemUrl,
                itemVideoUrl: state.itemVideoUrl,
                itemImageUrl: state.itemImageUrl,
                itemMapUrl: state.itemMapUrl,
                addText,
                addColor,
                addLink,
                addUrl,
                addVideoUrl,
                addImageUrl,
                addMapUrl,

                // Properties
                isDrawing,
                paths,
                isErasing,
                pathColor,
                pathLine,
                svgRef,
                pathRef,
                itemRef,
                items,
                editingText,
                editingImage,
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
                setItems,
                todosShow,
                svgPosition,
                divRef,
                draggingSvg,
                selectedRectId,
                // Methods
                handleSvgPointerMove,
                handlePathClick,
                handlePathDrag,
                handleAddBox,
                handleImageUpload,
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
                handleStopEditBox,
                handleEditImage,
                handleStopEditImage,
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
            }}>
            {children}
        </MoodboardContext.Provider>
    )
}

export { MoodboardContext, MoodboardProvider }
