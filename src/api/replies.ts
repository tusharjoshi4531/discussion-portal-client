import axios from "axios";
import { IReply } from "../types/Discussion";
import { SERVER_URL } from "./Util";

export const addReply = async (
  token: string,
  topicId: string,
  reply: string
): Promise<boolean> => {
  try {
    const url = new URL("/replies", SERVER_URL);
    axios.post(
      url.toString(),
      { reply, topicId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};


export const getTopicReplies = async (
  id: string,
  token: string
): Promise<IReply[]> => {
  try {
    const route = `/replies/${token === "" ? "public" : "private"}`;
    const url = new URL(route, SERVER_URL);
    url.search = new URLSearchParams({ id }).toString();

    const res = await axios.get<IReply[]>(
      url.toString(),
      token === ""
        ? {}
        : {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const triggerUpvote = async (id: string, token: string) => {
  try {
    const url = new URL(`/replies/${id}/upvote`, SERVER_URL);
    const response = await axios.patch<IReply>(
      url.toString(),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error upvoting reply");
  }
};

export const triggerDownvote = async (id: string, token: string) => {
  try {
    const url = new URL(`/replies/${id}/downvote`, SERVER_URL);
    const response = await axios.patch(
      url.toString(),
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error downvoting reply");
  }
};
