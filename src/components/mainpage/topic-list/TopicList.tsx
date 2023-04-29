import { useContext } from "react";
import { ITopicData } from "../../../types/Discussion";

import classes from "./style/TopicList.module.css";
import TopicCard from "../topic-card/TopicCard";
import UserContext from "../../../store/user-context";
import { starTopic } from "../../../api/discussion/starTopic";

interface ITopicListProps {
    topicsData: ITopicData[];
    setTopicData: React.Dispatch<React.SetStateAction<ITopicData[]>>;
}

const TopicList: React.FC<ITopicListProps> = ({ topicsData, setTopicData }) => {
    const { token } = useContext(UserContext);

    const starTopicHandler = (topicId: string) => {
        const topic = topicsData.find((topic) => topic.id === topicId);
        const state = topic !== undefined && topic.isStarred;
        starTopic(token, topicId, !state);

        setTopicData((prev) => {
            const targetTopic = prev.find((val) => val.id === topicId);
            if (targetTopic) targetTopic.isStarred = !state;
            return [...prev];
        });
    };

    const TopicComponents = topicsData.map((topic) => (
        <TopicCard
            title={topic.title}
            author={topic.author}
            key={topic.id}
            tags={topic.tags}
            isStarred={topic.isStarred}
            onStarClick={() => starTopicHandler(topic.id)}
        />
    ));

    return <div className={classes.content}>{TopicComponents}</div>;
};

export default TopicList;
