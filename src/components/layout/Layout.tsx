import React from "react";
import Navbar from "../navbar/Navbar";

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <>
            <Navbar />
            <section style={{ overflow: "scroll" }}>{children}</section>
        </>
    );
};

export default Layout;
