import axios from "axios";
import { SERVER_URL } from "../Util";

export const addComment = async (
    token: string,
    topicId: string,
    parentId: string,
    replyId: string,
    content: string
): Promise<boolean> => {
    try {
        axios.post(
            `${SERVER_URL}/discussions/addcomment`,
            { topicId, parentId, replyId, content },
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
