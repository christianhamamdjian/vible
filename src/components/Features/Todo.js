import React, { useState, useRef } from 'react';
import { useLocalStorage } from "../hooks/useLocalStorage";
import { MoodboardContext } from "../../context/moodboardContext";

const Todo = () => {
    const { handleTodosToggle, todosShow, handleTodoAddToBoard, handleTransferredTodo } = React.useContext(MoodboardContext);

    const [todos, setTodos] = useLocalStorage("todos", []);
    const [inputValue, setInputValue] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTodoText, setEditingTodoText] = useState('');
    const [dragging, setDragging] = useState(false)

    const dragItem = useRef();
    const dragOverItem = useRef();

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if (inputValue.trim() === '') {
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false,
        };

        setTodos([...todos, newTodo]);
        setInputValue('');
    };

    const handleTodoToggle = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });

        setTodos(updatedTodos);
    };

    const handleTodoDelete = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleTodoEditStart = (id, text) => {
        setEditingTodoId(id);
        setEditingTodoText(text);
    };

    const handleTodoEditChange = (event) => {
        setEditingTodoText(event.target.value);
    };

    const handleTodoEditSubmit = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, text: editingTodoText };
            }
            return todo;
        });
        setTodos(updatedTodos);
        setEditingTodoId(null);
        setEditingTodoText('');
    };

    const dragStart = (e, position, text) => {
        handleTransferredTodo(e, text)
        dragItem.current = position
        setDragging(true)
    };
    const dragOver = (e, position) => {
        if (dragging) {
            e.preventDefault();
        }
        dragOverItem.current = position;
    };
    const drop = (e) => {
        e.preventDefault();
        const copyListItems = [...todos];
        const dragItemContent = copyListItems[dragItem.current];
        copyListItems.splice(dragItem.current, 1);
        copyListItems.splice(dragOverItem.current, 0, dragItemContent);
        dragItem.current = null;
        dragOverItem.current = null;
        setTodos(copyListItems);
        setDragging(false)
    };
    return (
        <>
            <div className={`todo ${todosShow ? "todo-show" : "todo-hide"}`}>
                <button
                    className="toggle-todo"
                    onClick={handleTodosToggle}
                >
                    Todo
                </button >
                <div className='todo-list'>
                    <form onSubmit={handleFormSubmit}>
                        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Add a todo..." />
                        <button type="submit">Add</button>
                    </form>
                    <ul ref={dragOverItem}>
                        {todos && todos.map((todo, index) => (
                            <li
                                key={todo.id}
                                ref={dragItem}
                                onPointerDown={(e) => dragStart(e, index, todo.text)}
                                onPointerMove={(e) => dragOver(e, index)}
                                onPointerUp={(e) => drop(e)}
                                draggable
                            >
                                {editingTodoId === todo.id ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editingTodoText}
                                            onChange={handleTodoEditChange}
                                            onBlur={() => handleTodoEditSubmit(todo.id)}
                                        />
                                        <button onClick={() => handleTodoEditSubmit(todo.id)}>Done</button>
                                    </>
                                ) : (
                                    <>
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => handleTodoToggle(todo.id)}
                                        />
                                        <span className={todo.completed ? 'completed' : ''} style={{ textDecoration: todo.completed ? "line-through" : "none" }}>{todo.text}</span>
                                        <div className="todo-buttons">
                                            <button onClick={() => handleTodoDelete(todo.id)}>&times;</button>
                                            <button onClick={() => handleTodoEditStart(todo.id, todo.text)}>Edit</button>
                                            <button onClick={() => handleTodoAddToBoard(todo.text)}>+ board</button>
                                        </div>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div >
        </>
    )
}
export default Todo

