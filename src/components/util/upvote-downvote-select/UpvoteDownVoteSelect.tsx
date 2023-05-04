import { useState } from "react";

import {
    TbTriangle,
    TbTriangleInverted,
    TbTriangleFilled,
    TbTriangleInvertedFilled,
} from "react-icons/tb";

import classes from "./style/UpvoteDownvoteSelect.module.css";

interface ISelectProps {
    fontSize?: string;
    gap?: string;
    onSelect?: (change: number) => void;
}

type UpvoteState = -1 | 0 | 1;

const UpvoteDownVoteSelect: React.FC<ISelectProps> = ({
    fontSize = "1rem",
    gap = "0.5rem",
    onSelect = (change: number) => {},
}) => {
    const [upvoteState, setUpvoteState] = useState(0);

    const upvoteToggleHandler = (newState: UpvoteState) => {
        setUpvoteState((state) => {
            const updatedState = newState === state ? 0 : newState;
            onSelect(updatedState - state);
            return updatedState;
        });
    };

    const upvoteClasses = `${classes.main__upvote} ${
        upvoteState === 1 ? classes.main__upvote__active : ""
    }`;

    const downvoteClasses = `${classes.main__upvote} ${
        upvoteState === -1 ? classes.main__upvote__active : ""
    }`;

    return (
        <div style={{ fontSize, gap }} className={classes.main}>
            <div
                className={upvoteClasses}
                onClick={() => upvoteToggleHandler(1)}
            >
                <TbTriangleFilled />
            </div>
            <div
                className={downvoteClasses}
                onClick={() => upvoteToggleHandler(-1)}
            >
                <TbTriangleInvertedFilled />
            </div>
        </div>
    );
};

export default UpvoteDownVoteSelect;
