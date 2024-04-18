import { useRef, useState, useContext } from "react";
import Card from "../../util/card/Card";
import UpvoteDownVoteSelect from "../../util/upvote-downvote-select/UpvoteDownVoteSelect";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { TbPlus } from "react-icons/tb";

import classes from "./style/Reply.module.css";
import Toggle from "../../util/list-toggle/Toggle";
import UserContext from "../../../store/user-context";
import useChildComments from "../../../hooks/use-child-comments";
import CommentSection from "../../util/coment-section/CommentSection";
import { IComment, IReply } from "../../../types/Discussion";
import { triggerDownvote, triggerUpvote } from "../../../api/replies";
import { addComment } from "../../../api/comments";

interface IReplyCardProps {
  topicId: string;
  replyId: string;
  author: string;
  upvotes: number;
  upvoteStatus?: -1 | 0 | 1;
  body: string;
  onUpvoteChange: (newReply: IReply) => void;
}

const ReplyCard: React.FC<IReplyCardProps> = ({
  author,
  body,
  topicId,
  replyId,
  upvotes,
  upvoteStatus = 0,
  onUpvoteChange,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const { childComments, upsertComment } = useChildComments({ replyId });

  const addCommentRef = useRef<HTMLInputElement>(null!);

  const { token } = useContext(UserContext);

  const upvoteClickHandler = async () => {
    try {
      console.log(replyId);
      const newReply = await triggerUpvote(replyId, token);
      onUpvoteChange(newReply);
    } catch (err) {
      console.log(err);
    }
  };

  const downvoteClickHandler = async () => {
    try {
      const newReply = await triggerDownvote(replyId, token);
      onUpvoteChange(newReply);
    } catch (err) {
      console.log(err);
    }
  };

  const commentUpvoteChangeHandler = async (newComment: IComment) => {
    upsertComment(newComment);
  };

  const commentToggleHandler = (state: boolean) => {
    setShowComments(state);
  };

  const addCommentToggleHandler = (state: boolean) => {
    setShowAddComment(state);
  };

  const addCommentHandler = async (
    parentCommentId: string,
    commentText: string
  ) => {
    try {
      console.log({ token, parentCommentId, replyId, commentText });
      const result = await addComment(
        token,
        parentCommentId,
        replyId,
        commentText
      );

      upsertComment(result);
    } catch (error) {
      console.log(error);
    }
  };

  const addCommentSubmitHandler = () => {
    const commentText = addCommentRef.current.value;

    if (commentText === "" || !commentText) return;

    addCommentHandler("", commentText);
    setShowAddComment(false);
  };

  return (
    <Card color="secondary" padding="small" borderRadius="small">
      <div className={classes.body}>
        <div className={classes.body__content}>
          <div className={classes.body__content__author}>By {author}</div>
          <div className={classes.body__content__text}>{body}</div>
        </div>
        <div className={classes.body__actions}>
          <UpvoteDownVoteSelect
            fontSize="0.75rem"
            gap="0.3rem"
            upvotes={upvotes}
            onUpvoteClick={upvoteClickHandler}
            onDownvoteClick={downvoteClickHandler}
            upvoteState={upvoteStatus}
          />
          {token !== "" && (
            <Toggle
              text="Add Comment"
              fontSize="0.8rem"
              state={showAddComment}
              onToggle={addCommentToggleHandler}
              ActiveIcon={TbPlus}
              InactiveIcon={TbPlus}
            />
          )}
          <Toggle
            text="Comments"
            fontSize="0.8rem"
            state={showComments}
            onToggle={commentToggleHandler}
            ActiveIcon={AiFillCaretDown}
            InactiveIcon={AiFillCaretRight}
          />
        </div>
        <div
          className={classes.body__addCommentInput}
          style={{
            display: showAddComment && token !== "" ? "flex" : "none",
          }}
        >
          <input ref={addCommentRef} />
          <button onClick={addCommentSubmitHandler}>Submit</button>
        </div>
        <div className={classes.body__comments}>
          {showComments && (
            <>
              <div className={classes.divider} />
              <CommentSection
                replyId={replyId}
                comments={childComments}
                fontSize="0.75rem"
                gap="0.3rem"
                readOnly={token === ""}
                onUpvoteChange={commentUpvoteChangeHandler}
              />
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ReplyCard;
