import axios from "axios";
import { ITopicData } from "../../types/Discussion";
import { SERVER_URL } from "../Util";

export const starTopic = async (
    token: string,
    topicId: string,
    state: boolean
) => {
    if (!token) return;
    try {
        axios.patch(
            `${SERVER_URL}/topics/star`,
            { topicId, state },
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
