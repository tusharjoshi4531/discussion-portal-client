import React from "react";
import Navbar from "../navbar/Navbar";

import classes from "./style/Layout.module.css";

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <div className={classes.container}>
            <Navbar />
            <section className={classes.container__body}>{children}</section>
        </div>
    );
};

export default Layout;
