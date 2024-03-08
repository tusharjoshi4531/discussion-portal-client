import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IComment } from "../types/Discussion";
import { getChildComments } from "../api/comments";
import UserContext from "../store/user-context";

export default function useChildComments(options: {
  parentId?: string;
  replyId?: string;
}) {
  const [childComments, setChildComments] = useState<IComment[]>([]);

  const { token } = useContext(UserContext);

  const upsertComment = (comment: IComment) => {
    setChildComments((state) => {
      const newState = state.filter((_comment) => _comment.id !== comment.id);
      newState.push(comment);
      newState.sort((left, right) => right.upvotes - left.upvotes);
      return newState;
    });
  };

  const fetchChildComments = useCallback(() => {
    getChildComments({ ...options, token })
      .then((comments) => {
        setChildComments(comments);
      })
      .catch((err) => {
        setChildComments([]);
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetchChildComments();
  }, [fetchChildComments]);

  return { childComments, upsertComment };
}
