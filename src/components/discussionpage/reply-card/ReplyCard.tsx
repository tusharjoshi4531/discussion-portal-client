import { useState } from "react";
import Card from "../../util/card/Card";
import UpvoteDownVoteSelect from "../../util/upvote-downvote-select/UpvoteDownVoteSelect";
import Comments from "../../util/coment-section/Comments";
import { ICommentData } from "../../../types/Discussion";
import { AiFillCaretRight, AiFillCaretDown } from "react-icons/ai";

import classes from "./style/Reply.module.css";

const ReplyCard = () => {
    const [showComments, setShowComments] = useState(false);

    const upvoteSelectHandler = (change: number) => {
        console.log(change);
    };

    const commentToggleHandler = () => {
        setShowComments((state) => !state);
    };

    const dummycomments: ICommentData[] = [
        {
            id: "1",
            body: "COMMENT 1",
            subComments: [
                {
                    id: "11",
                    body: "SUBCOMMENT 11",
                },
                {
                    id: "12",
                    body: "SUBCOMMENT 12",
                },
            ],
        },
        {
            id: "2",
            body: "COMMENT 2",
            subComments: [
                {
                    id: "21",
                    body: "SUBCOMMENT 21",
                },
                {
                    id: "22",
                    body: "SUBCOMMENT 22",
                    subComments: [
                        {
                            id: "221",
                            body: "SUBCOMMENT 221",
                        },
                    ],
                },
            ],
        },
    ];

    const commentsToggleClasses = `${classes.body__actions__toggle} ${
        showComments ? classes.body__actions__toggle__active : ""
    }`;

    return (
        <Card color="secondary" padding="small" borderRadius="small">
            <div className={classes.body}>
                <div className={classes.body__content}>Hello</div>
                <div className={classes.body__actions}>
                    <UpvoteDownVoteSelect
                        fontSize="0.75rem"
                        gap="0.3rem"
                        onSelect={upvoteSelectHandler}
                    />
                    <div
                        className={commentsToggleClasses}
                        onClick={commentToggleHandler}
                    >
                        Comments{" "}
                        {!showComments ? (
                            <AiFillCaretRight />
                        ) : (
                            <AiFillCaretDown />
                        )}
                    </div>
                </div>
                <div className={classes.body__comments}>
                    {showComments && (
                        <>
                            <div className={classes.divider} />
                            <Comments
                                comments={dummycomments}
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
