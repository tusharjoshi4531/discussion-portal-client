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
}

const TopicCard: React.FC<ITopicCardProps> = ({ author, title, tags }) => {
    const [starred, setStarred] = useState(false);
    const [showTags, setShowTags] = useState(false);

    const starClickHandler = () => {
        setStarred((state) => !state);
    };

    const toggleClickHandler = () => {
        setShowTags((state) => !state);
    };

    const cardClickHandler = () => {
        console.log("click");
    };

    const tagComponents = tags.map((tag) => (
        <li key={tag} className={classes.content__tags__item}>
            {tag}
        </li>
    ));

    return (
        <Card color="secondary" borderRadius="small" padding="small">
            <div className={classes.content} onClick={cardClickHandler}>
                <div className={classes.content__body}>
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
                    {starred ? <AiFillStar /> : <AiOutlineStar />}
                </div>
            </div>
        </Card>
    );
};

export default TopicCard;
