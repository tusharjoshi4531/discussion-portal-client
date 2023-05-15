import axios from "axios";
import { SERVER_URL } from "../Util";
import { ICommentData, IDiscussionReplyData } from "../../types/Discussion";

export const changeCommentUpvotes = async (
    token: string,
    commentId: string,
    topicId: string,
    replyId: string,
    type: string
): Promise<IDiscussionReplyData | undefined> => {
    try {
        const response = await axios.patch<IDiscussionReplyData>(
            `${SERVER_URL}/discussions/changeCommentUpvote`,
            { topicId, replyId, type, commentId },
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
