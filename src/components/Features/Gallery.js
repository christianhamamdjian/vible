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
            const imageObject = {
                id: Date.now(),
                src: item.content,
                type: "image",
                width: "5",
                x: 0,
                y: 0
            }
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
                    <div>
                        {/* <div className='gallery-sign'></div> */}
                        <svg
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 6C12.5523 6 13 6.44772 13 7V11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H13V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V13H7C6.44772 13 6 12.5523 6 12C6 11.4477 6.44772 11 7 11H11V7C11 6.44772 11.4477 6 12 6Z"
                                fill="currentColor"
                            />
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5 22C3.34315 22 2 20.6569 2 19V5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5ZM4 19C4 19.5523 4.44772 20 5 20H19C19.5523 20 20 19.5523 20 19V5C20 4.44772 19.5523 4 19 4H5C4.44772 4 4 4.44772 4 5V19Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                </button >
                <div className='gallery-container'>
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
                        <button type="submit">+</button>
                        {galleryError && <div className="error">{galleryError}</div>}
                    </form>


                    <ul className='gallery-list'>
                        {galleryItems.map((item, index) => {
                            if (item.type === 'color') {
                                return (
                                    <li
                                        key={index}
                                        className="gallery-box"
                                        style={{ backgroundColor: item.content }}>{item.content}
                                        <div className="gallery-buttons">
                                            <button className='gallery-button'
                                                onClick={() => handleGalleryAddToBoard(item)}>
                                                <div className='gallery-board-out'></div>
                                                <div className='gallery-board-in'>+</div>
                                            </button>
                                            <button className='gallery-button'
                                                onClick={() => deleteGalleryItem(index)}>
                                                <div className="gallery-delete">&times;</div>
                                            </button>
                                        </div>
                                    </li>
                                )

                            }
                            if (item.type === 'image') {
                                return (
                                    <li key={index}
                                        className="gallery-box" >
                                        <img
                                            width="120"
                                            alt=""
                                            src={item.content}>
                                        </img>
                                        <div className="gallery-buttons">
                                            <button className='gallery-button'
                                                onClick={() => handleGalleryAddToBoard(item)}>
                                                <div className='gallery-board-out'></div>
                                                <div className='gallery-board-in'>+</div>
                                            </button>
                                            <button className='gallery-button'
                                                onClick={() => deleteGalleryItem(index)}>
                                                <div className="gallery-delete">&times;</div>
                                            </button>
                                        </div>
                                    </li>
                                )
                            }
                            if (item.type === 'link') {
                                return (
                                    <li key={index}
                                        className="gallery-box" >
                                        <a target="_blank" rel="noreferrer" href={item.link}>
                                            {item.content}
                                        </a>
                                        <div className="gallery-buttons">
                                            <button className='gallery-button'
                                                onClick={() => handleGalleryAddToBoard(item)}>
                                                <div className='gallery-board-out'></div>
                                                <div className='gallery-board-in'>+</div>
                                            </button>
                                            <button className='gallery-button'
                                                onClick={() => deleteGalleryItem(index)}>
                                                <div className="gallery-delete">&times;</div>
                                            </button>
                                        </div>
                                    </li>
                                )
                            }
                            return
                        })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Gallery