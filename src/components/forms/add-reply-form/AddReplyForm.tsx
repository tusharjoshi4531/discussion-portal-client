import { useRef, useContext } from "react";
import FormLayout from "../FormLayout";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../../store/user-context";
import { addReply } from "../../../api/discussion/addReply";

const AddReplyForm = () => {
    const navigate = useNavigate();

    const { id } = useParams();

    const replyRef = useRef<HTMLTextAreaElement>(null!);
    const { token } = useContext(UserContext);

    const formSubmitHandler = () => {
        const replyText = replyRef.current.value;
        if (replyText === "") return;

        if (id)
            addReply(token, id, replyText).then((val) =>
                val ? navigate(-1) : undefined
            );
    };

    const cancelHandler = () => {
        navigate(-1);
    };

    return (
        <FormLayout
            onSubmit={formSubmitHandler}
            title="Add Reply"
            control={
                <>
                    <label>Reply</label>
                    <textarea placeholder="Text" ref={replyRef} />
                </>
            }
            action={
                <>
                    <button type="button" onClick={cancelHandler}>
                        Cancel
                    </button>
                    <button type="submit">Submit</button>
                </>
            }
        />
    );
};

export default AddReplyForm;
