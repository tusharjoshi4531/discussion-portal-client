import { useState, useEffect, useContext } from "react";
import TitleCard from "./title-card/TitleCard";
import { ITopicData } from "../../types/Discussion";
import { useParams } from "react-router-dom";
import { getTopicById } from "../../api/discussion/getTopics";
import UserContext from "../../store/user-context";
import ReplyCard from "./reply-card/ReplyCard";
import classes from "./style/Discussion.module.css";

import { GrAdd } from "react-icons/gr";

const DiscussionPageContent = () => {
    const [TopicData, setTopicData] = useState<ITopicData>({
        id: "",
        title: "",
        author: "",
        description: "",
        isStarred: false,
        tags: [],
    });

    const { token } = useContext(UserContext);

    const { id } = useParams();

    useEffect(() => {
        const fetchTopicData = async () => {
            if (!id) return;

            try {
                const result = await getTopicById(id, token);
                setTopicData(result);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTopicData();
    }, [id, token]);

    return (
        <div className={classes.content}>
            <TitleCard
                title={TopicData.title}
                description={TopicData.description}
                author={TopicData.author}
            />
            <ReplyCard />
            <div className={classes.content__addAction}>
                <GrAdd />
            </div>
        </div>
    );
};

export default DiscussionPageContent;
