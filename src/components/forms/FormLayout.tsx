import React from "react";

import classes from "./style/FormLayout.module.css";

interface IFormLayoutProps {
    title?: string;
    control: React.ReactNode;
    action: React.ReactNode;
    onSubmit?: () => void;
}

const FormLayout: React.FC<IFormLayoutProps> = ({
    title,
    control,
    action,
    onSubmit,
}) => {
    const submitHandler: React.FormEventHandler = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
    };

    return (
        <form onSubmit={submitHandler}>
            {title && <h1>{title}</h1>}
            <div className={classes.control}>{control}</div>
            <div className={classes.action}>{action}</div>
        </form>
    );
};

export default FormLayout;
