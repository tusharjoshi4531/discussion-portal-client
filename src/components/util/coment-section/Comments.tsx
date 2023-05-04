import React from "react";
import { ICommentData } from "../../../types/Discussion";

interface CommentsProps {
    fontSize?: string;
    gap?: string;
    comments?: ICommentData[];
    degree?: number;
}

import classes from "./style/Comments.module.css";

const Comments: React.FC<CommentsProps> = ({
    comments = [],
    degree = 0,
    fontSize = "1rem",
    gap = "0rem",
}) => {
    const commentComponents = comments.map((comment) => (
        <div key={comment.id}>
            <div style={{ marginBottom: gap }}>{comment.body}</div>
            {comment.subComments !== undefined && (
                <Comments
                    comments={comment.subComments}
                    degree={degree + 1}
                    fontSize={fontSize}
                    gap={gap}
                />
            )}
        </div>
    ));

    return (
        <div
            className={classes.main}
            style={{ marginLeft: `${degree}rem`, fontSize, gap }}
        >
            {commentComponents}
        </div>
    );
};

export default Comments;
