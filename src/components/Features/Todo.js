import React, { useState, useRef } from 'react';
import { useLocalStorage } from "../hooks/useLocalStorage";
import { MoodboardContext } from "../../context/moodboardContext";

const Todo = () => {
    const { handleTodosToggle, todosShow, handleTodoAddToBoard } = React.useContext(MoodboardContext);

    const [todos, setTodos] = useLocalStorage("todos", []);
    const [inputValue, setInputValue] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTodoText, setEditingTodoText] = useState('');
    const [isDragging, setIsDragging] = useState();

    const containerRef = useRef()

    const windowSize = useRef([window.innerWidth, window.innerHeight]);

    function detectLeftButton(e) {
        e = e || window.event;
        if ("buttons" in e) {
            return e.buttons === 1;
        }

        let button = e.which || e.button;
        return button === 1;
    }

    function dragStart(e, index, text) {
        if (!detectLeftButton()) return; // only use left mouse click;

        setIsDragging(index);

        const container = containerRef.current;
        const items = [...container.childNodes];
        const dragItem = items[index];
        const itemsBelowDragItem = items.slice(index + 1);
        const notDragItems = items.filter((_, i) => i !== index);
        const dragData = todos[index];
        let newData = [...todos];

        const dragBoundingRect = dragItem.getBoundingClientRect();

        const space = items.length > 1 && items[1].getBoundingClientRect().top - items[0].getBoundingClientRect().bottom;

        dragItem.style.position = "fixed";
        dragItem.style.zIndex = 5000;
        dragItem.style.width = dragBoundingRect.width + "px";
        dragItem.style.height = dragBoundingRect.height + "px";
        dragItem.style.top = dragBoundingRect.top + "px";
        dragItem.style.left = dragBoundingRect.left + "px";
        dragItem.style.cursor = "grabbing";

        const div = document.createElement("div");
        div.id = "div-temp";
        div.style.width = dragBoundingRect.width + "px";
        div.style.height = dragBoundingRect.height + "px";
        div.style.pointerEvents = "none";
        container.appendChild(div);

        const distance = dragBoundingRect.height + space;

        itemsBelowDragItem.forEach(item => {
            item.style.transform = `translateY(${distance}px)`;
        })

        let x = e.clientX;
        let y = e.clientY;

        document.onpointermove = dragMove;

        function dragMove(e) {
            const posX = e.clientX - x;
            const posY = e.clientY - y;

            dragItem.style.transform = `translate(${posX}px, ${posY}px)`;

            notDragItems.forEach(item => {
                const rect1 = dragItem.getBoundingClientRect();
                const rect2 = item.getBoundingClientRect();

                let isOverlapping =
                    rect1.y < rect2.y + (rect2.height / 2) && rect1.y + (rect1.height / 2) > rect2.y;

                if (isOverlapping) {
                    if (item.getAttribute("style")) {
                        item.style.transform = "";
                        index++
                    } else {
                        item.style.transform = `translateY(${distance}px)`;
                        index--
                    }
                    newData = todos.filter(item => item.id !== dragData.id);
                    newData.splice(index, 0, dragData);
                }

            })

        }

        document.onpointerup = dragEnd;

        function dragEnd(e) {
            if (e.clientX < windowSize.current[0] - containerRef.current.offsetWidth && e.clientY < windowSize.current[1] - containerRef.current.offsetHeight) {
                handleTodoAddToBoard(text)
            }

            document.onpointerup = "";
            document.onpointermove = "";

            dragItem.style = "";
            container.removeChild(div);

            items.forEach(item => item.style = "");

            setIsDragging(undefined);
            setTodos(newData)
        }
    }


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
            <div className={`todo ${todosShow ? "todo-show" : "todo-hide"}`}>
                <button
                    className="toggle-todo"
                    onClick={handleTodosToggle}
                >
                    Todo
                </button >
                <div
                    className='todo-list'
                >
                    <form onSubmit={handleFormSubmit}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Add a todo..."
                        />
                        <button
                            type="submit"
                        >
                            Add
                        </button>
                    </form>
                    <ul className='todo-container' ref={containerRef}>
                        {
                            todos.map((todo, index) => (
                                <li key={todo.id}
                                    onPointerDown={e => dragStart(e, index, todo.text)}
                                >
                                    <div
                                        className={`card ${isDragging === index ? 'dragging' : ''}`}
                                    >
                                        <div className="box">
                                            {editingTodoId === todo.id ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={editingTodoText}
                                                        onChange={handleTodoEditChange}
                                                        onBlur={() => handleTodoEditSubmit(todo.id)}
                                                    />
                                                    <button
                                                        onClick={() => handleTodoEditSubmit(todo.id)}
                                                    >
                                                        Done
                                                    </button>
                                                </>
                                            ) : (
                                                <>
                                                    <input
                                                        type="checkbox"
                                                        checked={todo.completed}
                                                        onChange={() => handleTodoToggle(todo.id)}
                                                    />
                                                    <span
                                                        className={todo.completed ? 'completed' : ''}
                                                        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                                                    >
                                                        {todo.text}
                                                    </span>
                                                    <div className="todo-buttons">
                                                        <button
                                                            onClick={() => handleTodoDelete(todo.id)}
                                                        >
                                                            &times;
                                                        </button>
                                                        <button
                                                            onClick={() => handleTodoEditStart(todo.id, todo.text)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleTodoAddToBoard(todo.text)}
                                                        >
                                                            + board
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>

            </div >

        </>
    )
}
export default Todo

