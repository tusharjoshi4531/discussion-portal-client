import { useState } from "react";

import classes from "./style/Select.module.css";

interface ISelectMenuProps {
    availableOptions: string[];
    onSelect: (selected: string) => void;
    show: boolean;
}

const SelectMenu: React.FC<ISelectMenuProps> = ({
    availableOptions,
    onSelect,
    show,
}) => {
    const optionComponents = availableOptions.map((option) => (
        <div
            key={option}
            className={classes.menu__item}
            onMouseDown={() => {
                onSelect(option);
            }}
        >
            {option}
        </div>
    ));

    return (
        <>
            <div className={`${classes.menu} ${!show ? classes.hide : ""}`}>
                {optionComponents}
            </div>
        </>
    );
};

interface ISelectProps {
    options: string[];
    onSelect: (selected: string) => void;
}

const Select: React.FC<ISelectProps> = ({ options, onSelect }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [inputText, setInputText] = useState("");
    const [currentOptions, setCurrentOptions] = useState<string[]>(options);

    const focusHandler = () => {
        setShowMenu(true);
    };

    const blurHandler = () => {
        setShowMenu(false);
    };

    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const text = e.target.value;

        setInputText(text);
        setCurrentOptions(
            options.filter((option) =>
                option.toLocaleLowerCase().includes(text.toLocaleLowerCase())
            )
        );
    };

    return (
        <>
            <input
                type="text"
                placeholder="Tags"
                onFocus={focusHandler}
                onBlur={blurHandler}
                onChange={changeHandler}
                value={inputText}
            />

            <SelectMenu
                show={showMenu}
                availableOptions={currentOptions}
                onSelect={onSelect}
            />
        </>
    );
};

export default Select;
