import axios from "axios";
import { SERVER_URL } from "../Util";
import { ITopicData } from "../../types/Discussion";

const getTopics = async (
    tags: string[] = [],
    token: string,
    type: string = "all",
): Promise<ITopicData[]> => {
    const query = `tags=${tags.length > 0 ? JSON.stringify(tags) : "all"}`;

    try {
        // let result;

        const url = `${SERVER_URL}/topics/get${
            token === "" ? "Public" : "Private"
        }${token === "" ? "" : `/${type}`}?${query}`;

        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const result = await axios(url, headers);

        return result.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

export default getTopics;
