import React from 'react';

function getSavedValue(key: string, initialValue) {
    const savedItem = JSON.parse(sessionStorage.getItem(key));
    if (savedItem) return savedItem;

    if (initialValue instanceof Function) return initialValue();

    return initialValue
}
export function deleteSavedValue(key) {
    sessionStorage.removeItem(key);
}

export default function useSessionStorage(key, initialValue) {
    const [value, setValue] = React.useState(() => {
        return getSavedValue(key, initialValue);
    });

    React.useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value))
    }, [value])
    return [value, setValue];
}
