import React from "react";
import Card from "../../util/card/Card";

interface ITitleCardProps {
    title: string;
    description?: string;
}

const TitleCard: React.FC<ITitleCardProps> = ({ title, description = "" }) => {
    return (
        <Card borderRadius="small" color="primary" padding="small">
            <h1>{title}</h1>
            <div>{description}</div>
        </Card>
    );
};

export default TitleCard;
