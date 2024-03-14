import { useState, useContext } from "react";
import { AiOutlineHeart, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";

import { WINDOW_TYPE } from "../../hooks/use-window-size";

import classes from "./style/Navbar.module.css";
import UserContext, { ACTION_TYPE } from "../../store/user-context";
import { useNavigate } from "react-router-dom";
import WindowContext from "../../store/window-context";

const Navbar = () => {
    // State
    const [toggleOn, setToggleOn] = useState(false);

    // Navigate hook
    const navigate = useNavigate();

    // Context
    const { username, dispatch } = useContext(UserContext);
    const { windowType } = useContext(WindowContext);

    const logoClockHandler = () => {
        navigate("/main/all");
    };

    const toggleClickHandler = () => {
        setToggleOn((state) => !state);
    };

    const loginClickHandler = () => {
        navigate("/auth");
    };

    const logoutClickHandler = () => {
        dispatch({ type: ACTION_TYPE.CLEAR_VALUE });
    };

    const addTopicClickHandler = () => {
        navigate("/add/topic");
    };

    return (
        <header className={classes.header}>
            <h3 className={classes.header__logo} onClick={logoClockHandler}>
                Discussion Portal
            </h3>
            <nav className={classes.header__action}>
                {username && (
                    <>
                        <div className={classes.header__action__item}>
                            <AiOutlineHeart />
                        </div>
                        <div
                            className={classes.header__action__item}
                            onClick={addTopicClickHandler}
                        >
                            <AiOutlinePlus />
                        </div>
                    </>
                )}
            </nav>
            {username && (windowType === WINDOW_TYPE.WIDE || toggleOn) && (
                <div className={classes.header__profile}>
                    <div className={classes.header__profile__img}>
                        {username[0].toUpperCase()}
                    </div>
                    <div className={classes.header__profile__name}>
                        {username}
                    </div>
                    <button onClick={logoutClickHandler}>Logout</button>
                </div>
            )}
            {username && windowType === WINDOW_TYPE.NARROW && (
                <div
                    className={classes.header__toggle}
                    onClick={toggleClickHandler}
                >
                    {!toggleOn && <BiDotsVerticalRounded />}
                    {toggleOn && <AiOutlineClose />}
                </div>
            )}
            {!username && (
                <button
                    onClick={loginClickHandler}
                    className={classes.header__login}
                >
                    Login
                </button>
            )}
        </header>
    );
};

export default Navbar;
