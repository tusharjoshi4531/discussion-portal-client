import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/index.css";
import { UserProvider } from "./store/user-context";
import { BrowserRouter } from "react-router-dom";
import { WindowProvider } from "./store/window-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <WindowProvider>
        <UserProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </UserProvider>
    </WindowProvider>
);
