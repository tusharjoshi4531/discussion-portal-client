import { useContext, useEffect, useState } from "react";
import { IReply } from "../types/Discussion";
import { useParams } from "react-router-dom";
import UserContext from "../store/user-context";
import { getTopicReplies } from "../api/replies";

export default function useReplies(topicId: string | undefined) {
  const { token } = useContext(UserContext);

  const [replies, setReplies] = useState<IReply[]>([]);

  const upsertReply = (reply: IReply) => {
    console.log({
      ids: replies.map((reply) => reply.id),
      newId: reply.id,
    })
    setReplies((state) => {
      const newState = state.filter((_reply) => _reply.id !== reply.id);
      newState.push(reply);

      newState.sort((left, right) => right.upvotes - left.upvotes);

      return newState;
    });
  };

  useEffect(() => {
    if (topicId)
      getTopicReplies(topicId, token)
        .then((replies) => setReplies(replies))
        .catch((err) => console.log(err));
  }, [topicId, token]);

  return { replies, upsertReply };
}
