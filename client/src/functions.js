import {useEffect, useRef} from 'react';

const funcs = {
    useEventListener(eventName, handler, element = window) {
        let savedHandler = useRef();

        useEffect(() => {
            savedHandler.current = handler;
        }, [handler]);

        useEffect(() => {
            let isSupported = element && element.addEventListener;
            if (!isSupported) return;

            let eventListener = event => savedHandler.current(event);

            element.addEventListener(eventName, eventListener);

            return () => {
                document.removeEventListener(eventName, eventListener);
            };
        }, [eventName, element]);
    },
    randomizeVel(max, min) {
        return Math.round(Math.random() * (max - min) + min);
    },
    randomizeLevel() {
        let level = Math.round(Math.random() * (3.5 - 0.5) + 0.5);
            switch (level) {
                case 1:
                return "top";
                case 2:
                return "mid";
                case 3:
                return "bottom";
                default:
                break;
            }
    },
    randomizeDirection() {
        let direction = Math.round(Math.random() * (2.5 - 0.5) + 0.5);
        switch (direction) {
            case 1:
            return "right";
            case 2:
            return "left";
            default:
            break;
        }
    }
}

export default funcs;
