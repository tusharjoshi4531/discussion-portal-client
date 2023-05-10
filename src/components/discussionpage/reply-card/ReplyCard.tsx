import { useState } from "react";
import Card from "../../util/card/Card";
import UpvoteDownVoteSelect from "../../util/upvote-downvote-select/UpvoteDownVoteSelect";
import Comments from "../../util/coment-section/Comments";
import { ICommentData } from "../../../types/Discussion";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";

import classes from "./style/Reply.module.css";
import Toggle from "../../util/list-toggle/Toggle";

interface IReplyCardProps {
    author: string;
    upvotes: number;
    body: string;
    comments: ICommentData[];
}

const ReplyCard: React.FC<IReplyCardProps> = ({ author, body, comments }) => {
    const [showComments, setShowComments] = useState<boolean>(false);

    const upvoteSelectHandler = (change: number) => {
        console.log(change);
    };

    const commentToggleHandler = (state: boolean) => {
        setShowComments(state);
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
                        onSelect={upvoteSelectHandler}
                    />
                    <Toggle
                        text="Comments"
                        fontSize="0.8rem"
                        state={showComments}
                        onToggle={commentToggleHandler}
                        ActiveIcon={AiFillCaretDown}
                        InactiveIcon={AiFillCaretRight}
                    />
                </div>
                <div className={classes.body__comments}>
                    {showComments && (
                        <>
                            <div className={classes.divider} />
                            <Comments
                                comments={comments}
                                fontSize="0.75rem"
                                gap="0.3rem"
                            />
                        </>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default ReplyCard;
