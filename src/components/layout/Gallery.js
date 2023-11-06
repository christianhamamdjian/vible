import React, { useState } from 'react';
import Tooltips from '../tooltips/Tooltips'
//import LoadTemplate from "../helperComponents/LoadTemplate"
import { MoodboardContext } from "../../context/moodboardContext"

const Gallery = () => {
    const { galleryItems, deleteGalleryItem, addGalleryItem, handleAddGalleryBox, handleAddGalleryImage, handleAddGalleryLink, getTextColor, activeBoard } = React.useContext(MoodboardContext);
    const [galleryType, setGalleryType] = useState('color')
    const [galleryContent, setGalleryContent] = useState("")
    const [galleryLink, seGalleryLink] = useState('')
    const [galleryError, setGalleryError] = useState('')
    const [galleryShow, setGalleryShow] = useState(false)
    const buttonsColor = activeBoard.buttonsColor
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
                board: activeBoard.id,
                src: item.content,
                x: 100,
                y: 100,
                width: 100,
                angle: 0,
                height: "auto",
                opacity: 1,
                angle: 0,
                type: "image",
                cropHeight: 0,
                cropWidth: 0,
                roundCorners: 0,
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
                    className="toggle-gallery themable"
                    style={{ backgroundColor: galleryShow ? "rgb(238, 238, 238)" : buttonsColor, color: `${getTextColor(buttonsColor)}` }}
                    title="The Gallery"
                    onClick={handleGalleryToggle}
                >
                    <div>
                        {/* <div className='gallery-sign'></div> */}
                        <svg
                            width="28"
                            height="28"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M23.75,2.5 C25.821,2.5 27.5,4.179 27.5,6.25 L27.5,23.75 C27.5,25.821 25.821,27.5 23.75,27.5 L6.25,27.5 C4.179,27.5 2.5,25.821 2.5,23.75 L2.5,6.25 C2.5,4.179 4.179,2.5 6.25,2.5 L23.75,2.5 z M11.894,17.129 L6.009,17.129 C5.457,17.129 5.009,17.577 5.009,18.129 L5.009,23.886 C5.009,24.438 5.457,24.886 6.009,24.886 L11.894,24.886 C12.446,24.886 12.894,24.438 12.894,23.886 L12.894,18.129 C12.894,17.577 12.446,17.129 11.894,17.129 z M23.991,17.129 L18.106,17.129 C17.554,17.129 17.106,17.577 17.106,18.129 L17.106,23.886 C17.106,24.438 17.554,24.886 18.106,24.886 L23.991,24.886 C24.543,24.886 24.991,24.438 24.991,23.886 L24.991,18.129 C24.991,17.577 24.543,17.129 23.991,17.129 z M11.894,5.16 L6.009,5.16 C5.457,5.16 5.009,5.608 5.009,6.16 L5.009,11.917 C5.009,12.469 5.457,12.917 6.009,12.917 L11.894,12.917 C12.446,12.917 12.894,12.469 12.894,11.917 L12.894,6.16 C12.894,5.608 12.446,5.16 11.894,5.16 z M23.991,5.16 L18.106,5.16 C17.554,5.16 17.106,5.608 17.106,6.16 L17.106,11.917 C17.106,12.469 17.554,12.917 18.106,12.917 L23.991,12.917 C24.543,12.917 24.991,12.469 24.991,11.917 L24.991,6.16 C24.991,5.608 24.543,5.16 23.991,5.16 z"
                                fill="currentColor"
                            />
                        </svg>
                        <Tooltips
                            position="top"
                            width="4rem"
                            height="3.5rem"
                            top="-9rem"
                            bottom="90%"
                            left="-1.5rem"
                            right=""
                            marginRight=""
                            marginLeft=""
                            tipTop="3.5rem"
                            tipLeft="50%"
                            text="Add items to use later" />
                    </div>
                </button >
                {galleryShow && <> <div className='gallery-container'>
                    <form onSubmit={handleGallerySubmit}>
                        <div className="select-container">
                            <label htmlFor="custom-select"></label>
                            <select id="custom-select" className="custom-select" value={galleryType} onChange={(e) => handleGalleryTypeChange(e)}>
                                <option value="color">Add Color</option>
                                <option value="image">Add Image</option>
                                <option value="link">Add Link</option>
                            </select>
                        </div>
                        {galleryType === 'color' &&
                            <>
                                <input
                                    className="color-style"
                                    type="color"
                                    value={galleryContent}
                                    onChange={handleGalleryContentChange}
                                />
                                <label htmlFor="color-style"></label>
                            </>
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
                                placeholder="Link title"
                            />
                            <input
                                type="text"
                                value={galleryLink}
                                onChange={(e) => handleGalleryLinkChange(e)}
                                placeholder="Link url" />
                        </>}
                        <button type="submit">+</button>
                        {galleryError && <div className="error">{galleryError}</div>}

                    </form>
                    {/* <LoadTemplate /> */}

                    <ul className='gallery-list'>
                        {galleryItems.map((item, index) => {
                            if (item.type === 'color') {
                                return (
                                    <li
                                        key={index}
                                        className="gallery-box"
                                        style={{
                                            backgroundColor: item.content,
                                            // color: getTextColor(item.content),
                                            color: "#ffffff"
                                        }}>
                                        {item.content}
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
                </>}
            </div>
        </>
    )
}
export default Gallery