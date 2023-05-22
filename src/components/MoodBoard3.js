import React, { useState, useRef, useEffect } from 'react';
import ColorSelector from './ColorSelector';
import ImageUploader from './ImageUploader';
import LinkInput from './LinkInput';

const MoodBoard3 = () => {
    const [color, setColor] = useState('#FFFFFF');
    const [images, setImages] = useState([]);
    const [links, setLinks] = useState([]);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawImages(ctx);
        drawColorCards(ctx);
        drawLinks(ctx);
    }, [color, images, links]);

    const handleColorChange = (newColor) => {
        setColor(newColor);
    };

    const handleImageUpload = (image) => {
        setImages([...images, image]);
    };

    const handleLinkSubmit = (title, url) => {
        setLinks([...links, { title, url }]);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const offsetX = event.nativeEvent.offsetX;
        const offsetY = event.nativeEvent.offsetY;
        const id = event.dataTransfer.getData('text');
        const type = event.dataTransfer.getData('type');
        if (type === 'image') {
            const img = images.find((image) => image.id === id);
            img.x = offsetX;
            img.y = offsetY;
            setImages([...images]);
        } else if (type === 'link') {
            const link = links.find((link) => link.id === id);
            link.x = offsetX;
            link.y = offsetY;
            setLinks([...links]);
        }
    };

    const handleDragStart = (event, id, type) => {
        event.dataTransfer.setData('text', id);
        event.dataTransfer.setData('type', type);
    };

    const drawImages = (ctx) => {
        images.forEach((image) => {
            const img = new Image();
            img.src = image.src;
            img.onload = () => {
                ctx.drawImage(img, image.x, image.y, 200, 150);
            };
        });
    };

    const drawColorCards = (ctx) => {
        const cardWidth = 50;
        const cardHeight = 50;
        const padding = 10;
        const startX = canvasRef.current.width - (cardWidth + padding) * 7;
        const startY = canvasRef.current.height - cardHeight - padding;
        for (let i = 0; i < 7; i++) {
            ctx.fillStyle = `hsl(${i * 60}, 100%, 50%)`;
            ctx.fillRect(startX + (cardWidth + padding) * i, startY, cardWidth, cardHeight);
        }
        ctx.fillStyle = color;
        ctx.fillRect(startX - padding, startY - padding, cardWidth, cardHeight);
    };

    const drawLinks = (ctx) => {
        ctx.font = '16px Arial';
        links.forEach((link) => {
            ctx.fillStyle = '#000000';
            ctx.fillText(link.title, link.x, link.y + 20);
            ctx.fillStyle = '#0000FF';
            ctx.fillText(link.url, link.x, link.y + 40);
        });
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <ColorSelector color="color" />
                <ImageUploader image="image" />
                <LinkInput link="link" />
            </div>
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                style={{ border: "1px solid black", cursor: "move" }}
            //onMouseDown={handleMouseDown}
            ></canvas>
        </div>)
}

export default MoodBoard3;
