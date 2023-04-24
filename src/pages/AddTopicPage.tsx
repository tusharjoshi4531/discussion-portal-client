import React from "react";
import Card from "../components/util/card/Card";
import AddTopicForm from "../components/forms/add-topic-form/AddTopicForm";

const AddTopicPage = () => {
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
                <AddTopicForm />
            </Card>
        </div>
    );
};

export default AddTopicPage;
