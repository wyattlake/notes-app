import React from "react";
import { Form, Formik } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "components/InputField";
import { useLoginMutation } from "generated/graphql";
import { formikErrorMap } from "utils/formikErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "utils/createUrqlClient";

interface loginProps {}

export const Login: React.FC<loginProps> = ({}) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
        <Wrapper variant="small">
            <h1>Login</h1>
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    console.log(values);
                    const response = await login({ options: values });
                    console.log(response);
                    if (response.data?.login.errors) {
                        setErrors(formikErrorMap(response.data.login.errors));
                    } else if (response.data?.login.user) {
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

export default withUrqlClient(createUrqlClient)(Login);
