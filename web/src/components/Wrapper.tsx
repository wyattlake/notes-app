import React from "react";
import style from "./styles/Wrapper.module.css";

interface WrapperProps {
    variant?: "small" | "medium";
}

export const Wrapper: React.FC<WrapperProps> = ({
    children,
    variant = "medium",
}) => {
    return (
        <div
            className={
                variant === "small" ? style.smallWrapper : style.mediumWrapper
            }
        >
            {children}
        </div>
    );
};
