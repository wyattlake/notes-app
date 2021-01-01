import React from "react";
import { Form, Formik } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "components/InputField";
import { useRegisterUserMutation } from "generated/graphql";
import { formikErrorMap } from "utils/formikErrorMap";
import { useRouter } from "next/router";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
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
                        router.push("/");
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
