import axios from "axios";
import { SERVER_URL } from "../Util";

export const changeReplyUpvotes = (
    token: string,
    topicId: string,
    replyId: string,
    type: "up" | "down"
) => {
    try {
        axios.patch(
            `${SERVER_URL}/discussions/changeReplyUpvote`,
            { topicId, replyId, type },
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
