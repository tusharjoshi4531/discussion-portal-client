import axios from "axios";
import { SERVER_URL } from "../Util";
import { ITopicData } from "../../types/Discussion";

export const getTopicsByTags = async (
    tags: string[] = [],
    token: string,
    type: string = "all"
): Promise<ITopicData[]> => {
    try {
        const query = `tags=${tags.length > 0 ? JSON.stringify(tags) : "all"}`;
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

const nullTopic: ITopicData = {
    id: "",
    title: "",
    author: "",
    tags: [],
    description: "",
    isStarred: false,
};

export const getTopicById = async (
    id: string,
    token: string
): Promise<ITopicData> => {
    if (id === "" || token === "") return { ...nullTopic };

    try {
        const url = `${SERVER_URL}/topics/getPrivate/id?id=${id}`;

        const headers = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const result = await axios(url, headers);

        return result.data;
    } catch (error) {
        console.log(error);
        return { ...nullTopic };
    }
};
