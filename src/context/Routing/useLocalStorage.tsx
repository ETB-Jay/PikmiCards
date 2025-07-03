import { useState } from 'react';

/**
 * Custom React hook for using localStorage with state sync.
 * Returns a stateful value and a setter that persists to localStorage.
 *
 * @module useLocalStorage
 */

/**
 * useLocalStorage hook for string values.
 * @param keyName - The localStorage key to use.
 * @param defaultValue - The default value if nothing is stored.
 * @returns [storedValue, setValue] tuple.
 */
export const useLocalStorage = (keyName: string, defaultValue: string): [string, (newValue: string) => void] => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value !== null && value !== undefined) {
                const parsed = JSON.parse(value);
                console.log('Loaded from localStorage:', keyName, parsed);
                return typeof parsed === 'string' ? parsed : defaultValue;
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            console.log('Error loading from localStorage:', err);
            return defaultValue;
        }
    });
    const setValue = (newValue: string) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
            console.log('Set in localStorage:', keyName, newValue);
        } catch (err) {
            console.log('Error setting localStorage:', err);
        }
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
};