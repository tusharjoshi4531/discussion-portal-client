import { useContext, useState } from "react";
import FormLayout from "../FormLayout";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../../store/user-context";
import ImageSelectInput from "../image-select-input/ImageSelectInput";
import { addReply } from "../../../api/replies";

const AddReplyForm = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [replyText, setReplyText] = useState("");
  const { token } = useContext(UserContext);

  const [showAddImageSelectInput, setShowAddImageSelectInput] = useState(false);

  const [imageURL, setImageURL] = useState("");

  const formSubmitHandler = () => {
    const formIsInvalid =
      replyText === "" || (showAddImageSelectInput && imageURL === "");

    if (formIsInvalid) return;

    console.log(imageURL);
    // return;

    if (id)
      addReply(token, id, replyText).then((val) =>
        val ? navigate(-1) : undefined
      );
  };

  const addImageClickHandler = () => {
    setShowAddImageSelectInput((state) => !state);
    setImageURL("");
  };

  const imageSelectHandler = (imgURL: string) => {
    // console.log(imgURL/);
    setImageURL(imgURL);
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
          <textarea
            placeholder="Text"
            onChange={(e) => setReplyText(e.target.value)}
            value={replyText}
          />
          {showAddImageSelectInput && (
            <ImageSelectInput onImageSelect={imageSelectHandler} />
          )}
          {/* <button type="reset" onClick={addImageClickHandler}>
            {showAddImageSelectInput ? "Remove Image" : "Add Image"}
          </button> */}
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
