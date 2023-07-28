import React, { useState, useEffect } from 'react'
import { MoodboardContext } from "../../context/moodboardContext";
import { loadPathsFromLocalStorage } from "./pathOperations"
import { useLocalStorage } from "../../components/hooks/useLocalStorage"
const DownloadUploadData = () => {

    const { items, galleryItems } = React.useContext(MoodboardContext);
    const [paths, setPaths] = useState(loadPathsFromLocalStorage() || [])
    const [todos, setTodos] = useLocalStorage("todos", [])
    const [fileDownloadUrl, setFileDownloadUrl] = useState(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const savePathsToLocalStorage = () => {
        const savingPaths = paths.map((path) => {
            return ({ ...path, path: [`M${path["path"].map((point) => `${point.x} ${point.y}`).join(' L')}`] })
        })
        return savingPaths
    }
    const data = [
        { items },
        { paths: savePathsToLocalStorage() },
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
    // useEffect(() => {
    //     console.log("Updated");
    // }, [items, paths, galleryItems, todos])

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
            const data = JSON.parse(e.target.result)
            const { items: newItems } = data.vible[0]
            const { paths: newPaths } = data.vible[1]
            const { galleryItems: newGalleryItems } = data.vible[2]
            const { todos: newTodos } = data.vible[3]
            localStorage.setItem('items', JSON.stringify([...items, ...newItems]))
            localStorage.setItem('paths', JSON.stringify([...savePathsToLocalStorage(), ...newPaths]))
            localStorage.setItem('galleryItems', JSON.stringify([...galleryItems, ...newGalleryItems]))
            localStorage.setItem('todos', JSON.stringify([...todos, ...newTodos]))
            refresh()
        }
        reader.readAsText(fileObj)
    }

    let dofileUpload, dofileDownload // Refs

    return (
        <div>
            <form style={{ padding: ".6rem", display: "flex", gap: ".2rem", justifyContent: "space-between" }}>
                <button onClick={download}>Download Board</button>
                <a
                    className="hidden"
                    style={{ display: "none" }}
                    download={"vible.json"}
                    href={fileDownloadUrl}
                    ref={(e) => (dofileDownload = e)}
                >
                </a>
                <button onClick={upload}>Upload Vible board</button>
                <input
                    id="upload"
                    type="file"
                    className="hidden"
                    style={{ display: "none" }}
                    multiple={false}
                    accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain"
                    onChange={openFile}
                    ref={(e) => (dofileUpload = e)}
                />
            </form>
        </div>
    )
}

export default DownloadUploadData