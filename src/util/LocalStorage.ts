import { IUserData } from "../types/Authentication";

export const storeUserDataInLocalStorage = (data: IUserData) => {
    localStorage.setItem("userData", JSON.stringify(data));
};

export const getUserDataFromLocalStorage = (): IUserData | undefined => {
    const data = localStorage.getItem("userData");
    if (!data) return undefined;
    else return JSON.parse(data) as IUserData;
};

export const clearUserDataFromLocalStorage = () => {
    localStorage.removeItem("userData");
};
