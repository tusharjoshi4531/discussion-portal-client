import { useEffect, useState } from "react";

import { TbTriangleFilled, TbTriangleInvertedFilled } from "react-icons/tb";

import classes from "./style/UpvoteDownvoteSelect.module.css";

interface ISelectProps {
  fontSize?: string;
  gap?: string;
  upvotes: number;
  upvoteState?: -1 | 0 | 1;
  onUpvoteClick?: () => void;
  onDownvoteClick?: () => void;
}

const UpvoteDownVoteSelect: React.FC<ISelectProps> = ({
  fontSize = "1rem",
  gap = "0.5rem",
  upvotes,
  upvoteState,
  onUpvoteClick = () => {},
  onDownvoteClick = () => {},
}) => {
  const upvoteClasses = `${classes.main__upvote} ${
    upvoteState === 1 ? classes.main__upvote__active : ""
  }`;

  const downvoteClasses = `${classes.main__upvote} ${
    upvoteState === -1 ? classes.main__upvote__active : ""
  }`;

  return (
    <div style={{ fontSize, gap }} className={classes.main}>
      <div className={upvoteClasses} onClick={() => onUpvoteClick()}>
        <TbTriangleFilled />
      </div>
      <div className={downvoteClasses} onClick={() => onDownvoteClick()}>
        <TbTriangleInvertedFilled />
      </div>
      {upvotes}
    </div>
  );
};

export default UpvoteDownVoteSelect;
