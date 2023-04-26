import axios from "axios";
import { SERVER_URL } from "../Util";
import { ITopicData } from "../../types/Discussion";

const getTopics = async (tags?: string[]): Promise<ITopicData[]> => {
    const query = `tags=${tags !== undefined ? JSON.stringify(tags) : "all"}`;

    try {
        const result = await axios.get(`${SERVER_URL}/topics/get?${query}`);

        return result.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default getTopics;
