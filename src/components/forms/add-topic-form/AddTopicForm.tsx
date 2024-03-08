import { useState, useRef, useContext } from "react";
import FormLayout from "../FormLayout";
import { useNavigate } from "react-router-dom";
import Select from "../../util/select/Select";
import SelectedItem from "../selected-item/SelectedItem";
import UserContext from "../../../store/user-context";

import { TAGS as tags } from "../../../global";
import { addTopic } from "../../../api/topic";

const AddTopicForm = () => {
  const navigate = useNavigate();

  const { username, token } = useContext(UserContext);

  const titleRef = useRef<HTMLInputElement>(null!);
  const descriptionRef = useRef<HTMLTextAreaElement>(null!);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const cancelClickHandler = () => {
    navigate("/");
  };

  const selectHandler = (selected: string) => {
    setSelectedTags((state) => {
      if (state.find((val) => val == selected)) return state;
      else return [...state, selected];
    });
  };

  const submitHandler = async () => {
    const author = username;
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    if (author == "" || title == "" || tags.length === 0) return;

    try {
      await addTopic(token, author, title, description, selectedTags);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const tagCloseHandler = (tag: string) => {
    setSelectedTags((state) => state.filter((item) => item !== tag));
  };

  const selectedTagcomponents = selectedTags.map((tag) => (
    <SelectedItem item={tag} key={tag} onClose={() => tagCloseHandler(tag)} />
  ));

  return (
    <FormLayout
      onSubmit={submitHandler}
      title="Add Topic"
      control={
        <>
          <label>Title: </label>
          <input type="text" placeholder="Title" ref={titleRef} />

          <label>Description: </label>
          <textarea placeholder="Title" ref={descriptionRef} />

          <label>Tags: </label>
          <Select options={tags} onSelect={selectHandler} />

          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {selectedTagcomponents}
          </div>
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
