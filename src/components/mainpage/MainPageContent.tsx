import { useContext, useState, useEffect, useCallback } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

import classes from "./style/MainPageContent.module.css";
import { WINDOW_TYPE } from "../../hooks/use-window-size";
import WindowContext from "../../store/window-context";

import TopicList from "./topic-list/TopicList";
import SelectTags from "./select-tags/SelectTags";
import { ITopic } from "../../types/Discussion";
import UserContext from "../../store/user-context";
import { useNavigate, useParams } from "react-router-dom";
import { getTopicsByTags } from "../../api/topic";

const MainPageContent = () => {
  // State
  const [drawerActive, setDrawerActive] = useState(false);
  const [topicsData, setTopicsData] = useState<ITopic[]>([]);

  const { type } = useParams();
  const navigate = useNavigate();

  // Context
  const { windowType } = useContext(WindowContext);
  const { token } = useContext(UserContext);

  const toggleClickHandler = () => {
    setDrawerActive((state) => !state);
  };

  const fetchTopics = useCallback(
    async (selectedTags: string[] = []) => {
      console.log(token);
      try {
        const result = await getTopicsByTags(
          selectedTags,
          token,
          type === "star"
        );
        console.log(result);
        setTopicsData(result);
      } catch (error) {
        console.log(error);
      }
    },
    [token, type]
  );

  const applySelectTagsHandler = (selectedTags: string[]) => {
    fetchTopics(selectedTags);
  };

  const starredTopicsClickHandler = () => {
    navigate(`/main/${type === "star" ? "all" : "star"}`);
  };

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  return (
    <div className={classes.content}>
      <aside
        className={`${classes.content__drawer} ${
          drawerActive && classes.content__drawer__active
        }`}
      >
        <div className={classes.content__drawer__content}>
          {/* <div className={classes.content__drawer__content__search}>
                        <input type="text" placeholder="Search" />
                    </div> */}
          <div>
            <h3>Tags</h3>
          </div>
          <div>
            <SelectTags onApply={applySelectTagsHandler} />
          </div>
          {token !== "" && (
            <div className={classes.content__drawer__content__btnContainer}>
              <button onClick={starredTopicsClickHandler}>
                {type === "all" ? "Starred Topics" : "Unstarred Topics"}
              </button>
            </div>
          )}
        </div>
        {windowType === WINDOW_TYPE.NARROW && (
          <div
            className={`${classes.content__drawer__toggle} ${
              drawerActive
                ? classes.content__drawer__toggle__off
                : classes.content__drawer__toggle__onn
            }`}
            onClick={toggleClickHandler}
          >
            <BiDotsVerticalRounded />
          </div>
        )}
      </aside>
      <section className={classes.content__main}>
        <TopicList topicsData={topicsData} setTopicData={setTopicsData} />
      </section>
    </div>
  );
};

export default MainPageContent;
