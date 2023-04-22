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
}

const Card: React.FC<ICardProps> = ({
    children,
    margin = "large",
    padding = "large",
    style,
    color = "white",
}) => {
    const classname = `${classes.card} ${
        margin == "large" ? classes.marginLarge : classes.marginSmall
    } ${padding == "large" ? classes.paddingLarge : classes.paddingSmall} ${
        classes[color]
    }`;

    return (
        <div className={classname} style={style}>
            {children}
        </div>
    );
};

export default Card;
