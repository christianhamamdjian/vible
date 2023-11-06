import React, { useState, useEffect } from 'react'
import { MoodboardContext } from "../../context/moodboardContext"
import { loadPathsFromLocalStorage } from "../helperFunctions/pathOperations"
import template from "../../templates/vible-demo.json"

const LoadTemplate = () => {
    const { items, galleryItems, boards, activeBoard } = React.useContext(MoodboardContext);
    const [paths, setPaths] = useState(loadPathsFromLocalStorage() || [])

    const savePathsToLocalStorage = (selectedBoardPaths) => {
        const newPaths = selectedBoardPaths ? selectedBoardPaths : paths
        const savingPaths = newPaths.map((path) => {
            return ({ ...path, path: [`M${path["path"].map((point) => `${point.x} ${point.y}`).join(' L')}`] })
        })
        return savingPaths
    }

    const refresh = () => window.location.reload(true)
    const loadFile = (e) => {
        e.preventDefault()
        const newBoardId = Date.now()
        const loadedItems = template.vible[0]["items"]
        const loadedPaths = template.vible[1]["paths"]
        const loadedBoards = template.vible[2]["boards"]
        const boardToUpload = loadedBoards[0]
        const newBoard = { id: newBoardId, name: boards.length + 1, boardColor: boardToUpload.boardColor, buttonsColor: boardToUpload.buttonsColor, boardBackground: boardToUpload.boardBackground }

        const newItems = loadedItems.map(el => ({ ...el, id: el.id + Math.floor(Math.random() * 100), board: newBoardId }))
        const newPaths = loadedPaths.map(el => ({ ...el, id: el.id + Math.floor(Math.random() * 100), board: newBoardId }))

        localStorage.setItem('items', JSON.stringify([...items, ...newItems]))
        localStorage.setItem('paths', JSON.stringify([...savePathsToLocalStorage(), ...newPaths]))
        localStorage.setItem('boards', JSON.stringify([...boards, newBoard]))
        refresh()
    }

    return (
        <div>
            <form className='download-form'>
                <button
                    title="Load Demo Board"
                    className='toggler'
                    onClick={loadFile}>
                    Demo Board
                </button>
            </form>
        </div >
    )
}

export default LoadTemplate