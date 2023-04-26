import { useContext, useState, useEffect, useCallback } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

import classes from "./style/MainPageContent.module.css";
import { WINDOW_TYPE } from "../../hooks/use-window-size";
import WindowContext from "../../store/window-context";

import TopicList from "./topic-list/TopicList";
import SelectTags from "./select-tags/SelectTags";
import { ITopicData } from "../../types/Discussion";
import getTopics from "../../api/discussion/getTopics";

const MainPageContent = () => {
    // State
    const [drawerActive, setDrawerActive] = useState(false);
    const [topicsData, setTopicsData] = useState<ITopicData[]>([]);

    // Context
    const { windowType } = useContext(WindowContext);

    const toggleClickHandler = () => {
        setDrawerActive((state) => !state);
    };

    const fetchTopics = useCallback(async (selectedTags: string[] = []) => {
        try {
            const result = await getTopics(selectedTags);
            console.log(result);
            setTopicsData(result);
        } catch (error) {
            console.log(error);
        }
    }, []);

    const applySelectTagsHandler = (selectedTags: string[]) => {
        console.log(selectedTags);
        fetchTopics(selectedTags);
    };

    useEffect(() => {
        fetchTopics();
    }, []);

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
                <TopicList topicsData={topicsData} />
            </section>
        </div>
    );
};

export default MainPageContent;
