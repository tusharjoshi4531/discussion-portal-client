import React from "react";
import Card from "../components/util/card/Card";
import useWindowSize from "../hooks/use-window-size";
import LoginForm from "../components/forms/login-form/LoginForm";

const LoginPage = () => {
    return (
        <div
            style={{
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
            }}
        >
            <Card style={{ maxWidth: 500, flexGrow: 1, marginTop: "3rem" }}>
                <LoginForm />
            </Card>
        </div>
    );
};

export default LoginPage;
