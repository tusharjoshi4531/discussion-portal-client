import { useState, useEffect } from "react";

// Types
export enum WINDOW_TYPE {
    WIDE,
    NARROW,
}

export interface IWindowData {
    screenWidth: number;
    screenHeight: number;
    windowType: WINDOW_TYPE;
}

export const getWindowType = (width: number): WINDOW_TYPE => {
    if (width < 768) return WINDOW_TYPE.NARROW;
    else return WINDOW_TYPE.WIDE;
};

const useWindowSize = (): IWindowData => {
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [type, setType] = useState(getWindowType(window.innerWidth));

    useEffect(() => {
        const resizeHandler = () => {
            setWidth(window.innerWidth);
            setHeight(window.innerHeight);
            setType(getWindowType(window.innerWidth));
        };

        window.addEventListener("resize", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    return {
        screenWidth: width,
        screenHeight: height,
        windowType: type,
    };
};

export default useWindowSize;
