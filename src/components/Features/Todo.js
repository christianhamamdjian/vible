import React, { useState } from 'react';
import { useLocalStorage } from "../hooks/useLocalStorage";
import { MoodboardContext } from "../../context/moodboardContext";

const Todo = () => {
    const { handleTodosToggle, todosShow, handleTodoAddToBoard } = React.useContext(MoodboardContext);

    const [todos, setTodos] = useLocalStorage("todos", []);
    const [inputValue, setInputValue] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTodoText, setEditingTodoText] = useState('');

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

    return (
        <>
            <div className={` todo ${todosShow ? "todo-show" : "todo-hide"}`}>
                <button
                    className="toggle-todo"
                    onClick={handleTodosToggle}
                >
                    Todo
                </button >
                <div>
                    <form onSubmit={handleFormSubmit}>
                        <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Add a todo..." />
                        <button type="submit">Add</button>
                    </form>
                    <ul>
                        {todos.map((todo) => (
                            <li key={todo.id}>
                                {editingTodoId === todo.id ? (
                                    <input
                                        type="text"
                                        value={editingTodoText}
                                        onChange={handleTodoEditChange}
                                        onBlur={() => handleTodoEditSubmit(todo.id)}
                                    />
                                ) : (
                                    <>
                                        <input
                                            type="checkbox"
                                            checked={todo.completed}
                                            onChange={() => handleTodoToggle(todo.id)}
                                        />
                                        <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
                                        <button onClick={() => handleTodoDelete(todo.id)}>Delete</button>
                                        <button onClick={() => handleTodoEditStart(todo.id, todo.text)}>Edit</button>
                                        <button onClick={() => handleTodoAddToBoard(todo.text)}>Add to board</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Todo

