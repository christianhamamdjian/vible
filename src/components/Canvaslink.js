import React, { useRef, useEffect } from "react";

function Canvaslink() {
    const canvasLinkRef = useRef(null);

    useEffect(() => {
        const canvas = canvasLinkRef.current;
        const ctx = canvas.getContext("2d");

        // Draw a rectangle with text
        ctx.fillStyle = "blue";
        ctx.fillRect(100, 100, 150, 50);
        ctx.fillStyle = "white";
        ctx.font = "16px Arial";
        ctx.fillText("Click me!", 125, 130);

        // Add a click event listener to the canvas
        canvas.addEventListener("click", function (event) {
            const mouseX = event.clientX - canvas.offsetLeft;
            const mouseY = event.clientY - canvas.offsetTop;
            const linkX = 100;
            const linkY = 100;
            const linkWidth = 150;
            const linkHeight = 50;

            if (
                mouseX >= linkX &&
                mouseX <= linkX + linkWidth &&
                mouseY >= linkY &&
                mouseY <= linkY + linkHeight
            ) {
                window.location.href = "https://www.example.com";
            }
        });
    }, []);

    return (
        <canvas
            ref={canvasLinkRef}
            width={500}
            height={500}
            style={{ border: "1px solid black" }}
        ></canvas>
    );
}

export default Canvaslink;
