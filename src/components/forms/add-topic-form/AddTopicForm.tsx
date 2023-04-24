import React from "react";
import FormLayout from "../FormLayout";
import { useNavigate } from "react-router-dom";

const AddTopicForm = () => {
    const navigate = useNavigate();

    const cancelClickHandler = () => {
        navigate("/");
    };

    return (
        <FormLayout
            title="Add Topic"
            control={
                <>
                    <label>Title: </label>
                    <input type="text" placeholder="title" />
                </>
            }
            action={
                <>
                    <button type="button" onClick={cancelClickHandler}>
                        Cancel
                    </button>
                    <button type="submit">Add</button>
                </>
            }
        />
    );
};

export default AddTopicForm;
