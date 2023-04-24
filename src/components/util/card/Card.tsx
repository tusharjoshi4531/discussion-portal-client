import React from "react";

import classes from "./style/Card.module.css";

type PropertySizeType = "large" | "small" | "none";
type ColorType =
    | "white"
    | "primary"
    | "primaryDark"
    | "secondary"
    | "background"
    | "dark";

interface ICardProps {
    children: React.ReactNode;
    margin?: PropertySizeType;
    padding?: PropertySizeType;
    style?: React.CSSProperties;
    color?: ColorType;
    borderRadius?: PropertySizeType;
    clickable?: boolean;
    onClick?: () => void;
}

const Card: React.FC<ICardProps> = ({
    children,
    style,
    margin = "large",
    padding = "large",
    color = "white",
    borderRadius = "large",
    clickable = false,
    onClick = () => {},
}) => {
    const classname = `${classes.card} ${
        margin == "large" ? classes.marginLarge : classes.marginSmall
    } ${padding == "large" ? classes.paddingLarge : classes.paddingSmall} ${
        classes[color]
    } ${
        borderRadius == "large"
            ? classes.borderRadiusLarge
            : classes.borderRadiusSmall
    } ${clickable && classes.clickable}`;

    const cardClickHandler = () => {
        if (clickable) onClick();
    };

    return (
        <div className={classname} style={style} onClick={cardClickHandler}>
            {children}
        </div>
    );
};

export default Card;
