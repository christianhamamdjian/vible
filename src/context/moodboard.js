import React, { useState, useRef, useEffect } from "react";
import { useLocalStorage } from "../components/utils/useLocalStorage";

const MoodboardContext = React.createContext();
// Provider,Consumer,useContext
export default function MoodboardProvider({ children }) {
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPath, setCurrentPath] = useState('');
    const [paths, setPaths] = useLocalStorage("paths", []);
    const [erasing, setErasing] = useState(false);
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
    const svgRef = useRef(null);


    // useEffect(() => {
    //     const savedItems = localStorage.getItem("items");
    //     const initialValue = JSON.parse(savedItems);
    //     return initialValue || "";
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem("items", JSON.stringify(items));
    // }, [items])

    // useEffect(() => {
    //     localStorage.setItem("paths", JSON.stringify(paths));
    // }, [paths])

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
    const handleMouseDown = (event, itemId) => {
        if (itemId) {
            setDraggingItem(true);
            const offsetItemX = event.clientX - event.currentTarget.getBoundingClientRect().left;
            const offsetItemY = event.clientY - event.currentTarget.getBoundingClientRect().top;
            const selectedItem = items.find(item => item.id === itemId)
            setSelectedItem(selectedItem)
            setDragOffsetItem({ x: offsetItemX, y: offsetItemY });
        }
        if (!itemId && isDrawing) {
            const { x, y } = getCursorPositionDrawing(event);
            setCurrentPath(`M${x} ${y}`);
        }
    };
    const handleMouseMove = (event) => {
        if (selectedItem) {
            event.preventDefault();
            if (!draggingItem) return;
            const newItemX = event.clientX - event.currentTarget.getBoundingClientRect().left - dragOffsetItem.x;
            const newItemY = event.clientY - event.currentTarget.getBoundingClientRect().top - dragOffsetItem.y;
            setItems((prevItems) =>
                prevItems.map((item) => {
                    return item.id === selectedItem.id ? { ...item, x: newItemX, y: newItemY } : item
                })
            );
        }
        if (!isDrawing) return;
        if (isDrawing && !erasing && !selectedItem) {
            const { x, y } = getCursorPositionDrawing(event);
            setCurrentPath((prevPath) => `${prevPath} L${x} ${y}`);
        }
    };
    const handleMouseUp = () => {
        setSelectedItem(null)
        setDraggingItem(false);
        setDragOffsetItem({ x: 0, y: 0 });
        setPaths((prevPaths) => [...prevPaths, { path: currentPath, color, line }]);
        setCurrentPath('');
    };
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
    const getCursorPositionDrawing = (event) => {
        const { left, top } = svgRef.current.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        return { x, y };
    };
    const handleDraw = () => {
        setIsDrawing(isDrawing => !isDrawing)
    }
    const handleEraser = () => {
        setErasing(erasing => !erasing);
        setIsDrawing(isDrawing => !isDrawing)
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

    return (
        <MoodboardContext.Provider value={{
            isDrawing, currentPath, paths, erasing, color, line, svgRef, items, itemText, itemColor, itemLink, itemUrl, itemVideoUrl, itemImageUrl, itemMapUrl, selectedItem, editingText, editingImage, draggingItem, dragOffsetItem, handleAddBox, handleImageUpload, handleImageDropUpload, handleAddVideo, handleAddImage, handleAddMap, handleMouseDown, handleMouseMove, handleMouseUp, handleDeleteItem, handleItemText, handleItemColor, handleItemLink, handleItemUrl, handleItemVideoUrl, handleItemImageUrl, handleItemMapUrl, handleEditBox, handleStopEditBox, handleItemTextChange, handleItemColorChange, handleItemLinkChange, handleItemUrlChange, handleEditImage, handleStopEditImage, handleImageChange, getCursorPositionDrawing, handleDraw, handleEraser, handleDeletePath, handelLineColor, handelLineWidth, handleDownload, galleryItems, galleryType, galleryError, addGalleryItem, deleteGalleryItem, modelGalleryItem, handleGallerySubmit, handleGalleryImageUpload, handleGalleryTypeChange, handleGalleryContentChange, handleGalleryLinkChange, handleGalleryAddToBoard
        }}>
            {children}
        </MoodboardContext.Provider>
    );
}

export { MoodboardContext, MoodboardProvider };
