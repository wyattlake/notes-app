import React from "react";
import { Form, Formik } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "components/InputField";
import { useRegisterUserMutation } from "generated/graphql";
import Router from "next/router";
import { formikErrorMap } from "utils/formikErrorMap";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useRegisterUserMutation();
    return (
        <Wrapper variant="small">
            <h1>Register</h1>
            <Formik
                initialValues={{ username: "", email: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    console.log(values);
                    const response = await register({ options: values });
                    console.log(response);
                    if (response.data?.registerUser.errors) {
                        setErrors(
                            formikErrorMap(response.data.registerUser.errors)
                        );
                    } else if (response.data?.registerUser.user) {
                        Router.push("/");
                    }
                }}
            >
                {() => (
                    <Form>
                        <InputField
                            maxLength={20}
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
                            maxLength={30}
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
