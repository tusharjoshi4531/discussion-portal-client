import { useState } from "react";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";

import classes from "./style/TopicCard.module.css";
import Card from "../../util/card/Card";

interface ITopicCardProps {
    author: string;
    title: string;
}

const TopicCard: React.FC<ITopicCardProps> = ({ author, title }) => {
    const [starred, setStarred] = useState(false);

    const starClickHandler = () => {
        setStarred((state) => !state);
    };

    const cardClickHandler = () => {
        console.log("click");
    };

    return (
        <Card color="secondary" borderRadius="small" padding="small">
            <div className={classes.content} onClick={cardClickHandler}>
                <h6 className={classes.content__author}>Posted By {author}</h6>
                <h1 className={classes.content__title}>{title}</h1>
            </div>
            <div className={classes.content__actions}>
                <div
                    className={classes.content__actions__like}
                    onClick={starClickHandler}
                >
                    {starred ? <AiFillStar /> : <AiOutlineStar />}
                </div>
            </div>
        </Card>
    );
};

export default TopicCard;
