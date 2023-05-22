import React, { useState, useRef, useEffect } from "react";

function Canvas() {
    const canvasRef = useRef(null);
    const [boxes, setBoxes] = useState([
        { x: 50, y: 50, width: 50, height: 50, color: "#f00", img: 'https://fjolt.com/images/misc/202203281.png' },
        { x: 300, y: 100, width: 150, height: 50, color: "#0f0", link: { text: "Click here!", url: "https://www.example.com" } },
        { x: 50, y: 150, width: 50, height: 50, color: "#00f" },
        { x: 150, y: 150, width: 50, height: 50, color: "#ff0" },
    ]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        boxes.forEach((box) => {
            let newImage = new Image();
            newImage.src = box.img
            ctx.fillStyle = box.color;
            ctx.fillRect(box.x, box.y, box.width, box.height);
            box.img && ctx.drawImage(newImage, box.x, box.y, box.width, box.height);
            if (box.link) {
                // Draw a rectangle with text
                ctx.fillStyle = box.color;
                ctx.fillRect(box.x, box.y, box.width, box.height);
                ctx.fillStyle = "blue";
                ctx.font = "16px Arial";
                ctx.fillText(box.link.text, 325, 130);

                // Add a click event listener to the canvas
                // canvas.addEventListener("click", function (event) {
                //     const mouseX = event.clientX - canvas.offsetLeft;
                //     const mouseY = event.clientY - canvas.offsetTop;
                //     const linkX = 300;
                //     const linkY = 100;
                //     const linkWidth = 150;
                //     const linkHeight = 50;

                //     if (
                //         mouseX >= linkX &&
                //         mouseX <= linkX + linkWidth &&
                //         mouseY >= linkY &&
                //         mouseY <= linkY + linkHeight
                //     ) {
                //         window.location.href = box.link.url;
                //     }
                // });

            }
        });
    }, [boxes]);

    function handleMouseDown(event) {
        event.preventDefault();
        const mouseX = event.clientX - canvasRef.current.getBoundingClientRect().left;
        const mouseY = event.clientY - canvasRef.current.getBoundingClientRect().top;
        for (let i = boxes.length - 1; i >= 0; i--) {
            const box = boxes[i];
            if (
                mouseX >= box.x &&
                mouseX <= box.x + box.width &&
                mouseY >= box.y &&
                mouseY <= box.y + box.height
            ) {
                event.preventDefault();
                canvasRef.current.setAttribute("data-selected-box-index", i);
                canvasRef.current.addEventListener("mousemove", handleMouseMove);
                canvasRef.current.addEventListener("mouseup", handleMouseUp);
                break;
            }
        }
    }
    function handleMouseMove(event) {
        event.preventDefault();
        const mouseX = event.clientX - canvasRef.current.getBoundingClientRect().left;
        const mouseY = event.clientY - canvasRef.current.getBoundingClientRect().top;
        const boxIndex = canvasRef.current.getAttribute("data-selected-box-index");
        if (boxIndex) {
            const newBoxes = [...boxes];
            const box = newBoxes[boxIndex];
            box.x = mouseX - box.width / 2;
            box.y = mouseY - box.height / 2;
            setBoxes([...newBoxes, box]);
        }
    }

    function handleMouseUp(e) {
        e.preventDefault();
        canvasRef.current.removeEventListener("mousemove", handleMouseMove);
        canvasRef.current.removeEventListener("mouseup", handleMouseUp);
        canvasRef.current.removeAttribute("data-selected-box-index");
    }

    return (
        <canvas
            ref={canvasRef}
            width={500}
            height={500}
            style={{ border: "1px solid black", cursor: "move" }}
            onMouseDown={handleMouseDown}
        ></canvas>
    );
}

export default Canvas;

