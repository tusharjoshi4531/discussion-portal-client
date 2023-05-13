import { useRef, useState, useContext } from "react";
import Card from "../../util/card/Card";
import UpvoteDownVoteSelect from "../../util/upvote-downvote-select/UpvoteDownVoteSelect";
import Comments from "../../util/coment-section/Comments";
import { ICommentData } from "../../../types/Discussion";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";
import { TbPlus } from "react-icons/tb";

import classes from "./style/Reply.module.css";
import Toggle from "../../util/list-toggle/Toggle";
import UserContext from "../../../store/user-context";
import { addComment } from "../../../api/discussion/addComment";
import { useNavigate } from "react-router-dom";
import { changeReplyUpvotes } from "../../../api/discussion/changeReplyUpvotes";
import { changeCommentUpvotes } from "../../../api/discussion/changeCommentUpvotes";

interface IReplyCardProps {
    topicId: string;
    replyId: string;
    author: string;
    upvotes: number;
    upvoteStatus?: -1 | 0 | 1;
    body: string;
    comments: ICommentData[];
}

const ReplyCard: React.FC<IReplyCardProps> = ({
    author,
    body,
    comments,
    topicId,
    replyId,
    upvotes,
    upvoteStatus = 0,
}) => {
    const navigate = useNavigate();

    const [showComments, setShowComments] = useState(false);
    const [showAddComment, setShowAddComment] = useState(false);

    const addCommentRef = useRef<HTMLInputElement>(null!);

    const { token } = useContext(UserContext);

    const upvoteSelectHandler = (change: number) => {
        let type = "remove";
        if (change > 0) type = "up";
        else if (change < 0) type = "down";
        changeReplyUpvotes(token, topicId, replyId, type);
        navigate(0);
    };

    const commentUpvoteSelectHandler = (commentId: string, change: number) => {
        let type = "remove";
        if (change > 0) type = "up";
        else if (change < 0) type = "down";
        changeCommentUpvotes(token, commentId, topicId, replyId, type);
        navigate(0);
    };

    const commentToggleHandler = (state: boolean) => {
        setShowComments(state);
    };

    const addCommentToggleHandler = (state: boolean) => {
        setShowAddComment(state);
    };

    const addCommentHandler = (
        parentCommentId: string,
        commentText: string
    ) => {
        addComment(token, topicId, parentCommentId, replyId, commentText);
    };

    const addCommentSubmitHandler = () => {
        const commentText = addCommentRef.current.value;

        if (commentText === "" || !commentText) return;

        // addComment(token, topicId, "", replyId, commentText);
        addCommentHandler("", commentText);
        navigate(0);
    };

    return (
        <Card color="secondary" padding="small" borderRadius="small">
            <div className={classes.body}>
                <div className={classes.body__content}>
                    <div className={classes.body__content__author}>
                        By {author}
                    </div>
                    <div className={classes.body__content__text}>{body}</div>
                </div>
                <div className={classes.body__actions}>
                    <UpvoteDownVoteSelect
                        fontSize="0.75rem"
                        gap="0.3rem"
                        upvotes={upvotes}
                        onSelect={upvoteSelectHandler}
                        initialState={upvoteStatus}
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
                        display:
                            showAddComment && token !== "" ? "flex" : "none",
                    }}
                >
                    <input ref={addCommentRef} />
                    <button onClick={addCommentSubmitHandler}>Submit</button>
                </div>
                <div className={classes.body__comments}>
                    {showComments && (
                        <>
                            <div className={classes.divider} />
                            <Comments
                                comments={comments}
                                fontSize="0.75rem"
                                gap="0.3rem"
                                readOnly={token === ""}
                                // replyId={replyId}
                                // topicId={topicId}
                                onAddComment={addCommentHandler}
                                onUpvoteChange={commentUpvoteSelectHandler}
                            />
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default ReplyCard;
