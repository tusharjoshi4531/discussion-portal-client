import axios from "axios";
import { SERVER_URL } from "./Util";
import { ITopic } from "../types/Discussion";

export const addTopic = (
  token: string,
  author: string,
  title: string,
  description: string,
  tags: string[]
) => {
  try {
    axios.post(
      `${SERVER_URL}/topics/add`,
      { author, title, tags, description },
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

export const getTopicsByTags = async (
  tags: string[] = [],
  token: string,
  getStarred: boolean = false
): Promise<ITopic[]> => {
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

const nullTopic: ITopic = {
  id: "",
  title: "",
  author: "",
  tags: [],
  description: "",
  isStarred: false,
};

export const getTopicById = async (id: string): Promise<ITopic> => {
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
