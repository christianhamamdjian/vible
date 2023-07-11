export const handlePdfDelete = (id) => {
    const request = indexedDB.open('vible-database', 1);
    request.onsuccess = function (e) {
        const db = e.target.result;
        if (!id) {
            const request = db.transaction('pdfs', 'readwrite')
                .objectStore('pdfs')
                .clear()
        } else {
            const request = db.transaction('pdfs', 'readwrite')
                .objectStore('pdfs')
                .delete(id)
        }
        request.onsuccess = () => {
            console.log(id ? `Pdf deleted: ${id}` : "All Pdfs deleted");
        }
        request.onerror = (err) => {
            console.error(`Error to delete pdf: ${err}`)
        }
    }
    request.onerror = function () {
        console.error('Error opening IndexedDB.');
    }
}