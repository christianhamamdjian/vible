import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Dropzone from 'react-dropzone';
import MoodboardItem from './MoodboardItem';

function Moodboard() {
    const [images, setImages] = useState([]);
    const [moodboardItems, setMoodboardItems] = useState([]);
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        setItems([...items, item]);
    };

    const deleteItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };
    function addMoodboardItem(item) {
        setMoodboardItems([...moodboardItems, item]);
    }
    const handleDrop = (acceptedFiles) => {
        const newImages = acceptedFiles.map((file) => ({
            src: URL.createObjectURL(file),
            caption: '',
        }));
        setImages([...images, ...newImages]);
    };

    const handleChangeCaption = (index, caption) => {
        const newImages = [...images];
        newImages[index].caption = caption;
        setImages(newImages);
    };

    return (
        <>
            <div className="moodboard">
                <Dropzone onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div className="dropzone" {...getRootProps()}>
                            <input {...getInputProps()} />
                            <FaPlus />
                            <p>Drag and drop or click to add images</p>
                        </div>
                    )}
                </Dropzone>
                {images.map((image, index) => (
                    <div className="image" key={index}>
                        <img src={image.src} alt="" />
                        <textarea
                            placeholder="Add a caption"
                            value={image.caption}
                            onChange={(e) => handleChangeCaption(index, e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <div className="add-moodboard">
                <h1>Create a New Moodboard</h1>
                <form onSubmit={addMoodboardItem}>
                    <label htmlFor="title">Title:</label>
                    <input type="text" name="title" id="title" />
                    <label htmlFor="description">Description:</label>
                    <textarea name="description" id="description" />
                    <label htmlFor="image">Image:</label>
                    <input type="file" name="image" id="image" />
                    <button type="submit">Create Moodboard</button>
                </form>
                <div className="moodboard">
                    {moodboardItems.map((item, index) => (
                        <MoodboardItem key={index} item={item} />
                    ))}
                </div>
            </div>

            <div>
                <h1>Mood Board</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const newItem = {
                        type: e.target.elements.type.value,
                        content: e.target.elements.content.value,
                        link: e.target.elements.link.value,
                    };
                    addItem(newItem);
                    e.target.reset();
                }}>
                    <select name="type">
                        <option value="color">Color</option>
                        <option value="image">Image</option>
                        <option value="link">Link</option>
                    </select>
                    <input type="text" name="content" placeholder="Add content" />
                    <input type="text" name="link" placeholder="Add link (optional)" />
                    <button type="submit">Add</button>
                </form>
                <ul>
                    {items.map((item, index) => {
                        let display;
                        if (item.type === "color") {
                            display = (
                                <div className="color-box" style={{ backgroundColor: item.content }}>
                                    <button onClick={() => deleteItem(index)}>Delete</button>
                                </div>
                            );
                        } else if (item.type === "image") {
                            display = (
                                <div className="image-box">
                                    <img src={item.content} alt="mood" />
                                    <button onClick={() => deleteItem(index)}>Delete</button>
                                </div>
                            );
                        } else if (item.type === "link") {
                            display = (
                                <div className="link-box">
                                    <a href={item.link} target="_blank" rel="noopener noreferrer">{item.content}</a>
                                    <button onClick={() => deleteItem(index)}>Delete</button>
                                </div>
                            );
                        }
                        return <li key={index}>{display}</li>
                    })}
                </ul>
            </div>
        </>
    );
}

export default Moodboard;