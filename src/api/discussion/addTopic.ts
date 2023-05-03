import axios from "axios";
import { SERVER_URL } from "../Util";

const addTopic = (
    token: string,
    author: string,
    title: string,
    description: string,
    tags: string[]
) => {
    try {
        axios.post(
            `${SERVER_URL}/topics/add`,
            { author, title, tags, description },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        console.log(error);
    }
};

export default addTopic;
