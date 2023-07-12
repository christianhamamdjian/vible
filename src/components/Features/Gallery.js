import React, { useState } from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Gallery = () => {
    const { galleryItems, deleteGalleryItem, addGalleryItem, handleAddGalleryBox, handleAddGalleryImage, handleAddGalleryLink } = React.useContext(MoodboardContext);
    const [galleryType, setGalleryType] = useState('color')
    const [galleryContent, setGalleryContent] = useState("#000000")
    const [galleryLink, seGalleryLink] = useState('')
    const [galleryError, setGalleryError] = useState('')
    const [galleryShow, setGalleryShow] = useState(false)

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

    const handleGalleryToggle = () => {
        setGalleryShow(galleryShow => !galleryShow)
    }

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

    return (
        <>

            <div className={` gallery ${galleryShow ? "gallery-show" : "gallery-hide"}`}>
                <button
                    className="toggle-gallery"
                    onClick={handleGalleryToggle}
                >
                    <div>|_|</div>
                    <div>|_|</div>
                    <div>|_|</div>
                </button >
                <div>
                    <form onSubmit={handleGallerySubmit}>
                        <select value={galleryType} onChange={(e) => handleGalleryTypeChange(e)}>
                            <option value="color">Color</option>
                            <option value="image">Image</option>
                            <option value="link">Link</option>
                        </select>
                        {galleryType === 'color' &&
                            <input
                                type="color"
                                value={galleryContent}
                                onChange={handleGalleryContentChange}
                            />
                        }
                        {galleryType === 'image' &&
                            <input
                                type="file"
                                accept="image/png,image/jpeg"
                                onChange={handleGalleryImageUpload}
                            />}
                        {galleryType === 'link' && <>
                            <input
                                type="text"
                                value={galleryContent}
                                onChange={(e) => handleGalleryContentChange(e)}
                                placeholder="Add content"
                            />
                            <input
                                type="text"
                                value={galleryLink}
                                onChange={(e) => handleGalleryLinkChange(e)}
                                placeholder="Add link" />
                        </>}
                        <button type="submit">Add</button>
                    </form>
                    {galleryError && <div className="error">{galleryError}</div>}
                </div>
                <ul className='gallery-list'>
                    {galleryItems.map((item, index) => {
                        if (item.type === 'color') {
                            return (
                                <li key={index} className="color-box" style={{ backgroundColor: item.content }}>{item.content} <button onClick={() => deleteGalleryItem(index)}>&times;</button><button onClick={() => handleGalleryAddToBoard(item)}>Add to board</button></li>
                            )

                        }
                        if (item.type === 'image') {
                            return (
                                <li key={index} className="color-box" ><img width="120" alt="" src={item.content}></img> <button onClick={() => deleteGalleryItem(index)}>&times;</button><button onClick={() => handleGalleryAddToBoard(item)}>Add to board</button></li>
                            )

                        }
                        if (item.type === 'link') {
                            return (
                                <li key={index} className="color-box" ><a target="_blank" rel="noreferrer" href={item.link}>{item.content}</a> <button onClick={() => deleteGalleryItem(index)}>&times;</button><button onClick={() => handleGalleryAddToBoard(item)}>Add to board</button></li>
                            )

                        }
                        return
                    })
                    }
                </ul>
            </div>
        </>
    )
}
export default Gallery