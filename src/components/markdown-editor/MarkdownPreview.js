import React from 'react';

const MarkdownPreview = ({ markdown, item, editingText, isEditingBoard, isDraggingRect, isSafari }) => {
    const convertMarkdownToHtml = (markdownText) => {
        let htmlText = markdownText;

        htmlText = htmlText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold
        htmlText = htmlText.replace(/_(.*?)_/g, '<em>$1</em>'); // Italics
        // htmlText = htmlText.replace(/`([^`]+)`/g, '<code>$1</code>'); // Code
        htmlText = htmlText.replace(/~~(.*?)~~/g, '<del>$1</del>'); // Strikethrough
        htmlText = htmlText.replace(/^\s*-\s*(.*)$/gm, '<li>$1</li>'); // Unordered List
        // htmlText = htmlText.replace(/^\s*\d+\.\s*(.*)$/gm, '<li>$1</li>'); // Ordered List
        htmlText = htmlText.replace(/=(.*?)=/g, '<ins>$1</ins>'); // Underline

        return htmlText;
    };

    return (
        <>
            <div
                style={{
                    whiteSpace: "pre-wrap",
                    color: item.textColor,
                    overflowX: "hidden",
                    fontFamily: item.font,
                    userSelect: editingText && isEditingBoard ? "all" : "none",
                    fontSize: `${item.fontSize + "pt"}`,
                    fontWeight: `${item.fontStyle ? "bold" : "normal"}`,
                    textAlign: `${item.textAlignCenter ? "center" : "left"}`,
                    boxSizing: 'border-box',
                    resize: "none",
                    overflowY: isDraggingRect && isSafari ? 'hidden' : 'auto',
                    height: "100%",
                    minHeight: "100%",
                }}
                dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(markdown || "") }}
            />
        </>
    );
};

export default MarkdownPreview;
