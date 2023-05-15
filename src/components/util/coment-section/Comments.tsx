import { useState, useRef, useContext } from "react";
import { ICommentData } from "../../../types/Discussion";
import { TbPlus } from "react-icons/tb";
import UpvoteDownVoteSelect from "../upvote-downvote-select/UpvoteDownVoteSelect";
import Toggle from "../list-toggle/Toggle";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";

import classes from "./style/Comments.module.css";
import UserContext from "../../../store/user-context";
import { useNavigate } from "react-router-dom";

interface CommentsProps {
    fontSize?: string;
    gap?: string;
    comments?: ICommentData[];
    leftMargin?: boolean;
    readOnly?: boolean;
    onAddComment?: (commentId: string, commentText: string) => void;
    onUpvoteChange?: (commentId: string, change: number) => void;
}

interface SingleCommentProps {
    comment: ICommentData;
    readOnly?: boolean;
    fontSize?: string;
    gap?: string;
    onAddComment?: (commentId: string, commentText: string) => void;
    onUpvoteChange?: (commentId: string, change: number) => void;
}

const SingleComment: React.FC<SingleCommentProps> = ({
    comment,
    readOnly = false,
    fontSize = "1rem",
    gap = "0rem",
    onAddComment = (commentId: string, commentText: string) => {},
    onUpvoteChange = (commentId: string, change: number) => {},
}) => {
    const navigate = useNavigate();

    const [subCommentsToggle, setSubCommentsToggle] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);

    const addCommentRef = useRef<HTMLInputElement>(null!);

    const { token } = useContext(UserContext);

    const subCommentsToggleHandler = (state: boolean) => {
        setSubCommentsToggle(state);
    };

    const addCommentToggleHandler = (state: boolean) => {
        subCommentsToggleHandler(true);
        setShowAddComment(state);
    };

    const addCommentSubmitHandler = () => {
        const commentText = addCommentRef.current.value;

        if (commentText === "" || !commentText) return;

        console.log(commentText);

        onAddComment(comment.id, commentText);
        setShowAddComment(false);
    };

    const upvoteSelectHandler = (change: number) => {
        onUpvoteChange(comment.id, change);
    };

    return (
        <>
            <div style={{ marginBottom: gap }}>
                <h4 className={classes.main__author}>By {comment.author}</h4>
                <div>{comment.body}</div>
            </div>
            <div className={classes.main__actions}>
                <UpvoteDownVoteSelect
                    fontSize="0.5rem"
                    gap="0.2rem"
                    upvotes={comment.upvotes}
                    initialState={comment.upvoteStatus}
                    onSelect={upvoteSelectHandler}
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
                {comment.subComments !== undefined && (
                    <Toggle
                        text="Sub Comments"
                        fontSize="0.9em"
                        state={subCommentsToggle}
                        onToggle={subCommentsToggleHandler}
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
            {comment.subComments !== undefined && subCommentsToggle && (
                <Comments
                    comments={comment.subComments}
                    fontSize={fontSize}
                    leftMargin
                    gap={gap}
                    readOnly={readOnly}
                    onAddComment={onAddComment}
                    onUpvoteChange={onUpvoteChange}
                />
            )}
        </>
    );
};

const Comments: React.FC<CommentsProps> = ({
    comments = [],
    leftMargin = false,
    fontSize = "1rem",
    gap = "0rem",
    readOnly = false,

    onAddComment = (commentId: string, commentText: string) => {},
    onUpvoteChange = (commentId: string, change: number) => {},
}) => {
    const commentComponents = comments.map((comment) => (
        <SingleComment
            comment={comment}
            fontSize={fontSize}
            gap={gap}
            key={comment.id}
            readOnly={readOnly}
            onAddComment={onAddComment}
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

export default Comments;
