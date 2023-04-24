import { useState } from "react";
import { ITopicData } from "../../../types/Discussion";

import classes from "./style/TopicList.module.css";
import TopicCard from "../topic-card/TopicCard";

const DUMMY_DATA: ITopicData[] = [
    { author: "Test1", title: "Testing", id: "1" },
    { author: "Test2", title: "Testing", id: "2" },
    { author: "Test3", title: "Testing", id: "3" },
];

const TopicList = () => {
    const [topicsData, setTopicsData] = useState(DUMMY_DATA);

    const TopicComponents = topicsData.map((topic) => (
        <TopicCard title={topic.title} author={topic.author} key={topic.id} />
    ));

    return <div className={classes.content}>{TopicComponents}</div>;
};

export default TopicList;
