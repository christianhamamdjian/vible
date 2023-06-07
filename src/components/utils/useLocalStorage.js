import { useState, useEffect } from "react";

function getStorageValue(key, defaultValue) {
    if (typeof window !== "undefined") {
        const saved = localStorage.getItem(key);
        const initial = saved !== null ? JSON.parse(saved) : defaultValue;
        return initial;
    }
}

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        // localStorage.setItem(key, JSON.stringify(value));
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log('Error in local storage', error);
            setInLocalStorage(key, JSON.parse(localStorage.getItem(key)));
        }
    }, [key, value]);

    return [value, setValue];
};
