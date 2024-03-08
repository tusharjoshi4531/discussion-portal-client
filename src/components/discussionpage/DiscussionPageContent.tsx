import { useState, useEffect, useContext } from "react";
import TitleCard from "./title-card/TitleCard";
import { IReply, ITopic } from "../../types/Discussion";
import { useNavigate, useParams } from "react-router-dom";

import UserContext from "../../store/user-context";
import ReplyCard from "./reply-card/ReplyCard";
import classes from "./style/Discussion.module.css";

import { GrAdd } from "react-icons/gr";
import useReplies from "../../hooks/use-replies";
import { getTopicById } from "../../api/topic";

const DiscussionPageContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { token } = useContext(UserContext);

  const [TopicData, setTopicData] = useState<ITopic>({
    id: "",
    title: "",
    author: "",
    description: "",
    isStarred: false,
    tags: [],
  });

  const { replies, upsertReply } = useReplies(id);

  const replyAddClickHandler = () => {
    navigate(`/add/discussion/${id}`);
  };

  useEffect(() => {
    const fetchTopicData = async () => {
      if (!id) return;

      try {
        const topic = await getTopicById(id);

        setTopicData(topic);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTopicData();
  }, [id, token]);

  const replyUpvoteChangeHandler = async (newReply: IReply) => {
    upsertReply(newReply);
  };

  const replyComponents = replies.map((reply) => (
    <ReplyCard
      author={reply.author}
      body={reply.content}
      upvotes={reply.upvotes}
      upvoteStatus={reply.upvoteStatus}
      key={reply.id}
      replyId={reply.id}
      topicId={id ? id : ""}
      onUpvoteChange={replyUpvoteChangeHandler}
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
