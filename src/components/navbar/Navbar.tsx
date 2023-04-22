import { useState, useContext } from "react";
import { AiOutlineHeart, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";

import useWindowSize from "../../hooks/use-window-size";

import classes from "./style/Navbar.module.css";
import UserContext, { ACTION_TYPE } from "../../store/user-context";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    // State
    const [toggleOn, setToggleOn] = useState(false);
    const { screenWidth } = useWindowSize();

    // Navigate hook
    const navigate = useNavigate();

    // Context
    const { username, dispatch } = useContext(UserContext);

    const toggleClickHandler = () => {
        setToggleOn((state) => !state);
    };

    const loginClickHandler = () => {
        navigate("/auth");
    };
    
    const logoutClickHandler = () => {
        dispatch({type: ACTION_TYPE.CLEAR_VALUE})
    }

    return (
        <header className={classes.header}>
            <h3 className={classes.header__logo}>Hello</h3>
            <nav className={classes.header__action}>
                {username && (
                    <>
                        <div className={classes.header__action__item}>
                            <AiOutlineHeart />
                        </div>
                        <div className={classes.header__action__item}>
                            <AiOutlinePlus />
                        </div>
                    </>
                )}
            </nav>
            {username && (screenWidth >= 768 || toggleOn) && (
                <div className={classes.header__profile}>
                    <div className={classes.header__profile__img}>T</div>
                    <div className={classes.header__profile__name}>Tushar</div>
                    <button onClick={logoutClickHandler}>Logout</button>
                </div>
            )}
            {username && screenWidth < 768 && (
                <div
                    className={classes.header__toggle}
                    onClick={toggleClickHandler}
                >
                    {!toggleOn && <BiDotsVertical />}
                    {toggleOn && <AiOutlineClose />}
                </div>
            )}
            {!username && <button onClick={loginClickHandler}>Login</button>}
        </header>
    );
};

export default Navbar;
