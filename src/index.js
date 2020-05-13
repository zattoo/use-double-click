import {
    useCallback,
    useRef,
} from 'react';

/** @type {Options} */
const DEFAULT_OPTIONS = {timeout: 200};

/**
 * @param {clickEvent} doubleClick
 * @param {clickEvent} [click]
 * @param {Options} [options]
 * @returns {clickEvent}
 */
export const useDoubleClick = (doubleClick, click, options = DEFAULT_OPTIONS) => {
    options = {
        ...DEFAULT_OPTIONS,
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
 * @typedef {Object} Options
 * @prop {number} timeout
 */
