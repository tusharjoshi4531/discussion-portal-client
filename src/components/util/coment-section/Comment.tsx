import { useState, useRef, useContext } from "react";
import { IComment } from "../../../types/Discussion";
import { TbPlus } from "react-icons/tb";
import UpvoteDownVoteSelect from "../upvote-downvote-select/UpvoteDownVoteSelect";
import Toggle from "../list-toggle/Toggle";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";

import classes from "./style/Comments.module.css";
import UserContext from "../../../store/user-context";
import useChildComments from "../../../hooks/use-child-comments";
import CommentSection from "./CommentSection";
import { addComment, triggerDownvote, triggerUpvote } from "../../../api/comments";

interface CommentProps {
  comment: IComment;
  replyId: string;
  readOnly?: boolean;
  fontSize?: string;
  gap?: string;
  onUpvoteChange?: (newComment: IComment) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  replyId,
  readOnly = false,
  fontSize = "1rem",
  gap = "0rem",
  onUpvoteChange = () => {},
}) => {
  console.log(comment);
  const [subCommentSectionToggle, setSubCommentSectionToggle] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);

  const { childComments, upsertComment } = useChildComments({
    parentId: comment.id,
  });

  const addCommentRef = useRef<HTMLInputElement>(null!);

  const { token } = useContext(UserContext);

  const subCommentSectionToggleHandler = (state: boolean) => {
    setSubCommentSectionToggle(state);
  };

  const addCommentToggleHandler = (state: boolean) => {
    subCommentSectionToggleHandler(true);
    setShowAddComment(state);
  };

  const addCommentSubmitHandler = async () => {
    const commentText = addCommentRef.current.value;

    if (commentText === "" || !commentText) return;

    const result = await addComment(token, comment.id, replyId, commentText);
    upsertComment(result);

    setShowAddComment(false);
  };

  const upvoteClickHandler = async () => {
    try {
      const newComment = await triggerUpvote(comment.id, token);
      onUpvoteChange(newComment);
    } catch (err) {
      console.log(err);
    }
  };

  const downvoteClickHandler = async () => {
    try {
      const newComment = await triggerDownvote(comment.id, token);
      onUpvoteChange(newComment);
    } catch (err) {
      console.log(err);
    }
  };

  const upvoteChangeHandler = async (comment: IComment) => {
    upsertComment(comment);
  };

  return (
    <>
      <div style={{ marginBottom: gap }}>
        <h4 className={classes.main__author}>By {comment.author}</h4>
        <div>{comment.content}</div>
      </div>
      <div className={classes.main__actions}>
        <UpvoteDownVoteSelect
          fontSize="0.5rem"
          gap="0.2rem"
          upvotes={comment.upvotes}
          upvoteState={comment.upvoteStatus}
          onUpvoteClick={upvoteClickHandler}
          onDownvoteClick={downvoteClickHandler}
        />
        {!readOnly && (
          <Toggle
            text="Add Comment"
            fontSize="0.9em"
            state={showAddComment}
            onToggle={addCommentToggleHandler}
            ActiveIcon={TbPlus}
            InactiveIcon={TbPlus}
          />
        )}
        {childComments.length > 0 && (
          <Toggle
            text="Sub CommentSection"
            fontSize="0.9em"
            state={subCommentSectionToggle}
            onToggle={subCommentSectionToggleHandler}
            ActiveIcon={AiFillCaretDown}
            InactiveIcon={AiFillCaretRight}
          />
        )}
      </div>

      <div
        className={classes.main__actions__addCommentInput}
        style={{
          display: showAddComment && !readOnly ? "flex" : "none",
        }}
      >
        <input ref={addCommentRef} />
        <button onClick={addCommentSubmitHandler}>Submit</button>
      </div>
      {childComments.length > 0 && subCommentSectionToggle && (
        <CommentSection
          replyId={replyId}
          comments={childComments}
          fontSize={fontSize}
          leftMargin
          gap={gap}
          readOnly={readOnly}
          onUpvoteChange={upvoteChangeHandler}
        />
      )}
    </>
  );
};

export default Comment;
