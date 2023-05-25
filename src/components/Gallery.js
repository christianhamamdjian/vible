import React from 'react';
import { MoodboardContext } from "../context/moodboard";

const Gallery = () => {
    const { galleryItems, galleryType, galleryError, deleteGalleryItem, handleGallerySubmit, handleGalleryTypeChange, handleGalleryAddToBoard, galleryContent, handleGalleryContentChange, galleryLink, handleGalleryLinkChange, handleGalleryImageUpload } = React.useContext(MoodboardContext);
    console.log(galleryItems);
    return (
        <div className='itemForms'>
            <div className='moodboard-2'>
                <h2>Gallery:</h2>
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
                <ul>
                    {galleryItems.map((item, index) => {
                        let display;
                        if (item.type === 'color') {
                            display = (
                                <li key={index} className="color-box" style={{ backgroundColor: item.content || "#ffffff" }}>{item.content || "#ffffff"} <button onClick={() => deleteGalleryItem(index)}>&times;</button><button onClick={() => handleGalleryAddToBoard(index)}>Add to board</button></li>
                            )
                            return display;
                        }
                        if (item.type === 'image') {
                            display = (
                                <li key={index} className="color-box" ><img width="120" alt="" src={item.content}></img> <button onClick={() => deleteGalleryItem(index)}>&times;</button><button onClick={() => handleGalleryAddToBoard(index)}>Add to board</button></li>
                            )
                            return display;
                        }
                        if (item.type === 'link') {
                            display = (
                                <li key={index} className="color-box" ><a target="_blank" rel="noreferrer" href={item.link}>{item.content}</a> <button onClick={() => deleteGalleryItem(index)}>&times;</button><button onClick={() => handleGalleryAddToBoard(index)}>Add to board</button></li>
                            )
                            return display;
                        }
                    })
                    }
                </ul>
            </div>
        </div>
    )
}
export default Gallery