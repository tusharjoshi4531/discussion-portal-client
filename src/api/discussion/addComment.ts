import axios from "axios";
import { SERVER_URL } from "../Util";
import { IDiscussionReplyData } from "../../types/Discussion";

export const addComment = async (
    token: string,
    topicId: string,
    parentId: string,
    replyId: string,
    content: string
): Promise<IDiscussionReplyData | undefined> => {
    try {
        const response = await axios.post<IDiscussionReplyData>(
            `${SERVER_URL}/discussions/addcomment`,
            { topicId, parentId, replyId, content },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
