import axios from "axios";
import { SERVER_URL } from "../Util";
import { IUserData } from "../../types/Authentication";

const signup = async (
    username: string,
    password: string
): Promise<IUserData> => {
    try {
        const response = await axios.post(`${SERVER_URL}/auth/signup`, {
            username,
            password,
        });

        return response.data;
    } catch (error) {
        console.log(error);
        return { username: "", userId: "", token: "" };
    }
};

export default signup;
