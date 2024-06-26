import React, { useState, useEffect } from 'react'
import { MoodboardContext } from "../../context/moodboardContext";
import { loadPathsFromLocalStorage } from "../helperFunctions/pathOperations"
import { useLocalStorage } from "../hooks/useLocalStorage"
import Tooltips from '../tooltips/Tooltips'
const DownloadUploadData = () => {

    const { items, galleryItems, boards, activeBoard } = React.useContext(MoodboardContext);
    const [paths, setPaths] = useState(loadPathsFromLocalStorage() || [])
    const [todos, setTodos] = useLocalStorage("todos", [])
    const [fileDownloadUrl, setFileDownloadUrl] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const savePathsToLocalStorage = (selectedBoardPaths) => {
        const newPaths = selectedBoardPaths ? selectedBoardPaths : paths
        const savingPaths = newPaths.map((path) => {
            return ({ ...path, path: [`M${path["path"].map((point) => `${point.x} ${point.y}`).join(' L')}`] })
        })
        return savingPaths
    }

    const boardItems = items.filter(el => el.board === activeBoard.id)
    const boardPaths = paths.filter(el => el.board === activeBoard.id)
    const currentBoard = [{ ...activeBoard }]

    const boardItemsNoPdf = boardItems.filter(el => el.type !== "pdf")

    const data = [
        { items: boardItemsNoPdf },
        { paths: savePathsToLocalStorage(boardPaths) },
        { boards: currentBoard },
        { galleryItems },
        { todos }
    ]

    useEffect(() => {
        if (isUploading) {
            dofileUpload.click()
            setIsUploading(false)
        }
    })

    useEffect(() => {
        if (isDownloading) {
            dofileDownload.click()
            setIsDownloading(false)
            setFileDownloadUrl("")
        }
    })

    const download = (e) => {
        e.preventDefault()
        const output = JSON.stringify({ vible: data }, null, 4)
        const blob = new Blob([output])
        const newFileDownloadUrl = URL.createObjectURL(blob)
        URL.revokeObjectURL(fileDownloadUrl)
        setFileDownloadUrl("")
        setFileDownloadUrl(newFileDownloadUrl)
        setIsDownloading(true)
    }

    const upload = (e) => {
        e.preventDefault()
        setIsUploading(true)
    }
    const refresh = () => window.location.reload(true)

    const openFile = (e) => {
        const fileObj = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
            const newBoardId = Date.now()
            const data = JSON.parse(e.target.result)
            const uploadedItems = data.vible[0]["items"]
            const uploadedPaths = data.vible[1]["paths"]
            const uploadedBoards = data.vible[2]["boards"]
            const boardToUpload = uploadedBoards[0]
            const newBoard = { id: newBoardId, name: boards.length + 1, boardColor: boardToUpload.boardColor, buttonsColor: boardToUpload.buttonsColor, boardBackground: boardToUpload.boardBackground }

            const newItems = uploadedItems.map(el => ({ ...el, id: el.id + Math.floor(Math.random() * 1000), board: newBoardId }))
            const newPaths = uploadedPaths.map(el => ({ ...el, id: el.id + Math.floor(Math.random() * 1000), board: newBoardId }))

            localStorage.setItem('items', JSON.stringify([...items, ...newItems]))
            localStorage.setItem('paths', JSON.stringify([...savePathsToLocalStorage(), ...newPaths]))
            localStorage.setItem('boards', JSON.stringify([...boards, newBoard]))
            localStorage.setItem('activeBoard', JSON.stringify({ ...newBoard }))
            refresh()
        }
        reader.readAsText(fileObj)
    }

    let dofileUpload, dofileDownload // Refs

    return (
        <div>
            <form className='download-form'>
                <Tooltips
                    position="bottom"
                    width="4.3rem"
                    height="4rem"
                    top="-5rem"
                    bottom="90%"
                    left="3rem"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="-.7rem"
                    tipLeft="50%"
                    text="Download board as JSON"
                />
                <button
                    title="Download board in JSON format."
                    className='toggler'
                    onClick={download}>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V12.1578L16.2428 8.91501L17.657 10.3292L12.0001 15.9861L6.34326 10.3292L7.75748 8.91501L11 12.1575V5Z"
                            fill="currentColor"
                        />
                        <path
                            d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
                            fill="currentColor"
                        />
                    </svg>

                </button>

                <a
                    className="hidden"
                    download={"vible.json"}
                    href={fileDownloadUrl}
                    ref={(e) => (dofileDownload = e)}
                >
                </a>

                <button
                    title="Upload a board in JSON format."
                    className='toggler'
                    onClick={upload}>
                    {/* Upload Vible board */}
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className='upload-svg'
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11 5C11 4.44772 11.4477 4 12 4C12.5523 4 13 4.44772 13 5V12.1578L16.2428 8.91501L17.657 10.3292L12.0001 15.9861L6.34326 10.3292L7.75748 8.91501L11 12.1575V5Z"
                            fill="currentColor"
                        />
                        <path
                            d="M4 14H6V18H18V14H20V18C20 19.1046 19.1046 20 18 20H6C4.89543 20 4 19.1046 4 18V14Z"
                            fill="currentColor"
                        />
                    </svg>

                </button>
                <Tooltips
                    position="bottom"
                    width="3.5rem"
                    height="4rem"
                    top="-5rem"
                    bottom="90%"
                    left="-2.5rem"
                    right=""
                    marginRight=""
                    marginLeft=""
                    tipTop="-.7rem"
                    tipLeft="50%"
                    text="Upload a JSON board"
                />
                <input
                    id="upload"
                    type="file"
                    className="hidden"
                    multiple={false}
                    accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain"
                    onChange={openFile}
                    ref={(e) => (dofileUpload = e)}
                />
            </form>
        </div >
    )
}

export default DownloadUploadData