import React from 'react';
import { MoodboardContext } from "../../context/moodboardContext";

const Chat = () => {
    const { galleryItems, galleryType, galleryError, deleteGalleryItem, handleGallerySubmit, handleGalleryTypeChange, handleGalleryAddToBoard, galleryContent, handleGalleryContentChange, galleryLink, handleGalleryLinkChange, handleGalleryImageUpload, handleGalleryToggle, galleryShow } = React.useContext(MoodboardContext);
    return (
        <>

            <div className={` gallery ${galleryShow ? "gallery-show" : "gallery-hide"}`}>
                <button
                    className="toggle-gallery"
                    onClick={handleGalleryToggle}
                >
                    Chat
                </button >
                <div>
                    <h2>Chat:</h2>
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
export default Chat