import React, { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "../components/hooks/useLocalStorage";
import jsPDF from "jspdf"

const MoodboardContext = React.createContext();
export default function MoodboardProvider({ children }) {

    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const [paths, setPaths] = useLocalStorage("paths", []);
    const [isErasing, setIsErasing] = useState(false);
    const [color, setColor] = useState('#aabbcc');
    const [line, setLine] = useState(2);

    const [items, setItems] = useLocalStorage("items", []);
    const [itemText, setItemText] = useState('Text');
    const [itemColor, setItemColor] = useState('#aabbcc');
    const [itemLink, setItemLink] = useState('');
    const [itemUrl, setItemUrl] = useState('');
    const [itemVideoUrl, setItemVideoUrl] = useState('');
    const [itemImageUrl, setItemImageUrl] = useState('');
    const [itemMapUrl, setItemMapUrl] = useState('');

    const [selectedItem, setSelectedItem] = useState(null);
    const [editingText, setEditingText] = useState(null);
    const [editingImage, setEditingImage] = useState(null);
    const [draggingItem, setDraggingItem] = useState(false);
    const [dragOffsetItem, setDragOffsetItem] = useState({ x: 0, y: 0 });

    const [galleryItems, setGalleryItems] = useLocalStorage("galleryItems", []);
    const [galleryType, setGalleryType] = useState('color');
    const [galleryContent, setGalleryContent] = useState('');
    const [galleryLink, seGalleryLink] = useState('');
    const [galleryError, setGalleryError] = useState('');

    const [selectedPath, setSelectedPath] = useState(null);
    const [draggingPath, setDraggingPath] = useState(false);
    const [dragOffsetPath, setDragOffsetPath] = useState({ x: 0, y: 0 });
    const [isPathMoving, setIsPathMoving] = useState(false)

    const [draw, setDraw] = useState(false)
    const [write, setWrite] = useState(false)
    const [image, setImage] = useState(false)
    const [imageLink, setImageLink] = useState(false)
    const [video, setVideo] = useState(false)
    const [map, setMap] = useState(false)

    const svgRef = useRef(null);

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

    // Dragging

    const handleMouseDown = (event, element) => {
        event.stopPropagation();
        event.preventDefault();
        if (element && !isDrawing) {
            setDraggingItem(true);
            const offsetItemX = (event.clientX || event.touches[0].clientX) - event.currentTarget.getBoundingClientRect().left;
            const offsetItemY = (event.clientY || event.touches[0].clientY) - event.currentTarget.getBoundingClientRect().top;
            setDragOffsetItem({ x: offsetItemX, y: offsetItemY });

            const selectedItem = items.find(item => item.id === element)
            setSelectedItem(selectedItem)
        }

        if (isPathMoving && !isDrawing && !isErasing && element && element.type === "path") {
            setDraggingPath(true);
            const offsetPathX = (event.clientX || event.touches[0].clientX) - event.currentTarget.getBBox().x;
            const offsetPathY = (event.clientY || event.touches[0].clientY) - event.currentTarget.getBBox().y;
            setDragOffsetPath({ x: offsetPathX, y: offsetPathY });

            const selectedPath = paths.find(path => path.id === element.id)
            setSelectedPath(selectedPath)
        }

        if (isDrawing) {
            const { x, y } = getCursorPositionDrawing(event);
            setCurrentPath(`M${x} ${y}`);
        }
    };

    // Moving

    const handleMouseMove = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (selectedItem && !selectedPath) {
            if (!draggingItem) return;

            const newItemX = (event.clientX || event.touches[0].clientX) - event.currentTarget.getBoundingClientRect().left - dragOffsetItem.x;
            const newItemY = (event.clientY || event.touches[0].clientY) - event.currentTarget.getBoundingClientRect().top - dragOffsetItem.y;

            setItems((prevItems) =>
                prevItems.map((item) => {
                    return item.id === selectedItem.id ? { ...item, x: newItemX, y: newItemY } : item
                })
            );
        }

        if (isPathMoving && selectedPath && !selectedItem) {
            if (!draggingPath) return;

            const newPathX = (event.clientX || event.touches[0].clientX) - event.currentTarget.getBBox().x - dragOffsetPath.x;
            const newPathY = (event.clientY || event.touches[0].clientY) - event.currentTarget.getBBox().y - dragOffsetPath.y;
            setPaths((prevPaths) =>
                prevPaths.map((path) => {
                    return path.id === selectedPath.id ? { ...path, x: newPathX, y: newPathY } : path
                })
            );
        }

        if (!isDrawing) return;
        if (isDrawing && !isErasing && !selectedItem) {
            const { x, y } = getCursorPositionDrawing(event);
            setCurrentPath((prevPath) => `${prevPath} L${x} ${y}`);
        }
    };

    // Mouse Up

    const handleMouseUp = (event) => {
        event.stopPropagation();
        event.preventDefault();

        setSelectedItem(null)
        setSelectedPath(null)
        setDraggingItem(false);
        setDraggingPath(false);

        setDragOffsetItem({ x: 0, y: 0 });

        setDragOffsetPath({ x: 0, y: 0 });

        if (isDrawing) {
            setPaths((prevPaths) => [...prevPaths, {
                id: Date.now(), type: "path", path: currentPath, color, line
            }]);
        }

        setCurrentPath('');
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

    const getCursorPositionDrawing = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const { left, top } = svgRef.current.getBoundingClientRect();
        const x = (event.clientX || event.touches[0].clientX) - left;
        const y = (event.clientY || event.touches[0].clientY) - top;
        return { x, y };
    };
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
    const handleDownload = () => {
        const svgBlob = new Blob([svgRef.current.outerHTML], { type: 'image/svg+xml' });
        const svgURL = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgURL;
        downloadLink.download = 'drawing.svg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgURL);
    };
    const handlePdfDownload = () => {
        const svgElement = document.getElementById('my-svg');
        const fileName = 'my-file.pdf';

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
        setGalleryContent('');
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

    return (
        <MoodboardContext.Provider value={{
            isDrawing, isPathMoving, handleMovePath, currentPath, paths, isErasing, color, line, svgRef, items, itemText, itemColor, itemLink, itemUrl, itemVideoUrl, itemImageUrl, itemMapUrl, selectedItem, editingText, editingImage, draggingItem, dragOffsetItem, handleAddBox, handleImageUpload, handleImageDropUpload, handleAddVideo, handleAddImage, handleAddMap, handleMouseDown, handleMouseMove, handleMouseUp, handleDeleteItem, handleItemText, handleItemColor, handleItemLink, handleItemUrl, handleItemVideoUrl, handleItemImageUrl, handleItemMapUrl, handleEditBox, handleStopEditBox, handleItemTextChange, handleItemColorChange, handleItemLinkChange, handleItemUrlChange, handleEditImage, handleStopEditImage, handleImageChange, getCursorPositionDrawing, handleDrawing, handleEraser, handleDeletePath, handelLineColor, handelLineWidth, handleDownload, galleryItems, galleryType, galleryError, addGalleryItem, deleteGalleryItem, modelGalleryItem, handleGallerySubmit, handleGalleryImageUpload, handleGalleryTypeChange, handleGalleryContentChange, handleGalleryLinkChange, handleGalleryAddToBoard, handleDraw, handleWrite, handleImage, handleImageLink, handleVideo, handleMap, write, image, video, imageLink, map, draw, handlePdfDownload, handleClearBoard
        }}>
            {children}
        </MoodboardContext.Provider>
    );
}

export { MoodboardContext, MoodboardProvider };
