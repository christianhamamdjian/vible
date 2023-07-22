import React, { useState, useRef } from 'react'
import { useLocalStorage } from "../hooks/useLocalStorage"
import Tooltips from '../tooltips/Tooltips'
import { MoodboardContext } from "../../context/moodboardContext"

const Todo = () => {
    const { handleTodosToggle, todosShow, handleTodoAddToBoard } = React.useContext(MoodboardContext)

    const [todos, setTodos] = useLocalStorage("todos", [])
    const [inputValue, setInputValue] = useState('')
    const [editingTodoId, setEditingTodoId] = useState(null)
    const [editingTodoText, setEditingTodoText] = useState('')
    const [isDragging, setIsDragging] = useState()

    const containerRef = useRef()

    const windowSize = useRef([window.innerWidth, window.innerHeight])

    // function detectLeftButton(e) {
    //     e = e || window.event
    //     if ("buttons" in e) {
    //         return e.buttons === 1
    //     }

    //     let button = e.which || e.button
    //     return button === 1
    // }

    function dragStart(e, index, text) {
        // if (!detectLeftButton()) return 

        setIsDragging(index)

        const container = containerRef.current
        const items = [...container.childNodes]
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
        container.appendChild(div)

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
            if (e.clientX < windowSize.current[0] - containerRef.current.offsetWidth && e.clientY < windowSize.current[1] - containerRef.current.offsetHeight) {
                dragItem.style.transform = `translate(${posX}px, ${posY}px)`
                handleTodoAddToBoard(text)
            }

            document.onpointerup = ""
            document.onpointermove = ""

            dragItem.style = ""
            container.removeChild(div)

            items.forEach(item => item.style = "")

            setIsDragging(undefined)
            setTodos(newData)
        }
    }


    const handleInputChange = (event) => {
        setInputValue(event.target.value)
    }

    const handleFormSubmit = (event) => {
        event.preventDefault()

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

    const handleTodoEditChange = (event) => {
        setEditingTodoText(event.target.value)
    }

    const handleTodoEditSubmit = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, text: editingTodoText }
            }
            return todo
        })
        setTodos(updatedTodos)
        setEditingTodoId(null)
        setEditingTodoText('')
    }


    return (
        <>
            <div className={`todo ${todosShow ? "todo-show" : "todo-hide"}`}>
                <button
                    className="toggle-todo"
                    onClick={handleTodosToggle}
                >
                    {/* <div>|||</div> */}
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
                        width="8rem"
                        height="4rem"
                        top="-7rem"
                        bottom="90%"
                        left="-4rem"
                        right=""
                        marginRight=""
                        marginLeft=""
                        tipTop="4rem"
                        tipLeft="50%"
                        text="Add todos then drop them on the board!"
                    />
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
                            +
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
                                                        <button className='todo-button'
                                                            onClick={() => handleTodoEditStart(todo.id, todo.text)}
                                                        >
                                                            <div className='todo-edit'>
                                                                <span className='todo-edit-line'>_ </span>
                                                                <span className='todo-edit-pen'>
                                                                    /
                                                                </span></div>
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
            </div >
        </>
    )
}
export default Todo

