import { createContext } from "react";
import useWindowSize, {
    getWindowType,
    IWindowData,
} from "../hooks/use-window-size";

// Types
interface IWindowContextData extends IWindowData {}

// Creating context
const initialState = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
    windowType: getWindowType(window.innerWidth),
};

const WindowContext = createContext<IWindowContextData>(initialState);

// Provider
interface IWindowProviderProps {
    children: React.ReactNode;
}

export const WindowProvider: React.FC<IWindowProviderProps> = ({
    children,
}) => {
    const value = useWindowSize();

    return (
        <WindowContext.Provider value={value}>
            {children}
        </WindowContext.Provider>
    );
};

export default WindowContext;
