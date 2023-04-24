import React from "react";
import Navbar from "../navbar/Navbar";

interface ILayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
    return (
        <div style={{display: "flex", flexDirection:"column"}}>
            <Navbar />
            <section style={{ overflow: "scroll", flexGrow: "1"}}>{children}</section>
        </div>
    );
};

export default Layout;
