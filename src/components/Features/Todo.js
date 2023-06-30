import React, { useState } from 'react';
import { useLocalStorage } from "../hooks/useLocalStorage";
import { MoodboardContext } from "../../context/moodboardContext";

const Todo = () => {
    const { handleTodosToggle, todosShow } = React.useContext(MoodboardContext);

    const [todos, setTodos] = useLocalStorage("todos", []);
    const [inputValue, setInputValue] = useState('');

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
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => handleTodoToggle(todo.id)}
                                />
                                <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
                                <button onClick={() => handleTodoDelete(todo.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}
export default Todo