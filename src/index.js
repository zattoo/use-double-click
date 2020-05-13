import {
    useCallback,
    useRef,
} from 'react';

/**
 * @param {clickEvent} doubleClick
 * @param {clickEvent} [click]
 * @param {UseDoubleClickOptions} [options]
 * @returns {clickEvent}
 */
export const useDoubleClick = (doubleClick, click, options) => {
    /** @type {UseDoubleClickOptions} */
    options = {
        timeout: 200,
        ...options,
    };

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
            }, options.timeout);
        }
        if (/** @type {React.UIEvent} */(event).detail % 2 === 0) {
            doubleClick(event);
        }
    }, [click, doubleClick, options.timeout]);
};

/**
 * @callback clickEvent
 * @param {React.SyntheticEvent} [event]
 */

/**
 * @typedef {Object} UseDoubleClickOptions
 * @prop {number} [timeout]
 */
