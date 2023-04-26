import { useState, useEffect } from "react";
import { ITopicData } from "../../../types/Discussion";

import classes from "./style/TopicList.module.css";
import TopicCard from "../topic-card/TopicCard";
import getTopics from "../../../api/discussion/getTopics";

interface ITopicListProps {
    topicsData: ITopicData[]
}

const TopicList: React.FC<ITopicListProps> = ({topicsData}) => {

    const TopicComponents = topicsData.map((topic) => (
        <TopicCard
            title={topic.title}
            author={topic.author}
            key={topic.id}
            tags={topic.tags}
        />
    ));

    return <div className={classes.content}>{TopicComponents}</div>;
};

export default TopicList;
