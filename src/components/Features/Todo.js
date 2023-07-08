import React, { useState, useRef } from 'react';
import { useLocalStorage } from "../hooks/useLocalStorage";
import { MoodboardContext } from "../../context/moodboardContext";

const Todo = () => {
    const { svgRef, handleTodosToggle, todosShow, handleTodoAddToBoard, handleTransferredTodo, resetTransferredTodo } = React.useContext(MoodboardContext);

    const [todos, setTodos] = useLocalStorage("todos", []);
    const [inputValue, setInputValue] = useState('');
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [editingTodoText, setEditingTodoText] = useState('');
    //const [dragging, setDragging] = useState(false)

    const dragItem = useRef();
    //const dragOverItem = useRef();

    const [isDragging, setIsDragging] = useState();

    const containerRef = useRef()


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
        handleTransferredTodo(e, text)
        setIsDragging(index);

        const container = containerRef.current;
        const items = [...container.childNodes];
        const dragItem = items[index];
        const itemsBelowDragItem = items.slice(index + 1);
        const notDragItems = items.filter((_, i) => i !== index);
        const dragTodos = todos[index];
        let newTodos = [...todos];


        // getBoundingClientRect of dragItem
        const dragBoundingRect = dragItem.getBoundingClientRect();

        // distance between two card 
        const space = items[1].getBoundingClientRect().top - items[0].getBoundingClientRect().bottom;


        // set style for dragItem when mouse down
        dragItem.style.position = "fixed";
        dragItem.style.zIndex = 5000;
        dragItem.style.width = dragBoundingRect.width + "px";
        dragItem.style.height = dragBoundingRect.height + "px";
        dragItem.style.top = dragBoundingRect.top + "px";
        dragItem.style.left = dragBoundingRect.left + "px";
        dragItem.style.cursor = "grabbing";


        // create alternate div element when dragItem position is fixed
        const li = document.createElement("li");
        li.id = "div-temp";
        li.style.width = dragBoundingRect.width + "px";
        li.style.height = dragBoundingRect.height + "px";
        li.style.pointerEvents = "none";
        container.appendChild(li);


        // move the elements below dragItem.
        // distance to be moved.
        const distance = dragBoundingRect.height + space;

        itemsBelowDragItem.forEach(item => {
            item.style.transform = `translateY(${distance}px)`;
        })


        // get the original coordinates of the mouse pointer
        let x = e.clientX;
        let y = e.clientY;


        // perform the function on hover.
        document.onpointermove = dragMove;

        function dragMove(e) {
            // Calculate the distance the mouse pointer has traveled.
            // original coordinates minus current coordinates.
            const posX = e.clientX - x;
            const posY = e.clientY - y;

            // Move Item
            dragItem.style.transform = `translate(${posX}px, ${posY}px)`;

            // swap position and todos
            notDragItems.forEach(item => {
                // check two elements is overlapping.
                const rect1 = dragItem.getBoundingClientRect();
                const rect2 = item.getBoundingClientRect();

                let isOverlapping =
                    rect1.y < rect2.y + (rect2.height / 2) && rect1.y + (rect1.height / 2) > rect2.y;

                if (isOverlapping) {
                    // Swap Position Card
                    if (item.getAttribute("style")) {
                        item.style.transform = "";
                        index++
                    } else {
                        item.style.transform = `translateY(${distance}px)`;
                        index--
                    }

                    // Swap todos
                    newTodos = todos.filter(item => item.id !== dragTodos.id);
                    newTodos.splice(index, 0, dragTodos);
                }

            })

        }


        // finish onPointerDown event
        document.onpointerup = dragEnd;
        document.onpmouseup = dragEnd;

        function dragEnd() {
            document.onpointerup = "";
            document.onpointermove = "";

            dragItem.style = "";
            container.removeChild(li);

            items.forEach(item => item.style = "");

            setIsDragging(undefined);
            setTodos(newTodos)

            resetTransferredTodo()
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

    // const dragStart = (e, position, text) => {
    //     handleTransferredTodo(e, text)
    //     dragItem.current = position
    //     setDragging(true)
    // };
    // const dragOver = (e, position) => {
    //     if (dragging) {
    //         e.preventDefault();
    //     }
    //     dragOverItem.current = position;
    // };
    // const drop = (e) => {
    //     e.preventDefault();
    //     // const copyListItems = [...todos];
    //     // const dragItemContent = copyListItems[dragItem.current];
    //     // copyListItems.splice(dragItem.current, 1);
    //     // copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    //     // dragItem.current = null;
    //     // dragOverItem.current = null;
    //     // setTodos(copyListItems);
    //     // setDragging(false)
    //     // resetTransferredTodo()
    // };
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
                    <ul
                        //ref={dragOverItem}
                        ref={containerRef}
                    >
                        {todos && todos.map((todo, index) => (
                            <li
                                key={todo.id}
                                ref={dragItem}
                                onPointerDown={e => dragStart(e, index, todo.text)}
                                // onPointerDown={(e) => dragStart(e, index, todo.text)}
                                // onPointerMove={(e) => dragOver(e, index)}
                                // onPointerUp={(e) => drop(e)}
                                draggable
                            >
                                <div
                                    className={`todo-card ${isDragging === index ? 'todo-dragging' : ''}`}>
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
                                </div></li>
                        ))}
                    </ul>
                </div>
            </div >
        </>
    )
}
export default Todo

