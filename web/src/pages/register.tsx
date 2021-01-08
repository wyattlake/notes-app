import React from "react";
import { Form, Formik } from "formik";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "components/InputField";
import { useRegisterMutation } from "generated/graphql";
import { formikErrorMap } from "utils/formikErrorMap";
import { useRouter } from "next/router";
import { Navbar } from "components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "utils/createUrqlClient";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    const [, register] = useRegisterMutation();
    return (
        <>
            <Navbar />
            <Wrapper variant="small">
                <h1>Register</h1>
                <Formik
                    initialValues={{ username: "", email: "", password: "" }}
                    onSubmit={async (values, { setErrors }) => {
                        console.log(values);
                        const response = await register({ options: values });
                        console.log(response);
                        if (response.data?.register.errors) {
                            setErrors(
                                formikErrorMap(response.data.register.errors)
                            );
                        } else if (response.data?.register.user) {
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
        </>
    );
};

export default withUrqlClient(createUrqlClient)(Register);
