import React from 'react';
import MarkdownInput from './MarkdownInput';
import MarkdownButtons from './MarkdownButtons';

const MarkdownEditor = ({ id, parent, index, markdown, onInputChange, onStyleClick }) => {

    return (
        <div>
            <MarkdownInput id={id} parent={parent} index={index} markdown={markdown} onInputChange={onInputChange} />
            <MarkdownButtons id={id} parent={parent} index={index} onStyleClick={onStyleClick} />
        </div>
    );
};

export default MarkdownEditor;
