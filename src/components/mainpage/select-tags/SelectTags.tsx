import { useState } from "react";

import classes from "./style/SelectTags.module.css";
import { TAGS } from "../../../global";

interface ISelectTagsProps {
    onApply: (selectedTags: string[]) => void;
}

const SelectTags: React.FC<ISelectTagsProps> = ({ onApply }) => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const tagSelectHandler = (selectedTag: string) => {
        setSelectedTags((state) => {
            if (state.includes(selectedTag))
                return state.filter((tag) => tag !== selectedTag);
            else return [...state, selectedTag];
        });
    };

    const applyClickHandler = () => {
        onApply(selectedTags);
    };

    const tagElements = TAGS.map((tag) => (
        <li
            className={`${classes.container__tags__item} ${
                selectedTags.includes(tag)
                    ? classes.container__tags__item__selected
                    : ""
            }`}
            key={tag}
            onClick={() => tagSelectHandler(tag)}
        >
            {tag}
        </li>
    ));

    return (
        <div className={classes.container}>
            <ul className={classes.container__tags}>{tagElements}</ul>
            <button onClick={applyClickHandler}>Apply Tags</button>
        </div>
    );
};

export default SelectTags;
