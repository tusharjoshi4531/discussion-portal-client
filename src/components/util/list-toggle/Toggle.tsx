import classes from "./style/Toggle.module.css";
import { IconType } from "react-icons";

interface IToggleProps {
    text?: string;
    fontSize?: string;
    state: boolean;
    ActiveIcon: IconType;
    InactiveIcon: IconType;
    onToggle?: (state: boolean) => void;
}

const Toggle: React.FC<IToggleProps> = ({
    text = "",
    fontSize = "1rem",
    state,
    onToggle = (state: boolean) => {},
    ActiveIcon,
    InactiveIcon,
}) => {
    const toggleHandler = () => {
        onToggle(!state);
    };

    const toggleClasses = `${classes.toggle} ${
        state ? classes.toggle__active : ""
    }`;
    return (
        <div
            className={toggleClasses}
            style={{ fontSize }}
            onClick={toggleHandler}
        >
            {text + " "}
            {state ? <ActiveIcon /> : <InactiveIcon />}
        </div>
    );
};

export default Toggle;
