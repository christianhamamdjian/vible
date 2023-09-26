import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo512.png';

function Loader() {
    const [isLoading, setLoading] = useState(true);

    function someRequest() {
        return new Promise(resolve => setTimeout(() => resolve(), 2500));
    }

    useEffect(() => {
        someRequest().then(() => {
            const loaderElement = document.querySelector(".loader-container");
            if (loaderElement) {
                loaderElement.remove();
                setLoading(!isLoading);
            }
        });
    });

    if (isLoading) {
        return null;
    }

    return (
        <div className="loader-container">
            <header>
                <img src={logo} className="logo" alt="logo" />
            </header>
        </div>
    );
}

export default Loader;
