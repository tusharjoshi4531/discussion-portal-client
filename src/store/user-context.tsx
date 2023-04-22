import { createContext, useReducer, useEffect } from "react";
import { IUserData } from "../types/Authentication";
import {
    getUserDataFromLocalStorage,
    storeUserDataInLocalStorage,
    clearUserDataFromLocalStorage,
} from "../util/LocalStorage";

// types
interface IUserProviderProps {
    children: React.ReactNode;
}

export enum ACTION_TYPE {
    SET_VALUE,
    CLEAR_VALUE,
}

interface IReducerAction {
    type: ACTION_TYPE;
    payload?: IUserData;
}

interface IUserContextData extends IUserData {
    dispatch: React.Dispatch<IReducerAction>;
}

// Creating context
const UserContext = createContext<IUserContextData>({
    username: "",
    userId: "",
    token: "",
    dispatch() {},
});

// Context provider

// Reducer Logic
const initialState: IUserData = {
    username: "",
    userId: "",
    token: "",
};

const reducer = (state: IUserData, action: IReducerAction) => {
    switch (action.type) {
        case ACTION_TYPE.SET_VALUE:
            if (action.payload) {
                storeUserDataInLocalStorage(action.payload);
                return action.payload;
            } else {
                return state;
            }
        case ACTION_TYPE.CLEAR_VALUE:
            clearUserDataFromLocalStorage();
            return initialState;
        default:
            return state;
    }
};

export const UserProvider: React.FC<IUserProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const data = getUserDataFromLocalStorage();
        if (data) dispatch({ type: ACTION_TYPE.SET_VALUE, payload: data });
    }, []);

    return (
        <UserContext.Provider value={{ ...state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
