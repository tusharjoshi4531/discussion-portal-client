import React from "react";
import Card from "../../util/card/Card";

import classes from "./style/TitleCard.module.css";

interface ITitleCardProps {
    title: string;
    description?: string;
    author: string;
}

const TitleCard: React.FC<ITitleCardProps> = ({
    title,
    description = "",
    author,
}) => {
    return (
        <Card borderRadius="small" color="primary" padding="small">
            <div className={classes.body}>
                <h1 className={classes.body__title}>{title}</h1>
                <div className={classes.body__description}>{description}</div>
                <div className={classes.body__author}>Posted by {author}</div>
            </div>
        </Card>
    );
};

export default TitleCard;
