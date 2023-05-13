import axios from "axios";
import { SERVER_URL } from "../Util";

export const changeCommentUpvotes = (
    token: string,
    commentId: string,
    topicId: string,
    replyId: string,
    type: string,
) => {
    try {
        axios.patch(
            `${SERVER_URL}/discussions/changeCommentUpvote`,
            { topicId, replyId, type, commentId },
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
