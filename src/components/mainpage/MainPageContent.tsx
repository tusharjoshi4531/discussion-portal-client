import { useContext, useState, useEffect, useCallback } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

import classes from "./style/MainPageContent.module.css";
import { WINDOW_TYPE } from "../../hooks/use-window-size";
import WindowContext from "../../store/window-context";

import TopicList from "./topic-list/TopicList";
import SelectTags from "./select-tags/SelectTags";
import { ITopicData } from "../../types/Discussion";
import getTopics from "../../api/discussion/getTopics";
import UserContext from "../../store/user-context";

const MainPageContent = () => {
    // State
    const [drawerActive, setDrawerActive] = useState(false);
    const [topicsData, setTopicsData] = useState<ITopicData[]>([]);

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
                const result = await getTopics(selectedTags, token);
                console.log(result);
                setTopicsData(result);
            } catch (error) {
                console.log(error);
            }
        },
        [token]
    );

    const applySelectTagsHandler = (selectedTags: string[]) => {
        console.log(selectedTags);
        fetchTopics(selectedTags);
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
                <div className={classes.content__drawer_content}>
                    <div>sec1</div>
                    <div>sec2</div>
                    <div>
                        <SelectTags onApply={applySelectTagsHandler} />
                    </div>
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
                <TopicList
                    topicsData={topicsData}
                    setTopicData={setTopicsData}
                />
            </section>
        </div>
    );
};

export default MainPageContent;
