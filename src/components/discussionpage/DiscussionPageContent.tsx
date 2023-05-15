import { useState, useEffect, useContext, useReducer } from "react";
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

export enum REPLY_ACTION_TYPE {
    SET_VAL,
    UPDATE_REPLY,
}

type IReplyReducerPayload = IDiscussionReplyData[] | IDiscussionReplyData;

export interface IReplyReducerAction {
    payload: IReplyReducerPayload;
    type: REPLY_ACTION_TYPE;
}

const discussionRepliesReducer = (
    state: IDiscussionReplyData[],
    action: IReplyReducerAction
) => {
    switch (action.type) {
        case REPLY_ACTION_TYPE.SET_VAL:
            return action.payload as IDiscussionReplyData[];

        case REPLY_ACTION_TYPE.UPDATE_REPLY:
            const reply = action.payload as IDiscussionReplyData;
            const newState = state.map((el) =>
                el.id === reply.id ? reply : el
            );
            newState.sort((a, b) => b.upvotes - a.upvotes);
            return newState;

        default:
            return state;
    }
};

const initialState: IDiscussionReplyData[] = [];

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

    const [replies, dispatch] = useReducer(
        discussionRepliesReducer,
        initialState
    );

    const replyAddClickHandler = () => {
        navigate(`/add/discussion/${id}`);
    };

    useEffect(() => {
        const fetchTopicData = async () => {
            if (!id) return;

            try {
                const topic = await getTopicById(id);
                const replies = await getDiscussionReplies(id, token);
                console.log(replies);
                setTopicData(topic);
                dispatch({ type: REPLY_ACTION_TYPE.SET_VAL, payload: replies });
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
            upvoteStatus={reply.upvoteStatus}
            key={reply.id}
            replyId={reply.id}
            topicId={id ? id : ""}
            dispatch={dispatch}
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
