import React, { useState, useEffect, useRef, createContext } from "react";
import { useLocalStorage } from "../components/hooks/useLocalStorage";
import getTextColor from "../components/utils/getTextColor";

const MoodboardContext = createContext();
export default function MoodboardProvider({ children }) {

    const [isDrawing, setIsDrawing] = useState(false)
    const [isEditingPath, setIsEditingPath] = useState(null)
    const [isEditingPaths, setIsEditingPaths] = useState(false)
    const [isErasing, setIsErasing] = useState(false)
    const [pathColor, setPathColor] = useState('#000000')
    const [pathLine, setPathLine] = useState(2)
    const [isPathMoving, setIsPathMoving] = useState(false)

    const [items, setItems] = useLocalStorage("items", [])
    const [itemText, setItemText] = useState('Text');
    const [itemColor, setItemColor] = useState('rgb(244, 180, 22)')
    const [itemLink, setItemLink] = useState('')
    const [itemUrl, setItemUrl] = useState('')
    const [itemVideoUrl, setItemVideoUrl] = useState('')
    const [itemImageUrl, setItemImageUrl] = useState('')
    const [itemMapUrl, setItemMapUrl] = useState('')

    const [editingText, setEditingText] = useState(null)
    const [editingImage, setEditingImage] = useState(null)

    const [galleryItems, setGalleryItems] = useLocalStorage("galleryItems", [])
    const [galleryType, setGalleryType] = useState('color')
    const [galleryContent, setGalleryContent] = useState("#000000")
    const [galleryLink, seGalleryLink] = useState('')
    const [galleryError, setGalleryError] = useState('')
    const [galleryShow, setGalleryShow] = useState(false)

    const [todosShow, setTodosShow] = useState(false)

    const [draw, setDraw] = useState(false)
    const [write, setWrite] = useState(false)
    const [image, setImage] = useState(false)
    const [imageLink, setImageLink] = useState(false)
    const [video, setVideo] = useState(false)
    const [map, setMap] = useState(false)
    const [pdf, setPdf] = useState(false)
    const [isMovingObjects, setIsMovingObjects] = useState(false)

    const pathRef = useRef(null)

    const [zoom, setZoom] = useState(2000)
    const [isEditingBoard, setisEditingBoard] = useState(false)

    const [drawing, setDrawing] = useState(false);
    const [paths, setPaths] = useState(loadPathsFromLocalStorage() || []);
    const [rotation, setRotation] = useState([]);
    const [scaling, setScaling] = useState([]);
    const [selectedPath, setSelectedPath] = useState(null);

    const [draggingSvg, setDraggingSvg] = useState(false);
    const [svgPosition, setSvgPosition] = useState({ x: 0, y: 0 });
    const [svgOffset, setSvgOffset] = useState({ x: 0, y: 0 });
    const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
    const [selectedRectId, setSelectedRectId] = useState(null);
    const [rectOffsets, setRectOffsets] = useState({});
    const divRef = useRef(null)
    const svgRef = useRef(null)

    useEffect(() => {
        loadPathsFromLocalStorage();
    }, []);

    useEffect(() => {
        savePathsToLocalStorage();
    }, [paths]);

    function loadPathsFromLocalStorage() {
        const savedPaths = localStorage.getItem('paths');
        const pathList = savedPaths && JSON.parse(savedPaths)
        const convertedPaths = pathList && pathList.map(path => {
            const singlePath = path["path"].map(d => convertFromSVGPath(d))
            return ({ ...path, path: singlePath[0] })
        })
        return convertedPaths
    };

    function convertFromSVGPath(d) {
        const commands = d.split(/[A-Za-z]/).filter(Boolean);
        const points = [];

        commands.forEach((command) => {
            const values = command.trim().split(/[\s,]+/).filter(Boolean);

            for (let i = 0; i < values.length; i += 2) {
                const x = parseFloat(values[i]);
                const y = parseFloat(values[i + 1]);
                points.push({ x, y });
            }
        });
        // console.log(points)
        return points;
    };

    function savePathsToLocalStorage() {
        const savingPaths = paths.map((path) => {
            return ({ ...path, path: [`M${path["path"].map((point) => `${point.x} ${point.y}`).join(' L')}`] })
        })
        localStorage.setItem('paths', JSON.stringify(savingPaths));
    };

    // Add Elements
    const handleAddBox = (e) => {
        e.preventDefault();
        const itemId = Date.now();
        const newBox = {
            id: itemId,
            x: 100,
            y: 100,
            text: itemText,
            color: itemColor,
            link: itemLink,
            url: itemUrl,
            width: "160px",
            height: "160px",
            angle: 0,
            type: "box"
        };
        setItems([...items, newBox]);
        setItemText('Text');
        setItemColor('rgb(244, 180, 22)');
    };
    const handleAddGalleryBox = (color) => {
        const itemId = Date.now();
        const newBox = {
            id: itemId,
            x: 100,
            y: 100,
            text: itemText,
            color: color,
            link: itemLink,
            url: itemUrl,
            type: "box"
        };
        setItems([...items, newBox]);
        setItemText('Text');
        setItemColor('rgb(244, 180, 22)');
    };
    const handleAddTodoBox = (text) => {
        const itemId = Date.now();
        const newBox = {
            id: itemId,
            x: 100,
            y: 100,
            text: text,
            color: itemColor,
            link: itemLink,
            url: itemUrl,
            type: "box"
        };
        setItems([...items, newBox]);
        setItemText('Text');
        setItemColor('rgb(244, 180, 22)');
    };
    const handleAddGalleryImage = (image) => {
        setItems([...items, image]);
    }
    const handleAddGalleryLink = (link) => {
        const itemId = Date.now();
        const newBox = {
            id: itemId,
            x: 0,
            y: 0,
            text: itemText,
            color: itemColor,
            link: link.content,
            url: link.link,
            type: "box"
        };
        setItems([...items, newBox]);
        setItemText('Text');
        setItemColor('#f4b416');
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const newItem = {
                id: Date.now(),
                src: e.target.result,
                x: 100,
                y: 100,
                width: "100",
                type: "image"
            };
            setItems((prevItems) => [...prevItems, newItem]);
        };
        reader.readAsDataURL(file);
    };

    const handleImageDropUpload = (e) => {
        const file = e;
        const reader = new FileReader();
        reader.onload = (e) => {
            const newItem = {
                id: Date.now(),
                src: e.target.result,
                x: 100,
                y: 100,
                width: "100",
                height: "auto",
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
            x: 100,
            y: 100,
            type: "video"
        }
        setItems((prevItems) => [...prevItems, newItem]);
    }
    const handleAddImage = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            imageUrl: itemImageUrl,
            x: 100,
            y: 100,
            width: "100",
            height: "auto",
            type: "imageUrl"
        }
        setItems((prevItems) => [...prevItems, newItem]);
    }
    const handleAddMap = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now(),
            mapUrl: itemMapUrl,
            x: 100,
            y: 100,
            type: "mapUrl"
        }
        setItems((prevItems) => [...prevItems, newItem]);
    }

    const handleSvgPointerDown = (e) => {
        if (editingText) return
        if (!isDrawing) {
            e.preventDefault();
            const { clientX, clientY } = e.touches ? e.touches[0] : e;
            const svgRect = svgRef.current.getBoundingClientRect();
            const divRect = divRef.current.getBoundingClientRect();
            setSvgOffset({
                x: clientX - svgRect.left + divRect.left - svgPosition.x,
                y: clientY - svgRect.top + divRect.top - svgPosition.y,
            });
            setDraggingSvg(true);
        }

        // Start drawing
        if (isDrawing) {
            const { clientX, clientY } = e.touches ? e.touches[0] : e;
            const svgPoint = svgRef.current.createSVGPoint();
            svgPoint.x = clientX;
            svgPoint.y = clientY;
            const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse());
            setSelectedPath(null)
            setDrawing(true);
            setPaths([...paths, { id: Date.now(), color: pathColor || "#000000", line: pathLine || 2, path: [transformedPoint] }]);
        }
    };

    const handleSvgPointerMove = (e) => {
        // isErasing && (() => handleDeletePath(id))

        if (!isDrawing && !drawing && draggingSvg && !selectedRectId) {
            e.preventDefault();
            const { clientX, clientY } = e.touches ? e.touches[0] : e;
            const divRect = svgRef.current.getBoundingClientRect();
            const maxX = svgSize.width - divRect.width;
            const maxY = svgSize.height - divRect.height;
            let newX = clientX - svgOffset.x - divRect.left;
            let newY = clientY - svgOffset.y - divRect.top;
            newX = Math.min(0, Math.max(newX, maxX));
            newY = Math.min(0, Math.max(newY, maxY));
            setSvgPosition({ x: newX, y: newY });
        }

        // Drawing
        if (isDrawing && drawing && !draggingSvg && !isErasing && !selectedRectId) {
            const { clientX, clientY } = e.touches ? e.touches[0] : e;
            const svgPoint = svgRef.current.createSVGPoint();
            svgPoint.x = clientX;
            svgPoint.y = clientY;
            const transformedPoint = svgPoint.matrixTransform(svgRef.current.getScreenCTM().inverse());
            const currentPath = { ...paths[paths.length - 1] };
            currentPath["path"].push(transformedPoint);
            const updatedPaths = [...paths];
            updatedPaths[paths.length - 1] = currentPath;
            setPaths(updatedPaths);
        }
    };

    const handleSvgPointerUp = (e) => {
        setDraggingSvg(false)
        if (drawing) {
            setDrawing(false)
        }
    };

    const handleRectPointerDown = (e, rectId) => {
        if (isDrawing) {
            return
        }
        if (editingText) return
        setSelectedRectId(rectId);
        const { clientX, clientY } = e.touches ? e.touches[0] : e;
        const rect = items.find((r) => r.id === rectId);
        const rectOffset = {
            x: clientX - rect.x,
            y: clientY - rect.y,
        };
        setRectOffsets((prevOffsets) => ({
            ...prevOffsets,
            [rectId]: rectOffset,
        }));
    };

    const handleRectPointerMove = (e, rectId) => {
        if (isDrawing || selectedRectId) {
            e.preventDefault()
        }
        if (!draggingSvg || rectId !== selectedRectId) return;

        const { clientX, clientY } = e.touches ? e.touches[0] : e;
        const rectOffset = rectOffsets[rectId];
        const rectIndex = items.findIndex((r) => r.id === rectId);
        const newX = clientX - rectOffset.x;
        const newY = clientY - rectOffset.y;
        const updatedRectangles = [...items];
        const updatedRect = { ...updatedRectangles[rectIndex], x: newX, y: newY };
        updatedRectangles[rectIndex] = updatedRect;
        setItems(updatedRectangles);
    };

    const handleRectPointerUp = (rectId) => {
        setRectOffsets((prevOffsets) => {
            const { [rectId]: deletedOffset, ...restOffsets } = prevOffsets;
            return restOffsets;
        });
        setSelectedRectId(null);
    };

    const handlePathClick = (index, id) => {
        if (isErasing) {
            handleDeletePath(id)
        }
        // if (isEditingPaths) {
        setSelectedPath(index);
        setIsEditingPath({ status: true, id: id })
        // }
    };

    const handlePathDrag = (e) => {
        e.stopPropagation();
        const { clientX: startX, clientY: startY } = e.touches ? e.touches[0] : e;

        const handleMouseMove = (e) => {
            e.preventDefault();
            const { clientX: currentX, clientY: currentY } = e.touches ? e.touches[0] : e;
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
            window.removeEventListener('pointermove', handleMouseMove);
            window.removeEventListener('pointerup', handleMouseUp);
        };

        window.addEventListener('pointermove', handleMouseMove);
        window.addEventListener('pointerup', handleMouseUp);
    };

    const handleRotateChange = (e, amount) => {
        const rotate = (amount === "increase") ? +10 : -10;
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

    const handleScaleChange = (e, amount) => {
        const scale = (amount === "increase") ? 1.2 : 0.8;
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
    const handleEditPaths = () => {
        setIsEditingPaths(isEditingPaths => !isEditingPaths)
        setIsEditingPath(false)
        setIsDrawing(false)
        setIsErasing(false)
        setSelectedPath(null)
    }

    // Text Box
    const handleItemTextChange = (e, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, text: e.target.value };
                }
                return item;
            })
        )
    };
    const handleItemColorChange = (e, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, color: e.target.value };
                }
                return item;
            })
        );
    };
    const handleItemLinkChange = (e, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, link: e.target.value };
                }
                return item;
            })
        );
    };
    const handleItemWidthChange = (e, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, width: e.target.value };
                }
                return item;
            })
        );
    };
    const handleItemHeightChange = (e, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, height: e.target.value };
                }
                return item;
            })
        );
    };
    const handleItemAngleChange = (e, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, angle: e.target.value };
                }
                return item;
            })
        );
    };
    // Image
    const handleItemUrlChange = (e, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, url: e.target.value };
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
    const handleImageChange = (e, id) => {
        setItems(prevItems =>
            prevItems.map(item => {
                if (item.id === id) {
                    return { ...item, width: e.target.value };
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
        setIsEditingPath(false)
        setIsEditingPaths(false)
    }
    const handleMovePath = () => {
        setIsPathMoving(isPathMoving => !isPathMoving)
        setIsErasing(false);
        setIsDrawing(false)
    }
    const handleEraser = () => {
        setIsErasing(isErasing => !isErasing);
        setIsDrawing(false)
        setSelectedPath(null);
        setIsEditingPath(false)
        setIsEditingPaths(false)
    }
    const handleDeletePath = (erased) => {
        setPaths((prevPaths) => prevPaths.filter((path) => path.id !== erased));
        setIsEditingPath(null)
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
                    return { ...path, line: e.target.value };
                }
                return path;
            })
        )
    };
    const handleLineColorChange = (e, id) => {
        setPaths(prevPaths =>
            prevPaths.map(path => {
                if (path.id === id) {
                    return { ...path, color: e.target.value };
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

    const handleGalleryTypeChange = (e) => {
        setGalleryType(e.target.value)
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
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
        setEditingText(null)
        setEditingImage(null)
    };
    const handlePdfDelete = (id) => {
        const request = indexedDB.open('vible-database', 1);
        request.onsuccess = function (e) {
            const db = e.target.result;
            if (!id) {
                const request = db.transaction('pdfs', 'readwrite')
                    .objectStore('pdfs')
                    .clear()
            } else {
                const request = db.transaction('pdfs', 'readwrite')
                    .objectStore('pdfs')
                    .delete(id)
            }
            request.onsuccess = () => {
                console.log(id ? `Pdf deleted: ${id}` : "All Pdfs deleted");
            }
            request.onerror = (err) => {
                console.error(`Error to delete pdf: ${err}`)
            }
        }
        request.onerror = function () {
            console.error('Error opening IndexedDB.');
        }
    }

    const handleItemText = (e) => {
        setItemText(e.target.value);
    };
    const handleItemColor = (e) => {
        setItemColor(e.target.value);
    };
    const handleItemLink = (e) => {
        setItemLink(e.target.value);
    };
    const handleItemUrl = (e) => {
        setItemUrl(e.target.value);
    };
    const handleItemVideoUrl = (e) => {
        setItemVideoUrl(e.target.value);
    };
    const handleItemImageUrl = (e) => {
        setItemImageUrl(e.target.value);
    };
    const handleItemMapUrl = (e) => {
        setItemMapUrl(e.target.value);
    };
    const handleEditBox = (e, id) => {
        setEditingText({ status: true, id: id })
        handleWrite()
    }
    const handleStopEditBox = () => {
        if (editingText) {
            setEditingText(null)
            setWrite(false)
        }
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
    const handlePdf = () => {
        setPdf(pdf => !pdf);
    }
    const handleClearBoard = () => {
        setItems([])
        setPaths([])
        handlePdfDelete()
    }
    const handleClearPaths = () => {
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
        setisEditingBoard(isEditingBoard => !isEditingBoard)
        setZoom(2000)
    }
    const handleGalleryToggle = () => {
        setGalleryShow(galleryShow => !galleryShow)
    }
    const handleTodosToggle = () => {
        setTodosShow(todosShow => !todosShow)
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
            editingText,
            editingImage,
            galleryItems,
            galleryType,
            galleryError,
            modelGalleryItem,
            write,
            image,
            video,
            imageLink,
            map,
            pdf,
            draw,
            isMovingObjects,
            zoom,
            isEditingBoard,
            galleryShow,
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
            handleMovePath,
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
            handlePdf,
            handleClearBoard,
            handleClearPaths,
            handleMoveObjects,
            getTextColor,
            handleZoomIn,
            handleZoomOut,
            handleEditingBoard,
            handleGalleryToggle,
            handleTodosToggle,
            handleLineWidthChange,
            handleLineColorChange,
            stopLineEditing,
            handleScaleChange,
            handleRotateChange,
            handleEditPaths,
            handlePdfDelete,
            handleItemWidthChange,
            handleItemHeightChange,
            handleItemAngleChange,
            handleTodoAddToBoard,
            handleSvgPointerDown,
            handleSvgPointerUp,
            handleRectPointerDown,
            handleRectPointerMove,
            handleRectPointerUp
        }}>
            {children}
        </MoodboardContext.Provider>
    );
}

export { MoodboardContext, MoodboardProvider };
