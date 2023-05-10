import axios from "axios";
import { SERVER_URL } from "../Util";

export const addReply = async (
    token: string,
    topicId: string,
    reply: string
): Promise<boolean> => {
    try {
        axios.post(
            `${SERVER_URL}/discussions/replies`,
            { reply, topicId },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
