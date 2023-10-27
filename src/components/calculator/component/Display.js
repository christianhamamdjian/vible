import React from "react"
import { MoodboardContext } from "../../../context/moodboardContext"

const Display = ({ value }) => {
  const { handleTodoAddToBoard } = React.useContext(MoodboardContext);
  return (
    <div className="component-display">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button
          title="Add result to board"
          className='todo-button'
          onClick={() => handleTodoAddToBoard(value)}
        >
          <div className='todo-board-out'></div>
          <div className='todo-board-in'>+</div>
        </button>
        {value}
      </div>
    </div>
  )
}

export default Display