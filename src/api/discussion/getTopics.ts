import axios from "axios";
import { SERVER_URL } from "../Util";
import { ITopicData } from "../../types/Discussion";

export const getTopicsByTags = async (
    tags: string[] = [],
    token: string,
    getStarred: boolean = false
): Promise<ITopicData[]> => {
    try {
        const query = `?tags=${
            tags.length > 0 ? JSON.stringify(tags) : "all"
        }&getStarred=${getStarred ? true : false}`;
        // let result;

        const url = `${SERVER_URL}/topics/get${
            token === "" ? "Public" : "Private"
        }${query}`;

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

export const getTopicById = async (id: string): Promise<ITopicData> => {
    if (id === "") return { ...nullTopic };

    try {
        const url = `${SERVER_URL}/topics/getById?id=${id}`;

        const result = await axios(url);

        return result.data;
    } catch (error) {
        console.log(error);
        return { ...nullTopic };
    }
};
