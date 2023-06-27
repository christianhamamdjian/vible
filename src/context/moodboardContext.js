import React, { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "../components/hooks/useLocalStorage";
import getTextColor from "../components/utils/getTextColor";
import jsPDF from "jspdf"

const MoodboardContext = React.createContext();
export default function MoodboardProvider({ children }) {

    const [isDrawing, setIsDrawing] = useState(false)
    const [isEditingPath, setIsEditingPath] = useState(null)
    const [isErasing, setIsErasing] = useState(false)
    const [pathColor, setPathColor] = useState('#000000')
    const [pathLine, setPathLine] = useState(2)
    const [freezeScreen, setFreezeScreen] = useState(false)
    const [draggingPath, setDraggingPath] = useState(false);
    const [dragOffsetPath, setDragOffsetPath] = useState({ x: 0, y: 0 })
    const [isPathMoving, setIsPathMoving] = useState(false)

    const [items, setItems] = useLocalStorage("items", [])
    const [itemText, setItemText] = useState('Text');
    const [itemColor, setItemColor] = useState('#000000')
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

    const [draw, setDraw] = useState(false)
    const [write, setWrite] = useState(false)
    const [image, setImage] = useState(false)
    const [imageLink, setImageLink] = useState(false)
    const [video, setVideo] = useState(false)
    const [map, setMap] = useState(false)
    const [isMovingObjects, setIsMovingObjects] = useState(false)

    const pathRef = useRef(null)

    const [zoom, setZoom] = useState(2000)
    const [editingBoard, setEditingBoard] = useState(false)

    const [drawing, setDrawing] = useState(false);
    // const [paths, setPaths] = useState(loadPathsFromLocalStorage() || []);
    const [paths, setPaths] = useState([]);
    const [rotation, setRotation] = useState([]);
    const [scaling, setScaling] = useState([]);
    const [selectedPath, setSelectedPath] = useState(null);
    const svgRef = useRef(null);

    // useEffect(() => {
    //     loadPathsFromLocalStorage();
    // }, []);

    // useEffect(() => {
    //     savePathsToLocalStorage();
    // }, [paths]);

    // function loadPathsFromLocalStorage() {
    //     const savedPaths = localStorage.getItem('svgPaths');
    //     const pathList = savedPaths && JSON.parse(savedPaths)
    //     const convertedPaths = pathList && pathList.map(path => {
    //         const singlePath = path.map(d => convertFromSVGPath(d))
    //         return singlePath[0]
    //     })
    //     return convertedPaths
    // };

    // function convertFromSVGPath(d) {
    //     const commands = d.split(/[A-Za-z]/).filter(Boolean);
    //     const points = [];

    //     commands.forEach((command) => {
    //         const values = command.trim().split(/[\s,]+/).filter(Boolean);

    //         for (let i = 0; i < values.length; i += 2) {
    //             const x = parseFloat(values[i]);
    //             const y = parseFloat(values[i + 1]);
    //             points.push({ x, y });
    //         }
    //     });
    //     return points;
    // };

    // function savePathsToLocalStorage() {
    //     const savingPaths = paths.map((line) => {
    //         const { extractedPath } = line
    //         return ({
    //             path: `M${extractedPath.map((point) => `${point.x} ${point.y}`).join(' L')}`
    //         })

    //     })
    //     localStorage.setItem('svgPaths', JSON.stringify(savingPaths));
    // };

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
        const newBox = { id: itemId, x: 0, y: 0, text: itemText, color: pathColor, link: link.content, url: link.link, type: "box" };
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

        if (isEditingPath) {
            stopLineEditing()
        }
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

            setDraggingPath(true);

            let selectedElement = event.target.closest(`path[data-index="${element.id}"]`)
            let transformMatrix = selectedElement.getCTM();
            let x = transformMatrix.e
            let y = transformMatrix.f
            const { clientX, clientY } = event.touches ? event.touches[0] : event;

            setSelectedPath(paths.find(path => path.id === element.id))
            if (element.angle > 0) {
                setDragOffsetPath({ x: element.x, y: element.y });
            } else {
                setDragOffsetPath({ x: parseInt(clientX + x), y: parseInt(clientY + y) });
            }
        }

        // Start drawing
        if (!drawing) {
            const { clientX, clientY } = event;
            const svgPoint = svgRef.current.createSVGPoint();
            svgPoint.x = clientX;
            svgPoint.y = clientY;
            const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse());
            setSelectedPath(null)
            setDrawing(true);
            setPaths([...paths, { id: Date.now(), color: pathColor || "#000000", line: pathLine || 2, path: [transformedPoint] }]);
        }
    };

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

        // Drawing
        if (!drawing) return;
        if (drawing && !isErasing && !selectedItem) {
            const { clientX, clientY } = event;
            const svgPoint = svgRef.current.createSVGPoint();
            svgPoint.x = clientX;
            svgPoint.y = clientY;
            const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse());

            const currentPath = { ...paths[paths.length - 1] };
            console.log(currentPath["path"])
            currentPath["path"].push(transformedPoint);
            const updatedPaths = [...paths];
            updatedPaths[paths.length - 1] = currentPath;
            setPaths(updatedPaths);
        }

        // prevent screen from scrolling when in action
        if (selectedItem || selectedPath || isDrawing) {
            setFreezeScreen(true)
        }
    };

    // Mouse Up
    const handleMouseUp = (event) => {
        if (drawing) {
            setDrawing(false);
        }
        // // Resetting
        // setFreezeScreen(false)
        // setSelectedItem(null)
        // // setSelectedPath(null)
        // setDraggingItem(false);
        // // setDraggingPath(false);
        // setDragOffsetItem({ x: 0, y: 0 });
        // // setDragOffsetPath({ x: 0, y: 0 });
        // // setCurrentPath(null);
        // // setNewPathPosition(null)
        // // setPathScale(1)
        // // setPathRotation(0)
    };

    const handlePathClick = (index, id) => {
        setSelectedPath(index);
        setIsEditingPath({ status: true, id: id })
    };

    const handlePathDrag = (event) => {
        event.stopPropagation();
        const startX = event.clientX || event.touches[0].clientX;
        const startY = event.clientY || event.touches[0].clientY;

        const handleMouseMove = (event) => {
            event.preventDefault();
            const currentX = event.clientX || event.touches[0].clientX;
            const currentY = event.clientY || event.touches[0].clientY;
            const deltaX = currentX - startX;
            const deltaY = currentY - startY;

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
                    return path;
                });
                setPaths(updatedPaths);
            }
        };

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMouseMove);
            window.removeEventListener('touchend', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('touchend', handleMouseUp);
    };

    const handleRotateChange = (event) => {
        const rotate = parseInt(event.target.value);
        const updatedPaths = paths.map((path, index) => {
            if (index === selectedPath) {
                const center = getCenterPoint(path["path"]);
                return ({
                    ...path, path: rotatePath(path["path"], center, rotate)
                })
            }
            return path;
        });
        setRotation(rotate)
        setPaths(updatedPaths);
    };

    const handleScaleChange = (event) => {
        const scale = parseFloat(event.target.value);
        const updatedPaths = paths.map((path, index) => {
            if (index === selectedPath) {
                const center = getCenterPoint(path["path"]);
                return ({
                    ...path, path: scalePath(path["path"], center, scale)
                })
            }
            return path;
        });
        setScaling(scale)
        setPaths(updatedPaths);
    };



    const getCenterPoint = (points) => {
        const bounds = points.reduce(
            (acc, point) => {
                acc.minX = Math.min(acc.minX, point.x);
                acc.maxX = Math.max(acc.maxX, point.x);
                acc.minY = Math.min(acc.minY, point.y);
                acc.maxY = Math.max(acc.maxY, point.y);
                return acc;
            },
            {
                minX: Number.POSITIVE_INFINITY,
                maxX: Number.NEGATIVE_INFINITY,
                minY: Number.POSITIVE_INFINITY,
                maxY: Number.NEGATIVE_INFINITY,
            }
        );

        return {
            x: (bounds.minX + bounds.maxX) / 2,
            y: (bounds.minY + bounds.maxY) / 2,
        };
    };

    const rotatePath = (points, center, angle) => {
        const radians = (angle * Math.PI) / 180;
        return points.map((point) => {
            const translatedPoint = {
                x: point.x - center.x,
                y: point.y - center.y,
            };
            const rotatedPoint = {
                x: translatedPoint.x * Math.cos(radians) - translatedPoint.y * Math.sin(radians),
                y: translatedPoint.x * Math.sin(radians) + translatedPoint.y * Math.cos(radians),
            };
            return {
                x: rotatedPoint.x + center.x,
                y: rotatedPoint.y + center.y,
            };
        });
    };

    const scalePath = (points, center, scale) => {
        return points.map((point) => {
            const scaledPoint = {
                x: center.x + (point.x - center.x) * scale,
                y: center.y + (point.y - center.y) * scale,
            };
            return scaledPoint;
        });
    };

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
    const handleLineColor = (event) => {
        setPathColor(event.target.value)
    }
    const handleLineWidth = (event) => {
        setPathLine(event.target.value)
    }
    const handleLineWidthChange = (event, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, line: event.target.value };
                }
                return path;
            })
        )
    };
    const handleLineColorChange = (event, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, color: event.target.value };
                }
                return path;
            })
        )
    };

    const stopLineEditing = () => {
        setIsEditingPath(null)
        setSelectedPath(null)
        setPathColor("#000000")
        setPathLine(2)
    }

    // Pdf Download
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

    // Toggle functions
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
            // Properties
            isDrawing,
            isPathMoving,
            paths,
            isErasing,
            pathColor,
            pathLine,
            svgRef,
            pathRef,
            items,
            itemText,
            itemColor,
            itemLink,
            itemUrl,
            itemVideoUrl,
            itemImageUrl,
            itemMapUrl,
            selectedItem,
            editingText,
            editingImage,
            draggingItem,
            draggingPath,
            dragOffsetItem,
            galleryItems,
            galleryType,
            galleryError,
            modelGalleryItem,
            write,
            image,
            video,
            imageLink,
            map,
            draw,
            isMovingObjects,
            zoom,
            editingBoard,
            galleryShow,
            isEditingPath,
            dragOffsetPath,
            freezeScreen,
            rotation,
            scaling,
            selectedPath,
            // Methods
            handlePathClick,
            handlePathDrag,
            handleMovePath,
            handleAddBox,
            handleImageUpload,
            handleImageDropUpload,
            handleAddVideo,
            handleAddImage,
            handleAddMap,
            handleMouseDown,
            handleMouseMove,
            handleMouseUp,
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
            handleItemTextChange,
            handleItemColorChange,
            handleItemLinkChange,
            handleItemUrlChange,
            handleEditImage,
            handleStopEditImage,
            handleImageChange,
            handleDrawing,
            handleEraser,
            handleDeletePath,
            handleLineColor,
            handleLineWidth,
            addGalleryItem,
            deleteGalleryItem,
            handleGallerySubmit,
            handleGalleryImageUpload,
            handleGalleryTypeChange,
            handleGalleryContentChange,
            handleGalleryLinkChange,
            handleGalleryAddToBoard,
            handleDraw,
            handleWrite,
            handleImage,
            handleImageLink,
            handleVideo,
            handleMap,
            handlePdfDownload,
            handleClearBoard,
            handleMoveObjects,
            getTextColor,
            handleZoomIn,
            handleZoomOut,
            handleEditingBoard,
            handleGalleryToggle,
            handleLineWidthChange,
            handleLineColorChange,
            stopLineEditing,
            handlePdfUpload,
            handleScaleChange,
            handleRotateChange
        }}>
            {children}
        </MoodboardContext.Provider>
    );
}

export { MoodboardContext, MoodboardProvider };
