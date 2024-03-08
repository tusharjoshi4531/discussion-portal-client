import { IComment } from "../../../types/Discussion";
import Comment from "./Comment";
import classes from "./style/Comments.module.css";

interface CommentSectionProps {
  fontSize?: string;
  gap?: string;
  comments?: IComment[];
  leftMargin?: boolean;
  readOnly?: boolean;
  replyId: string;
  onUpvoteChange?: (newComment: IComment) => void;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  comments = [],
  replyId,
  leftMargin = false,
  fontSize = "1rem",
  gap = "0rem",
  readOnly = false,
  onUpvoteChange = () => {},
}) => {
  const commentComponents = comments.map((comment) => (
    <Comment
      replyId={replyId}
      comment={comment}
      fontSize={fontSize}
      gap={gap}
      key={comment.id}
      readOnly={readOnly}
      onUpvoteChange={onUpvoteChange}
    />
  ));

  return (
    <div
      className={classes.main}
      style={{ marginLeft: leftMargin ? "2rem" : "0rem", fontSize, gap }}
    >
      {commentComponents}
    </div>
  );
};

export default CommentSection;
