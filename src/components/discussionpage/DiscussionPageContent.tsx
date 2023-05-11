import { useState, useEffect, useContext } from "react";
import TitleCard from "./title-card/TitleCard";
import {
    ICommentData,
    IDiscussionReplyData,
    ITopicData,
} from "../../types/Discussion";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getTopicById } from "../../api/discussion/getTopics";
import UserContext from "../../store/user-context";
import ReplyCard from "./reply-card/ReplyCard";
import classes from "./style/Discussion.module.css";

import { GrAdd } from "react-icons/gr";
import { getDiscussionReplies } from "../../api/discussion/getDiscussion";

const dummycomments: ICommentData[] = [
    {
        author: "test",
        id: "1",
        body: "COMMENT 1",
        subComments: [
            {
                author: "test",
                id: "11",
                body: "SUBCOMMENT 11",
            },
            {
                author: "test",
                id: "12",
                body: "SUBCOMMENT 12",
            },
        ],
    },
    {
        author: "test",
        id: "2",
        body: "COMMENT 2",
        subComments: [
            {
                author: "test",
                id: "21",
                body: "SUBCOMMENT 21",
            },
            {
                author: "test",
                id: "22",
                body: "SUBCOMMENT 22",
                subComments: [
                    {
                        author: "test",
                        id: "221",
                        body: "SUBCOMMENT 221",
                    },
                ],
            },
        ],
    },
];

const DiscussionPageContent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { token } = useContext(UserContext);

    const [TopicData, setTopicData] = useState<ITopicData>({
        id: "",
        title: "",
        author: "",
        description: "",
        isStarred: false,
        tags: [],
    });

    const [replies, setReplies] = useState<IDiscussionReplyData[]>([]);

    const replyAddClickHandler = () => {
        navigate(`/add/discussion/${id}`);
    };

    useEffect(() => {
        const fetchTopicData = async () => {
            if (!id) return;

            try {
                const topic = await getTopicById(id);
                const replies = await getDiscussionReplies(id);
                console.log(replies);
                setTopicData(topic);
                setReplies(replies);
            } catch (error) {
                console.log(error);
            }
        };

        fetchTopicData();
    }, [id, token]);

    const replyComponents = replies.map((reply) => (
        <ReplyCard
            author={reply.author}
            body={reply.content}
            comments={reply.comments}
            upvotes={reply.upvotes}
            key={reply.id}
            replyId={reply.id}
            topicId={id ? id : ""}
        />
    ));

    return (
        <div className={classes.content}>
            <TitleCard
                title={TopicData.title}
                description={TopicData.description}
                author={TopicData.author}
            />
            {replyComponents}
            <div
                className={classes.content__addAction}
                onClick={replyAddClickHandler}
            >
                <GrAdd />
            </div>
        </div>
    );
};

export default DiscussionPageContent;
