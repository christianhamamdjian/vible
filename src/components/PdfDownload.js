import React from 'react';

const DownloadSVGAsPDF = () => {
    const handleDownload = () => {
        const svgElement = document.getElementById('my-svg'); // Replace with the ID of your SVG element
        const fileName = 'my-file.pdf'; // Replace with the desired file name

        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const svgSize = svgElement.getBoundingClientRect();

        canvas.width = svgSize.width;
        canvas.height = svgSize.height;

        const img = new Image();
        img.setAttribute('crossOrigin', 'anonymous');

        img.onload = function () {
            context.clearRect(0, 0, svgSize.width, svgSize.height);
            context.drawImage(img, 0, 0);

            const pdf = new jsPDF('p', 'pt', [svgSize.width, svgSize.height]);
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, svgSize.width, svgSize.height);
            pdf.save(fileName);
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    };

    return (
        <div>
            <button onClick={handleDownload}>Download as PDF</button>
            <svg id="my-svg">
                {/* SVG content */}
            </svg>
        </div>
    );
};

export default DownloadSVGAsPDF;
