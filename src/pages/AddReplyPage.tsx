import React from "react";
import Card from "../components/util/card/Card";
import AddReplyForm from "../components/forms/add-reply-form/AddReplyForm";

const AddReplyPage = () => {
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
                <AddReplyForm />
            </Card>
        </div>
    );
};

export default AddReplyPage;
