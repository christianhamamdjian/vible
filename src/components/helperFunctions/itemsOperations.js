export const handlePdfDelete = (id) => {
    let request = indexedDB.open('vible-database', 1);
    request.onsuccess = function (e) {
        let db = e.target.result;
        if (!id) {
            request = db.transaction('pdfs', 'readwrite')
                .objectStore('pdfs')
                .clear()
        } else {
            request = db.transaction('pdfs', 'readwrite')
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