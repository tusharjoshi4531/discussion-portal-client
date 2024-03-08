import axios from "axios";
import { SERVER_URL } from "./Util";
import { IComment } from "../types/Discussion";

export const addComment = async (
  token: string,
  parentId: string,
  replyId: string,
  content: string
): Promise<IComment> => {
  try {
    console.log({ token, parentId, replyId, content });
    const url = new URL("/comments", SERVER_URL);
    const response = await axios.post<IComment>(
      url.toString(),
      { parentId, replyId, content },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Error adding comment");
  }
};

export async function getChildComments(options: {
  replyId?: string;
  parentId?: string;
  token: string;
}) {
  if (!options.replyId && !options.parentId)
    throw new Error("Must provide either replyId or parentId");

  const route = `/comments/${options.token === "" ? "public" : "private"}`;
  const url = new URL(route, SERVER_URL);
  url.search = new URLSearchParams(options).toString();

  try {
    const response = await axios.get<IComment[]>(url.toString(), {
      headers:
        options.token === ""
          ? {}
          : {
              Authorization: `Bearer ${options.token}`,
            },
    });
    const comments = response.data;

    return comments;
  } catch (err) {
    console.log(err);
    throw new Error("Error fetching comments");
  }
}

export async function triggerUpvote(id: string, token: string) {
  try {
    const url = new URL(`/comments/${id}/upvote`, SERVER_URL);
    const response = await axios.patch<IComment>(
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
    throw new Error("Error upvoting comment");
  }
}

export async function triggerDownvote(id: string, token: string) {
  try {
    const url = new URL(`/comments/${id}/downvote`, SERVER_URL);
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
    throw new Error("Error downvoting comment");
  }
}
