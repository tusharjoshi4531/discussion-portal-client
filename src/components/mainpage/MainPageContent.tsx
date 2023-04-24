import { useContext, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

import classes from "./style/MainPageContent.module.css";
import { WINDOW_TYPE } from "../../hooks/use-window-size";
import WindowContext from "../../store/window-context";

import TopicList from "./topic-list/TopicList";

const MainPageContent = () => {
    // State
    const [drawerActive, setDrawerActive] = useState(false);

    // Context
    const { windowType } = useContext(WindowContext);

    const toggleClickHandler = () => {
        setDrawerActive((state) => !state);
    };

    return (
        <div className={classes.content}>
            <aside
                className={`${classes.content__drawer} ${
                    drawerActive && classes.content__drawer__active
                }`}
            >
                <div className={classes.content__drawer_content}></div>
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
                <TopicList />
            </section>
        </div>
    );
};

export default MainPageContent;
