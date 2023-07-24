import React, { useState, useEffect } from 'react'

const DownloadUploadData = () => {
    const defaultFileType = "json"
    const fileNames = {
        json: "states.json",
        csv: "states.csv",
        text: "states.txt",
    }

    const [fileType, setFileType] = useState(defaultFileType)
    const [fileDownloadUrl, setFileDownloadUrl] = useState(null)
    const [status, setStatus] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)
    const data = [
        { state: "Arizona", electors: 11 },
        { state: "Florida", electors: 29 },
        { state: "Iowa", electors: 6 },
        { state: "Michigan", electors: 16 },
        { state: "North Carolina", electors: 15 },
        { state: "Ohio", electors: 18 },
        { state: "Pennsylvania", electors: 20 },
        { state: "Wisconsin", electors: 10 },
    ]

    useEffect(() => {
        if (isUploading) {
            dofileUpload.click()
        }
    })

    useEffect(() => {
        if (isDownloading) {
            dofileDownload.click()
            URL.revokeObjectURL(fileDownloadUrl)
            setFileDownloadUrl("")
        }
    })

    const changeFileType = (e) => {
        const value = e.target.value
        setFileType(value)
    }

    const download = (e) => {
        e.preventDefault()
        let output
        if (fileType === "json") {
            output = JSON.stringify({ states: data },
                null, 4)
        } else if (fileType === "csv") {
            let contents = []
            contents.push(["State", "Electors"])
            data.forEach(row => {
                contents.push([row.state, row.electors])
            })
            output = makeCSV(contents)
        } else if (fileType === "text") {
            output = ''
            data.forEach(row => {
                output += `${row.state}: ${row.electors}\n`
            })
        }
        const blob = new Blob([output])
        const newFileDownloadUrl = URL.createObjectURL(blob)
        setFileDownloadUrl(newFileDownloadUrl)
        setIsDownloading(true)
        setIsDownloading(false)
    }

    const makeCSV = (content) => {
        let csv = ''
        content.forEach((value) => {
            value.forEach((item, i) => {
                let innerValue = item === null ? '' : item.toString()
                let result = innerValue.replace(/"/g, '""')
                if (result.search(/("|,|\n)/g) >= 0) {
                    result = '"' + result + '"'
                }
                if (i > 0) {
                    csv += ','
                }
                csv += result
            })
            csv += '\n'
        })
        return csv
    }

    const upload = (e) => {
        e.preventDefault()
        setIsUploading(true)
        setIsUploading(false)
    }

    const openFile = (evt) => {
        let status = []
        const fileObj = evt.target.files[0]
        const reader = new FileReader()

        reader.onload = (e) => {
            const fileContents = e.target.result
            status.push(`File name: "${fileObj.name}". Length: ${fileContents.length} bytes.`)
            const first80char = fileContents.substring(0, 80)
            status.push(`First 80 characters of the file:\n${first80char}`)
            setStatus(status.join("\n"))
        }

        reader.readAsText(fileObj)
    }

    let dofileUpload, dofileDownload // Refs

    return (
        <div>
            <h2>2020 US Swing States</h2>
            <table>
                <thead>
                    <tr>
                        <th>State</th>
                        <th>Electors</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.state}>
                            <td>{item.state}</td>
                            <td>{item.electors}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form>
                <span className="mr">File type:</span>
                <select name="fileType" onChange={changeFileType} value={fileType} className="mr">
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                    <option value="text">Text</option>
                </select>

                <button onClick={download}>Download the file!</button>

                <a
                    className="hidden"
                    download={fileNames[fileType]}
                    href={fileDownloadUrl}
                    ref={(e) => (dofileDownload = e)}
                >
                    download it
                </a>

                <p>
                    <button onClick={upload}>Upload a file!</button> Only json, csv, and text files are ok.
                </p>

                <input
                    type="file"
                    className="hidden"
                    multiple={false}
                    accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain"
                    onChange={openFile}
                    ref={(e) => (dofileUpload = e)}
                />
            </form>
            <pre className="status">{status}</pre>
        </div>
    )
}

export default DownloadUploadData