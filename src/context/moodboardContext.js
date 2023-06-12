import React, { useState, useRef } from "react";
import { useLocalStorage } from "../components/hooks/useLocalStorage";
import jsPDF from "jspdf"

const MoodboardContext = React.createContext();
export default function MoodboardProvider({ children }) {

    const [isDrawing, setIsDrawing] = useState(false)
    const [currentPath, setCurrentPath] = useState({ x: 0, y: 0 })
    const [paths, setPaths] = useLocalStorage("paths", [])
    const [newPathPosition, setNewPathPosition] = useState({})
    const [isEditingPath, setIsEditingPath] = useState(null)
    const [isErasing, setIsErasing] = useState(false)
    const [color, setColor] = useState('#aabbcc')
    const [line, setLine] = useState(2)
    const [freezeScreen, setFreezeScreen] = useState(false)
    const [rotation, setRotation] = useState(0);
    const [scale, setScale] = useState(1);

    const [items, setItems] = useLocalStorage("items", [])
    const [itemText, setItemText] = useState('Text');
    const [itemColor, setItemColor] = useState('#aabbcc')
    const [itemLink, setItemLink] = useState('')
    const [itemUrl, setItemUrl] = useState('')
    const [itemVideoUrl, setItemVideoUrl] = useState('')
    const [itemImageUrl, setItemImageUrl] = useState('')
    const [itemMapUrl, setItemMapUrl] = useState('')

    const [selectedItem, setSelectedItem] = useState(null)
    const [editingText, setEditingText] = useState(null)
    const [editingImage, setEditingImage] = useState(null)
    const [draggingItem, setDraggingItem] = useState(false)
    const [dragOffsetItem, setDragOffsetItem] = useState({ x: 0, y: 0 })

    const [galleryItems, setGalleryItems] = useLocalStorage("galleryItems", [])
    const [galleryType, setGalleryType] = useState('color')
    const [galleryContent, setGalleryContent] = useState("#000000")
    const [galleryLink, seGalleryLink] = useState('')
    const [galleryError, setGalleryError] = useState('')
    const [galleryShow, setGalleryShow] = useState(false)

    const [selectedPath, setSelectedPath] = useState(null);
    const [draggingPath, setDraggingPath] = useState(false);
    const [dragOffsetPath, setDragOffsetPath] = useState({ x: 0, y: 0 })
    const [isPathMoving, setIsPathMoving] = useState(false)

    const [draw, setDraw] = useState(false)
    const [write, setWrite] = useState(false)
    const [image, setImage] = useState(false)
    const [imageLink, setImageLink] = useState(false)
    const [video, setVideo] = useState(false)
    const [map, setMap] = useState(false)
    const [isMovingObjects, setIsMovingObjects] = useState(false)

    const svgRef = useRef(null)
    const pathRef = useRef(null)

    const [zoom, setZoom] = useState(2000)
    const [editingBoard, setEditingBoard] = useState(false)

    // Add Elements

    const handleAddBox = (event) => {
        event.preventDefault();
        const itemId = Date.now();
        const newBox = { id: itemId, x: 0, y: 0, text: itemText, color: itemColor, link: itemLink, url: itemUrl, type: "box" };
        setItems([...items, newBox]);
        setItemText('Text');
        setItemColor('#aabbcc');
    };
    const handleAddGalleryBox = (color) => {
        const itemId = Date.now();
        const newBox = { id: itemId, x: 0, y: 0, text: itemText, color: color, link: itemLink, url: itemUrl, type: "box" };
        setItems([...items, newBox]);
        setItemText('Text');
        setItemColor('#aabbcc');
    };
    const handleAddGalleryImage = (image) => {
        setItems([...items, image]);
    }
    const handleAddGalleryLink = (link) => {
        const itemId = Date.now();
        const newBox = { id: itemId, x: 0, y: 0, text: itemText, color: color, link: link.content, url: link.link, type: "box" };
        setItems([...items, newBox]);
        setItemText('Text');
        setItemColor('#aabbcc');
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const newItem = {
                id: Date.now(),
                src: e.target.result,
                x: 0,
                y: 0,
                width: "100",
                type: "image"
            };
            setItems((prevItems) => [...prevItems, newItem]);
        };
        reader.readAsDataURL(file);
    };
    function handlePdfUpload(event) {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const reader = new FileReader();
            reader.onload = (e) => {
                const pdfData = e.target.result;
                const newItem = {
                    id: Date.now(),
                    data: pdfData,
                    x: 0,
                    y: 0,
                    width: "100",
                    type: "pdf"
                };
                setItems((prevItems) => [...prevItems, newItem]);
            };
            reader.readAsDataURL(file);
        } else {
            console.log('Please select a PDF file.');
        }
    }
    const handleImageDropUpload = (e) => {
        const file = e;
        const reader = new FileReader();
        reader.onload = (e) => {
            const newItem = {
                id: Date.now(),
                src: e.target.result,
                x: 0,
                y: 0,
                width: "100",
                type: "image"
            };
            setItems((prevItems) => [...prevItems, newItem]);
        };
        reader.readAsDataURL(file);
    };
    const handleAddVideo = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            videoUrl: itemVideoUrl,
            x: 0,
            y: 0,
            type: "video"
        }
        setItems((prevItems) => [...prevItems, newItem]);
    }
    const handleAddImage = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            imageUrl: itemImageUrl,
            x: 0,
            y: 0,
            width: "100",
            type: "imageUrl"
        }
        setItems((prevItems) => [...prevItems, newItem]);
    }
    const handleAddMap = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            mapUrl: itemMapUrl,
            x: 0,
            y: 0,
            type: "mapUrl"
        }
        setItems((prevItems) => [...prevItems, newItem]);
    }



    // Mouse Down
    const handleMouseDown = (event, element) => {
        // event.stopPropagation();

        // Start dragging objects
        if (element && !isDrawing && element.type !== "path") {
            setDraggingItem(true);
            const { clientX, clientY } = event.touches ? event.touches[0] : event;
            const { left, top } = event.currentTarget.getBoundingClientRect()
            setDragOffsetItem({ x: clientX - left, y: clientY - top });
            const selectedItem = items.find(item => item.id === element)
            setSelectedItem(selectedItem)
        }

        //Start dragging path
        if (!isDrawing && !isErasing && element && element.type === "path") {
            // event.stopPropagation();
            //setSelectedPath(element)
            setDraggingPath(true);
            setIsEditingPath({ status: true, id: element.id })
            // let svg = svgRef.current
            let svg = event.target
            let CTM = svg.getScreenCTM();
            let x = CTM.e / CTM.a
            let y = CTM.f / CTM.d
            const { clientX, clientY } = event.touches ? event.touches[0] : event;
            //let currentPath = pathRef.current
            //setSelectedPathTag(paths.find(path => path.id === path.id))
            //const { x, y } = pathRef.current.getBBox();
            //or
            setSelectedPath(paths.find(path => path.id === element.id))
            if (element.angle > 0) {
                setDragOffsetPath({ x: element.x, y: element.y });
            } else {
                setDragOffsetPath({ x: parseInt(clientX - x), y: parseInt(clientY - y) });
            }
        }

        // Start drawing
        if (isDrawing) {
            const { clientX, clientY } = event;
            const svg = svgRef.current;
            const pt = svg.createSVGPoint();
            pt.x = clientX;
            pt.y = clientY;
            const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
            setCurrentPath(`M${svgPoint.x},${svgPoint.y}`);
        }
    };
    // Différence entre selectedPath, currentPath, selectedPathTag et newPathPosition
    // Mouse Moving
    const handleMouseMove = (event) => {
        // Moving objects
        if (selectedItem && !selectedPath) {
            if (!draggingItem) return;
            const { x, y } = dragOffsetItem
            const { left, top } = event.currentTarget.getBoundingClientRect()
            const { clientX, clientY } = event.touches ? event.touches[0] : event;
            setItems((prevItems) =>
                prevItems.map((item) => {
                    return item.id === selectedItem.id ? { ...item, x: clientX - left - x, y: clientY - top - y } : item
                })
            );
        }

        // Moving selected path
        if (selectedPath && !selectedItem) {
            if (!draggingPath) return;
            // console.log(selectedPath)
            // let svg = event.target
            // let path = pathRef.current
            // let CTM = svg.getScreenCTM();
            const { clientX, clientY } = event.touches ? event.touches[0] : event;
            const { x: offsetX, y: offsetY } = dragOffsetPath;
            const newX = clientX - offsetX;
            const newY = clientY - offsetY;
            setNewPathPosition({ x: newX, y: newY })
            setPaths((prevPaths) =>
                prevPaths.map((path) => {
                    return (path.id === selectedPath.id) ? { ...path, x: newX, y: newY } : path
                })
            );

        }

        // Drawing
        if (!isDrawing) return;
        if (isDrawing && currentPath && !isErasing && !selectedItem) {
            if (event.buttons !== 1) return;
            const { clientX, clientY } = event;
            const svg = svgRef.current;
            const pt = svg.createSVGPoint();
            pt.x = clientX;
            pt.y = clientY;
            const svgPoint = pt.matrixTransform(svg.getScreenCTM().inverse());
            setCurrentPath((prevDrawing) => `${prevDrawing} L${svgPoint.x},${svgPoint.y}`);
        }

        // prevent screen from scrolling when in action
        if (selectedItem || selectedPath || isDrawing) {
            setFreezeScreen(true)
        }
    };

    // Mouse Up
    const handleMouseUp = (event) => {
        event.stopPropagation();

        // Creating the path and storing it
        if (isDrawing) {
            setPaths((prevPaths) => [...prevPaths, {
                id: Date.now(),
                type: "path",
                path: currentPath,
                color, line,
                angle: 0,
                scale: 1,
                x: 0,
                y: 0,
            }]);
        }

        // Saving the modifications on a selected path
        if (selectedPath && !selectedItem) {
            const { width, height } = pathRef.current.getBBox()
            setPaths((prevPaths) =>
                prevPaths.map((path) => {
                    return (
                        path.id === selectedPath.id) ?
                        {
                            ...path,
                            x: newPathPosition.x,
                            y: newPathPosition.y,
                            scale: scale,
                            angle: rotation,
                            width,
                            height
                        } :
                        path
                })
            );
        }

        // Resetting everything
        setFreezeScreen(false)
        setSelectedItem(null)
        setSelectedPath(null)
        setDraggingItem(false);
        setDraggingPath(false);
        setDragOffsetItem({ x: 0, y: 0 });
        setDragOffsetPath({ x: 0, y: 0 });
        setCurrentPath(null);
        setNewPathPosition(null)
        setScale(1)
        setRotation(0)
    };

    // Center coordinates for rotation and scaling
    const getDrawingCenter = () => {
        const path = pathRef.current;
        if (!path) return { x: 0, y: 0 };
        const pathBBox = path.getBBox();
        const centerX = scale > 1 ? (pathBBox.x + pathBBox.width / 2) * scale : pathBBox.x + pathBBox.width / 2;
        const centerY = scale > 1 ? (pathBBox.y + pathBBox.height / 2) * scale : pathBBox.y + pathBBox.height / 2;
        return { x: centerX, y: centerY };
    };

    // Helper functions

    const handleDeleteItem = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setEditingText(null)
        setEditingImage(null)
    };
    const handleItemText = (event) => {
        setItemText(event.target.value);
    };
    const handleItemColor = (event) => {
        setItemColor(event.target.value);
    };
    const handleItemLink = (event) => {
        setItemLink(event.target.value);
    };
    const handleItemUrl = (event) => {
        setItemUrl(event.target.value);
    };
    const handleItemVideoUrl = (event) => {
        setItemVideoUrl(event.target.value);
    };
    const handleItemImageUrl = (event) => {
        setItemImageUrl(event.target.value);
    };
    const handleItemMapUrl = (event) => {
        setItemMapUrl(event.target.value);
    };
    const handleEditBox = (id) => {
        setEditingText({ status: true, id: id })
    }
    const handleStopEditBox = () => {
        setEditingText(null)
    }

    // Text Box

    const handleItemTextChange = (event, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, text: event.target.value };
                }
                return item;
            })
        )
    };
    const handleItemColorChange = (event, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, color: event.target.value };
                }
                return item;
            })
        );
    };
    const handleItemLinkChange = (event, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, link: event.target.value };
                }
                return item;
            })
        );
    };

    // Image

    const handleItemUrlChange = (event, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, url: event.target.value };
                }
                return item;
            })
        );
    };
    const handleEditImage = (id) => {
        setEditingImage({ status: true, id: id })
    }
    const handleStopEditImage = () => {
        setEditingImage(null)
    }
    const handleImageChange = (event, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, width: event.target.value };
                }
                return item;
            })
        );
    };

    // Drawing

    // const getCursorPositionDrawing = (event) => {
    //     const { left, top } = svgRef.current.getBoundingClientRect();
    //     const x = (event.clientX || event.touches[0].clientX) - left;
    //     const y = (event.clientY || event.touches[0].clientY) - top;
    //     return { x, y };
    // };
    const handleDrawing = () => {
        setIsDrawing(isDrawing => !isDrawing)
        setIsErasing(false);
        setIsPathMoving(false)
    }
    const handleMovePath = () => {
        setIsPathMoving(isPathMoving => !isPathMoving)
        setIsErasing(false);
        setIsDrawing(false)
    }
    const handleEraser = () => {
        setIsErasing(isErasing => !isErasing);
        setIsDrawing(false)
        setIsPathMoving(false)
    }
    const handleDeletePath = (erased) => {
        setPaths((prevPaths) => prevPaths.filter((path) => path.path !== erased.path));
    }
    const handelLineColor = (event) => {
        setColor(event.target.value)
    }
    const handelLineWidth = (event) => {
        setLine(event.target.value)
    }
    const handelLineWidthChange = (event, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, line: event.target.value };
                }
                return path;
            })
        )
    };
    const handelLineColorChange = (event, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, color: event.target.value };
                }
                return path;
            })
        )
    };
    const handelLineAngleChange = (event, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, angle: parseInt(event.target.value) };
                }
                return path;
            })
        )
        setRotation(parseInt(event.target.value));
    };
    const handleScaleChange = (event, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, scale: parseInt(event.target.value) };
                }
                return path;
            })
        )
        setScale(parseInt(event.target.value))
    };
    const stopLineEditing = () => {
        const { width, height } = pathRef.current.getBBox()
        setPaths((prevPaths) =>
            prevPaths.map((path) => {
                return (
                    path.id === pathRef.current.id) ?
                    {
                        ...path,
                        x: newPathPosition.x,
                        y: newPathPosition.y,
                        scale: scale,
                        angle: rotation,
                        width,
                        height
                    } :
                    path
            })
        );
        setIsEditingPath(null)
    }

    const handlePdfDownload = () => {
        const svgElement = document.getElementById('my-svg');
        const fileName = 'vible-file.pdf';

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const svgSize = svgElement.getBoundingClientRect();

        canvas.width = svgSize.width;
        canvas.height = svgSize.height;

        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');

        img.onload = function () {
            context.clearRect(0, 0, svgSize.width, svgSize.height);
            context.drawImage(img, 0, 0);

            const pdf = new jsPDF('p', 'pt', [svgSize.width, svgSize.height]);
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, svgSize.width, svgSize.height);
            pdf.save(fileName);
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    };

    // Gallery

    const addGalleryItem = (item) => {
        setGalleryItems([...galleryItems, item]);
    };

    const deleteGalleryItem = (index) => {
        const newItems = [...galleryItems];
        newItems.splice(index, 1);
        setGalleryItems(newItems);
    };
    const modelGalleryItem = {
        type: galleryType,
        content: galleryContent,
        link: galleryLink
    };
    const handleGallerySubmit = (e) => {
        e.preventDefault();
        setGalleryError('');
        let newItem;
        switch (galleryType) {
            case 'color':
                if (!galleryContent.startsWith('#')) {
                    setGalleryError('Please select a valid color.');
                    return;
                }
                newItem = { ...modelGalleryItem };
                break;
            case 'image':
                if (!galleryContent.startsWith('data:image/')) {
                    setGalleryError('Please select a valid image file (png, jpg, jpeg).');
                    return;
                }
                newItem = { ...modelGalleryItem };
                break;
            case 'link':
                if (!/^https?:\/\//i.test(galleryLink)) {
                    setGalleryError('Please enter a valid URL (include http:// or https://).');
                    return;
                }
                newItem = { ...modelGalleryItem };
                break;
            default:
                break;
        }
        addGalleryItem(newItem);
        setGalleryType('color');
        setGalleryContent("")
        seGalleryLink('');
    };

    const handleGalleryContentChange = (e) => {
        setGalleryContent(e.target.value);
        setGalleryError('');
    };

    const handleGalleryLinkChange = (e) => {
        seGalleryLink(e.target.value);
        setGalleryError('');
    };

    const handleGalleryImageUpload = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            setGalleryContent(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };
    const handleGalleryTypeChange = (event) => {
        setGalleryType(event.target.value)
    }
    const handleGalleryAddToBoard = (item) => {
        if (item.type === "color") {
            handleAddGalleryBox(item.content)
        }
        if (item.type === "image") {
            const imageObject = { id: Date.now(), src: item.content, type: "image", width: "100", x: 0, y: 0 }
            handleAddGalleryImage(imageObject)
        }
        if (item.type === "link") {
            handleAddGalleryLink(item)
        }

    }
    const handleDraw = () => {
        setDraw(draw => !draw);
        isDrawing && setIsDrawing(false);
        isErasing && setIsErasing(false);
    }

    const handleWrite = () => {
        setWrite(write => !write);
    }

    const handleImage = () => {
        setImage(image => !image);
    }

    const handleImageLink = () => {
        setImageLink(imageLink => !imageLink);
    }

    const handleVideo = () => {
        setVideo(video => !video);
    }
    const handleMap = () => {
        setMap(map => !map);
    }
    const handleClearBoard = () => {
        setItems([])
        setPaths([])
    }
    const handleMoveObjects = () => {
        setIsMovingObjects(isMovingObjects => !isMovingObjects)
    }

    // Text Contrast
    const getRGB = (c) => {
        return parseInt(c, 16) || c
    }

    const getsRGB = (c) => {
        return getRGB(c) / 255 <= 0.03928
            ? getRGB(c) / 255 / 12.92
            : Math.pow((getRGB(c) / 255 + 0.055) / 1.055, 2.4)
    }

    const getLuminance = (hexColor) => {
        return (
            0.2126 * getsRGB(hexColor.substr(1, 2)) +
            0.7152 * getsRGB(hexColor.substr(3, 2)) +
            0.0722 * getsRGB(hexColor.substr(-2))
        )
    }

    const getContrast = (f, b) => {
        const L1 = getLuminance(f)
        const L2 = getLuminance(b)
        return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05)
    }

    const getTextColor = (bgColor) => {
        const whiteContrast = getContrast(bgColor, '#ffffff')
        const blackContrast = getContrast(bgColor, '#000000')
        return whiteContrast > blackContrast ? '#ffffff' : '#000000'
    }

    const handleZoomIn = () => {
        setZoom(zoom => zoom -= 100)
    }

    const handleZoomOut = () => {
        setZoom(zoom => zoom += 100)
    }
    const handleEditingBoard = () => {
        setEditingBoard(editingBoard => !editingBoard)
        setZoom(2000)
    }
    const handleGalleryToggle = () => {
        console.log("galleryShow")
        setGalleryShow(galleryShow => !galleryShow)
    }

    return (
        <MoodboardContext.Provider value={{
            isDrawing, isPathMoving, handleMovePath, currentPath, paths, isErasing, color, line, svgRef, pathRef, items, itemText, itemColor, itemLink, itemUrl, itemVideoUrl, itemImageUrl, itemMapUrl, selectedItem, editingText, editingImage, draggingItem, draggingPath, dragOffsetItem, handleAddBox, handleImageUpload, handleImageDropUpload, handleAddVideo, handleAddImage, handleAddMap, handleMouseDown, handleMouseMove, handleMouseUp, handleDeleteItem, handleItemText, handleItemColor, handleItemLink, handleItemUrl, handleItemVideoUrl, handleItemImageUrl, handleItemMapUrl, handleEditBox, handleStopEditBox, handleItemTextChange, handleItemColorChange, handleItemLinkChange, handleItemUrlChange, handleEditImage, handleStopEditImage, handleImageChange, handleDrawing, handleEraser, handleDeletePath, handelLineColor, handelLineWidth, galleryItems, galleryType, galleryError, addGalleryItem, deleteGalleryItem, modelGalleryItem, handleGallerySubmit, handleGalleryImageUpload, handleGalleryTypeChange, handleGalleryContentChange, handleGalleryLinkChange, handleGalleryAddToBoard, handleDraw, handleWrite, handleImage, handleImageLink, handleVideo, handleMap, write, image, video, imageLink, map, draw, handlePdfDownload, handleClearBoard, isMovingObjects, handleMoveObjects, getTextColor, handleZoomIn, handleZoomOut, zoom, editingBoard, handleEditingBoard, handleGalleryToggle, galleryShow, handelLineWidthChange, handelLineColorChange, isEditingPath, stopLineEditing, handelLineAngleChange, dragOffsetPath, handlePdfUpload, freezeScreen, getDrawingCenter, handleScaleChange, scale, rotation
        }}>
            {children}
        </MoodboardContext.Provider>
    );
}

export { MoodboardContext, MoodboardProvider };
