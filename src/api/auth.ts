import axios from "axios";
import { SERVER_URL } from "./Util";
import { IUserData } from "../types/Authentication";

const login = async (
  username: string,
  password: string
): Promise<IUserData> => {
  try {
    const url = new URL("/auth", SERVER_URL);
    url.searchParams.append("username", username);
    url.searchParams.append("password", password);

    const response = await axios.get(url.toString());

    return response.data;
  } catch (error) {
    console.log(error);
    return { username: "", userId: "", token: "" };
  }
};

export const signup = async (
  username: string,
  password: string
): Promise<IUserData> => {
  try {
    const url = new URL("/auth", SERVER_URL);
    const response = await axios.post(url.toString(), {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    return { username: "", userId: "", token: "" };
  }
};

export default login;
