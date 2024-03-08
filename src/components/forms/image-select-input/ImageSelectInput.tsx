import React from "react";
import { AiOutlineClose } from "react-icons/ai";

import classes from "./style/ImageSelectInput.module.css";

interface ImageSelectInputProps {
    onClose?: () => void;
    onImageSelect?: (imgURI: string) => void;
    hasCloseButton?: boolean;
}

const ImageSelectInput: React.FC<ImageSelectInputProps> = ({
    onClose = () => {},
    onImageSelect = (imgURL: string) => {},
    hasCloseButton = false,
}) => {
    const inputChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (
        e
    ) => {
        const files = e.target.files;
        if (!files || files.length === 0) {
            onImageSelect("");
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(files[0]);

        reader.onload = () => {
            onImageSelect(reader.result as string);
        };

        reader.onerror = (error) => {
            console.log(error);
        };
    };

    return (
        <div className={classes.container}>
            <input
                type="file"
                accept="image/png, image/jpg"
                onChange={inputChangeHandler}
            />
            {hasCloseButton && (
                <div className={classes.container__close} onClick={onClose}>
                    <AiOutlineClose />
                </div>
            )}
        </div>
    );
};

export default ImageSelectInput;
