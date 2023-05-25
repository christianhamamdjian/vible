import React from 'react';
import { MoodboardContext } from "../../context/moodboard";

const BoxForm = () => {
    const { items, itemText, itemColor, itemLink, itemUrl, editingText, handleAddBox, handleItemText, handleItemColor, handleItemLink, handleItemUrl, handleItemTextChange, handleItemColorChange, handleItemLinkChange, handleItemUrlChange } = React.useContext(MoodboardContext);
    return (
        <div className='itemForms'>
            {!editingText && (
                <>
                    <h2>Boxes:</h2>
                    <form className='inputs' onSubmit={handleAddBox}>
                        <label>Text:</label>
                        <textarea value={itemText} onChange={handleItemText} />

                        <label>Color:</label>
                        <input type="color" name="color" value={itemColor} onChange={handleItemColor} />

                        <label>Link text:</label>
                        <input type="text" name="link" value={itemLink} onChange={handleItemLink} />

                        <label>Link url:</label>
                        <input type="text" name="url" value={itemUrl} onChange={handleItemUrl} />

                        <button type="submit">Add Box</button>
                    </form>
                </>
            )
            }
            {items.length > 0 && editingText && (
                <div className='inputs'>
                    <h2>Edit Box:</h2>
                    <label>Change text:</label>
                    <textarea
                        value={items.find(item => item.id === editingText.id).text}
                        onChange={(event) =>
                            handleItemTextChange(event, editingText.id)
                        }
                    />
                    <label>Change color:</label>
                    <input
                        type="color"
                        name="color"
                        value={items.find(item => item.id === editingText.id).color}
                        onChange={(event) =>
                            handleItemColorChange(event, editingText.id)
                        } />
                    <label>Change link:</label>
                    <input
                        type="text"
                        name="link"
                        value={items.find(item => item.id === editingText.id).link}
                        onChange={(event) =>
                            handleItemLinkChange(event, editingText.id)
                        } />

                    <label>Change url:</label>
                    <input
                        type="text"
                        name="url"
                        value={items.find(item => item.id === editingText.id).url}
                        onChange={(event) =>
                            handleItemUrlChange(event, editingText.id)
                        } />
                </div>
            )
            }
        </div>
    )
}
export default BoxForm