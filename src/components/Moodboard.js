import React, { useState } from 'react';

export default function Moodboard() {
    const [items, setItems] = useState([]);
    const [type, setType] = useState('color');
    const [content, setContent] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState('');

    const addItem = (item) => {
        setItems([...items, item]);
    };

    const deleteItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };
    const modelItem = {
        type: type,
        content: content,
        link: ''
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        let newItem;
        switch (type) {
            case 'color':
                newItem = { ...modelItem };
                break;
            case 'image':
                if (!content.startsWith('data:image/')) {
                    setError('Please select a valid image file (png, jpg, jpeg).');
                    return;
                }
                newItem = { ...modelItem };
                break;
            case 'link':
                if (!/^https?:\/\//i.test(link)) {
                    setError('Please enter a valid URL (include http:// or https://).');
                    return;
                }
                newItem = { ...modelItem };
                break;
            default:
                break;
        }
        addItem(newItem);
        setType('color');
        setContent('');
        setLink('');
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
        setError('');
    };

    const handleLinkChange = (e) => {
        setLink(e.target.value);
        setError('');
    };

    const handleImageUpload = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            setContent(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

    let contentInput;
    if (type === 'color') {
        contentInput = (
            <input type="color" value={content} onChange={handleContentChange} />
        );
    } else if (type === 'image') {
        contentInput = (
            <input type="file" accept="image/png,image/jpeg" onChange={handleImageUpload} />
        );
    } else if (type === 'link') {
        contentInput = (
            <>
                <input type="text" value={content} onChange={handleContentChange} placeholder="Add content" />
                <input type="text" value={link} onChange={handleLinkChange} placeholder="Add link" />
            </>
        );
    }

    return (
        <div className='moodboard-2'>
            <h1>Mood Board</h1>
            <form onSubmit={handleSubmit}>
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="color">Color</option>
                    <option value="image">Image</option>
                    <option value="link">Link</option>
                </select>
                {contentInput}
                <button type="submit">Add</button>
            </form>
            {error && <div className="error">{error}</div>}
            <ul>
                {items.map((item, index) => {
                    let display;
                    if (item.type === 'color') {
                        display = (
                            <li key={index} className="color-box" style={{ backgroundColor: item.content || "#ffffff" }}>{item.content || "#ffffff"} <button onClick={() => deleteItem(index)}>X</button></li>
                        )
                        return display;
                    }
                    if (item.type === 'image') {
                        display = (
                            <li key={index} className="color-box" ><img width="120" src={item.content}></img> <button onClick={() => deleteItem(index)}>X</button></li>
                        )
                        return display;
                    }
                    if (item.type === 'link') {
                        display = (
                            <li key={index} className="color-box" ><a target="_blank" href={item.link}>{item.content}</a> <button onClick={() => deleteItem(index)}>X</button></li>
                        )
                        return display;
                    }
                })
                }
            </ul>
        </div>
    )
}