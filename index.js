import {
    useCallback,
    useRef,
} from 'react';

const DEFAULT_TIMEOUT = 200;

/**
 * @param {clickEvent} doubleClick
 * @param {clickEvent} [click]
 * @param {number} [timeout]
 * @returns {clickEvent}
 */
export const useDoubleClick = (doubleClick, click, timeout) => {
    /** @type {{ current: number }} */
    const clickTimeout = useRef();

    const clearClickTimeout = () => {
        if (clickTimeout) {
            clearTimeout(clickTimeout.current);
            clickTimeout.current = null;
        }
    };

    return useCallback((event) => {
        clearClickTimeout();
        if (click && /** @type {React.UIEvent} */(event).detail === 1) {
            clickTimeout.current = setTimeout(() => {
                click(event);
            }, timeout || DEFAULT_TIMEOUT);
        }
        if (/** @type {React.UIEvent} */(event).detail % 2 === 0) {
            doubleClick(event);
        }
    }, [click, doubleClick, timeout]);
};

/**
 * @callback clickEvent
 * @param {React.SyntheticEvent} [event]
 */
