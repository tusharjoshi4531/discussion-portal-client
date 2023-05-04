import { useState } from "react";
import {
    AiOutlineStar,
    AiFillStar,
    AiFillCaretRight,
    AiFillCaretDown,
} from "react-icons/ai";

import classes from "./style/TopicCard.module.css";
import Card from "../../util/card/Card";

interface ITopicCardProps {
    author: string;
    title: string;
    tags: string[];
    isStarred?: boolean;
    onStarClick?: () => void;
    onClick?: () => void;
}

const TopicCard: React.FC<ITopicCardProps> = ({
    author,
    title,
    tags,
    isStarred = false,
    onStarClick,
    onClick,
}) => {
    const [showTags, setShowTags] = useState(false);

    const starClickHandler = () => {
        if (onStarClick) onStarClick();
    };

    const toggleClickHandler = () => {
        setShowTags((state) => !state);
    };

    const cardClickHandler = () => {
        if (onClick) onClick();
    };

    const tagComponents = tags.map((tag) => (
        <li key={tag} className={classes.content__tags__item}>
            {tag}
        </li>
    ));

    return (
        <Card color="secondary" borderRadius="small" padding="small">
            <div className={classes.content}>
                <div
                    className={classes.content__body}
                    onClick={cardClickHandler}
                >
                    <h6 className={classes.content__body__author}>
                        Posted by {author}
                    </h6>
                    <h1 className={classes.content__body__title}>{title}</h1>
                </div>
                <div className={classes.content__tags}>
                    <div
                        className={classes.content__tags__toggle}
                        onClick={toggleClickHandler}
                    >
                        {!showTags ? <AiFillCaretRight /> : <AiFillCaretDown />}
                    </div>
                    {showTags && <ul>{tagComponents}</ul>}
                </div>
            </div>
            <div className={classes.actions}>
                <div
                    className={classes.actions__like}
                    onClick={starClickHandler}
                >
                    {isStarred ? <AiFillStar /> : <AiOutlineStar />}
                </div>
            </div>
        </Card>
    );
};

export default TopicCard;
