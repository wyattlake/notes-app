import React from "react";
import { Form, Formik } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "components/InputField";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper variant="small">
            <h1>Register</h1>
            <Formik
                initialValues={{ username: "", email: "", password: "" }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {(values, handleChange) => (
                    <Form>
                        <InputField
                            label="Name"
                            name="username"
                            placeholder="name"
                        />
                        <InputField
                            label="Email"
                            name="email"
                            placeholder="email"
                        />
                        <InputField
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="password"
                        />
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Register;
