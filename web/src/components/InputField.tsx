import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import style from "./styles/InputField.module.css";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    placeholder?: string;
    maxLength?: number;
    name: string;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
    const [field, { error }] = useField(props);
    return (
        <div className={style.inputWrapper}>
            {props.label ? <h2>{props.label}</h2> : <></>}
            <input
                {...field}
                {...props}
                className={style.stretchForm}
                name={field.name}
                id={field.name}
                placeholder={props.placeholder ? props.placeholder : ""}
            />
            {error ? <p>{error}</p> : <></>}
        </div>
    );
};
