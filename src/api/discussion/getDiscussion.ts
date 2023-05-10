import axios from "axios";
import { IDiscussionReplyData } from "../../types/Discussion";
import { SERVER_URL } from "../Util";

export const getDiscussionReplies = async (
    id: string
): Promise<IDiscussionReplyData[]> => {
    try {
        const res = await axios.get<IDiscussionReplyData[]>(
            `${SERVER_URL}/discussions/replies?id=${id}`
        );
        return res.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};
