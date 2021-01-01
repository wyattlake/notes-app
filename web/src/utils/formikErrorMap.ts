import { FieldError } from "generated/graphql";

export const formikErrorMap = (errors: FieldError[]) => {
    const errorMap: Record<string, string> = {};
    errors.forEach(({ field, error }) => {
        errorMap[field] = error;
    });

    return errorMap;
};
