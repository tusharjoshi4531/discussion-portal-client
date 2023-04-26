import { useState, useEffect } from "react";
import { ITopicData } from "../../../types/Discussion";

import classes from "./style/TopicList.module.css";
import TopicCard from "../topic-card/TopicCard";
import getTopics from "../../../api/discussion/getTopics";

const TopicList = () => {
    const [topicsData, setTopicsData] = useState<ITopicData[]>([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const result = await getTopics();
                setTopicsData(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTopics();
    }, []);

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
