import { useState, useRef } from "react";
import { ICommentData } from "../../../types/Discussion";
import { TbPlus } from "react-icons/tb";
import UpvoteDownVoteSelect from "../upvote-downvote-select/UpvoteDownVoteSelect";
import Toggle from "../list-toggle/Toggle";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";

import classes from "./style/Comments.module.css";

interface CommentsProps {
    fontSize?: string;
    gap?: string;
    comments?: ICommentData[];
    leftMargin?: boolean;
}

interface SingleCommentProps {
    comment: ICommentData;
    fontSize?: string;
    gap?: string;
}

const SingleComment: React.FC<SingleCommentProps> = ({
    comment,
    fontSize = "1rem",
    gap = "0rem",
}) => {
    const [subCommentsToggle, setSubCommentsToggle] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);

    const addCommentRef = useRef<HTMLInputElement>(null!);

    const subCommentsToggleHandler = (state: boolean) => {
        setSubCommentsToggle(state);
    };

    const addCommentToggleHandler = (state: boolean) => {
        subCommentsToggleHandler(true);
        setShowAddComment(state);
    };

    return (
        <>
            <div style={{ marginBottom: gap }}>
                <h4 className={classes.main__author}>By {comment.author}</h4>
                <div>{comment.body}</div>
            </div>
            <div className={classes.main__actions}>
                <UpvoteDownVoteSelect fontSize="0.5rem" gap="0.2rem" />
                <Toggle
                    text="Add Comment"
                    fontSize="0.9em"
                    state={showAddComment}
                    onToggle={addCommentToggleHandler}
                    ActiveIcon={TbPlus}
                    InactiveIcon={TbPlus}
                />
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
                style={{ display: showAddComment ? "flex" : "none" }}
            >
                <input ref={addCommentRef} />
                <button>Submit</button>
            </div>
            {comment.subComments !== undefined && subCommentsToggle && (
                <Comments
                    comments={comment.subComments}
                    fontSize={fontSize}
                    leftMargin
                    gap={gap}
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
}) => {
    const commentComponents = comments.map((comment) => (
        <SingleComment
            comment={comment}
            fontSize={fontSize}
            gap={gap}
            key={comment.id}
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
