import React from "react";
import { Form, Formik } from "formik";
import { Wrapper } from "../components/Wrapper";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
    return (
        <Wrapper variant="small">
            <h1>Register</h1>
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {(values, handleChange) => (
                    <Form>
                        <input
                            value={values.username}
                            onChange={handleChange}
                            type="text"
                            name="name"
                            className="stretch-form"
                        />
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Register;
