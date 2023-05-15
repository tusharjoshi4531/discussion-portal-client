import axios from "axios";
import { SERVER_URL } from "../Util";
import { IDiscussionReplyData } from "../../types/Discussion";

export const changeReplyUpvotes = async (
    token: string,
    topicId: string,
    replyId: string,
    type: string
): Promise<IDiscussionReplyData | undefined> => {
    try {
        const res = await axios.patch<IDiscussionReplyData>(
            `${SERVER_URL}/discussions/changeReplyUpvote`,
            { topicId, replyId, type },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return res.data;
    } catch (error) {
        console.log(error);
        return undefined;
    }
};
