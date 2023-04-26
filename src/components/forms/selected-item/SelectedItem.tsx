import React from "react";

import classes from "./style/SelectedItem.module.css";

import { AiOutlineClose } from "react-icons/ai";

interface ISelectedItem {
    item: string;
    onClose?: () => void;
}

const SelectedItem: React.FC<ISelectedItem> = ({ item, onClose }) => {
    return (
        <div className={classes.container}>
            {item}
            <div className={classes.container__close} onClick={onClose}>
                <AiOutlineClose />
            </div>
        </div>
    );
};

export default SelectedItem;
