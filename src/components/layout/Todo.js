import React, { useState, useRef } from 'react'
import { useLocalStorage } from "../hooks/useLocalStorage"
import Tooltips from '../tooltips/Tooltips'
import { MoodboardContext } from "../../context/moodboardContext"

const Todo = () => {
    const { handleTodosToggle, todosShow, handleTodoAddToBoard, getTextColor, activeBoard } = React.useContext(MoodboardContext)

    const [todos, setTodos] = useLocalStorage("todos", [])
    const [inputValue, setInputValue] = useState('')
    const [editingTodoId, setEditingTodoId] = useState(null)
    const [editingTodoText, setEditingTodoText] = useState('')
    const [isDragging, setIsDragging] = useState()

    const containerRef = useRef()
    const todoRef = useRef()

    const windowSize = useRef([window.innerWidth, window.innerHeight])
    const buttonsColor = activeBoard.buttonsColor
    function dragStart(e, index, text, completed) {
        if (e.button === 2 || editingTodoId || editingTodoText) return
        setIsDragging(index)
        const todoContainer = containerRef.current
        const items = [...todoContainer.childNodes]
        const dragItem = items[index]
        const itemsBelowDragItem = items.slice(index + 1)
        const notDragItems = items.filter((_, i) => i !== index)
        const dragData = todos[index]
        let newData = [...todos]

        const dragBoundingRect = dragItem.getBoundingClientRect()

        const space = items.length > 1 && items[1].getBoundingClientRect().top - items[0].getBoundingClientRect().bottom

        dragItem.style.position = "fixed"
        dragItem.style.zIndex = 5000
        dragItem.style.width = dragBoundingRect.width + "px"
        dragItem.style.height = dragBoundingRect.height + "px"
        dragItem.style.top = dragBoundingRect.top + "px"
        dragItem.style.left = dragBoundingRect.left + "px"
        dragItem.style.cursor = "grabbing"

        const div = document.createElement("div")
        div.id = "div-temp"
        div.style.width = dragBoundingRect.width + "px"
        div.style.height = dragBoundingRect.height + "px"
        div.style.pointerEvents = "none"
        todoContainer.appendChild(div)

        const distance = dragBoundingRect.height + space

        itemsBelowDragItem.forEach(item => {
            item.style.transform = `translateY(${distance}px)`
        })

        let x = e.clientX
        let y = e.clientY

        document.onpointermove = dragMove

        function dragMove(e) {

            const posX = e.clientX - x
            const posY = e.clientY - y

            dragItem.style.transform = `translate(${posX}px, ${posY}px)`

            notDragItems.forEach(item => {
                const rect1 = dragItem.getBoundingClientRect()
                const rect2 = item.getBoundingClientRect()

                let isOverlapping =
                    rect1.y < rect2.y + (rect2.height / 2) && rect1.y + (rect1.height / 2) > rect2.y

                if (isOverlapping) {
                    if (item.getAttribute("style")) {
                        item.style.transform = ""
                        index++
                    } else {
                        item.style.transform = `translateY(${distance}px)`
                        index--
                    }
                    newData = todos.filter(item => item.id !== dragData.id)
                    newData.splice(index, 0, dragData)
                }

            })
        }

        document.onpointerup = dragEnd

        function dragEnd(e) {
            const posX = e.clientX - x
            const posY = e.clientY - y
            if (e.clientX < (windowSize.current[0] - todoRef.current.offsetWidth) || e.clientY < (windowSize.current[1] - todoRef.current.offsetHeight)) {
                dragItem.style.transform = `translate(${posX}px, ${posY}px)`
                handleTodoAddToBoard(text, completed)
            }

            document.onpointerup = ""
            document.onpointermove = ""

            dragItem.style = ""
            todoContainer.removeChild(div)

            items.forEach(item => item.style = "")

            setIsDragging(undefined)
            setTodos(newData)
        }
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()

        if (inputValue.trim() === '') {
            return
        }

        const newTodo = {
            id: Date.now(),
            text: inputValue,
            completed: false,
        }

        setTodos([...todos, newTodo])
        setInputValue('')
    }

    const handleTodoToggle = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed }
            }
            return todo
        })

        setTodos(updatedTodos)
    }

    const handleTodoDelete = (id) => {
        const updatedTodos = todos.filter((todo) => todo.id !== id)
        setTodos(updatedTodos)
    }

    const handleTodoEditStart = (id, text) => {
        setEditingTodoId(id)
        setEditingTodoText(text)
    }

    const handleTodoEditChange = (e) => {
        setEditingTodoText(e.target.value)
    }

    const handleTodoEditSubmit = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, text: editingTodoText }
            }
            return todo
        })
        setTodos([...updatedTodos])
        setEditingTodoId(null)
        setEditingTodoText('')
    }


    return (
        <>
            <div
                className={`todo ${todosShow ? "todo-show" : "todo-hide"}`}
                ref={todoRef}>

                <button
                    className="themable toggle-todo"
                    style={{ backgroundColor: todosShow ? "rgb(229, 245, 255)" : buttonsColor, color: `${getTextColor(buttonsColor)}` }}
                    title="Todo list"
                    onClick={handleTodosToggle}
                >
                    <svg
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M20 4H4C3.44771 4 3 4.44772 3 5V19C3 19.5523 3.44772 20 4 20H20C20.5523 20 21 19.5523 21 19V5C21 4.44771 20.5523 4 20 4ZM4 2C2.34315 2 1 3.34315 1 5V19C1 20.6569 2.34315 22 4 22H20C21.6569 22 23 20.6569 23 19V5C23 3.34315 21.6569 2 20 2H4ZM6 7H8V9H6V7ZM11 7C10.4477 7 10 7.44772 10 8C10 8.55228 10.4477 9 11 9H17C17.5523 9 18 8.55228 18 8C18 7.44772 17.5523 7 17 7H11ZM8 11H6V13H8V11ZM10 12C10 11.4477 10.4477 11 11 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H11C10.4477 13 10 12.5523 10 12ZM8 15H6V17H8V15ZM10 16C10 15.4477 10.4477 15 11 15H17C17.5523 15 18 15.4477 18 16C18 16.5523 17.5523 17 17 17H11C10.4477 17 10 16.5523 10 16Z"
                            fill="currentColor"
                        />
                    </svg>
                    <Tooltips
                        position="top"
                        width="4rem"
                        height="7rem"
                        top="-11.2rem"
                        bottom="90%"
                        left="-2rem"
                        right=""
                        marginRight=""
                        marginLeft=""
                        tipTop="7rem"
                        tipLeft="50%"
                        text="Add todos then drop them on the board"
                    />
                </button >
                {todosShow && <>  <div
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
                            +
                        </button>
                    </form>
                    <ul className='todo-container' ref={containerRef}>
                        {
                            todos.map((todo, index) => (
                                <li key={todo.id}
                                    onPointerDown={e => dragStart(e, index, todo.text, todo.completed)}
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
                                                        <svg
                                                            x="104"
                                                            y="-57"
                                                            width="18"
                                                            height="18"
                                                            viewBox="0 0 24 24"
                                                            fill="transparent"
                                                            style={{
                                                                cursor: "pointer"
                                                            }}
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M10.2426 16.3137L6 12.071L7.41421 10.6568L10.2426 13.4853L15.8995 7.8284L17.3137 9.24262L10.2426 16.3137Z"
                                                                fill="#9da6b2"
                                                            />
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z"
                                                                fill="#9da6b2"
                                                            />
                                                        </svg>
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
                                                        <button className='todo-button'
                                                            onClick={() => handleTodoEditStart(todo.id, todo.text)}
                                                        >
                                                            <div className='todo-edit'>
                                                                <svg
                                                                    width="18"
                                                                    height="18"
                                                                    viewBox="0 0 24 24"
                                                                    fill="none"
                                                                    transform="rotate(-45)"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fillRule="evenodd"
                                                                        clipRule="evenodd"
                                                                        d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM18.5793 19.531C20.6758 17.698 22 15.0036 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.9616 3.28743 17.6225 5.33317 19.4535L6.99999 10.9738H9.17026L12 6.07251L14.8297 10.9738H17L18.5793 19.531ZM16.0919 21.1272L15.2056 12.9738H8.79438L7.90814 21.1272C9.15715 21.688 10.5421 22 12 22C13.4579 22 14.8428 21.688 16.0919 21.1272Z"
                                                                        fill="currentColor"
                                                                    />
                                                                </svg>
                                                            </div>
                                                        </button>
                                                        <button className='todo-button'
                                                            onClick={() => handleTodoAddToBoard(todo.text)}
                                                        >
                                                            <div className='todo-board-out'></div>
                                                            <div className='todo-board-in'>+</div>

                                                        </button>
                                                        <button className='todo-button'
                                                            onClick={() => handleTodoDelete(todo.id)}
                                                        >
                                                            <div className='todo-delete'>&times;</div>
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul >
                </div >
                </>}
            </div >
        </>
    )
}
export default Todo

