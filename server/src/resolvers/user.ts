import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from "type-graphql";
import argon2 from "argon2";
import { User } from "../entities/User";
import { ContextType } from "../types";
import { COOKIE_NAME } from "../constants";

//Input with username and password
@InputType()
class UsernamePasswordInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

//Input with username, email, and string
@InputType()
class FullUserInput {
    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    password: string;
}

//Error which specifies a field and an error
@ObjectType()
class FieldError {
    @Field()
    field: string;

    @Field()
    error: string;
}

//Return type which allows either a user or an Error
@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {
    //Gets the current user
    @Query(() => User, { nullable: true })
    currentUser(@Ctx() { req }: ContextType) {
        console.log(req.session.userId);
        if (!req.session.userId) {
            return null;
        }

        return User.findOne(req.session.userId);
    }

    @Query(() => [User])
    fetchUsers() {
        return User.find();
    }

    //Registers a user
    @Mutation(() => UserResponse)
    async register(
        @Ctx() { req }: ContextType,
        @Arg("options") options: FullUserInput
    ): Promise<UserResponse> {
        let user;
        //Returns if the username length is outside the 2-20 range
        if (options.username.length < 2 || options.username.length > 20) {
            return {
                errors: [
                    {
                        field: "username",
                        error: "Username must be between 2 and 20 characters",
                    },
                ],
            };
        }
        //Returns if the password length is outside the 5-30 range
        if (options.password.length < 5 || options.password.length > 30) {
            return {
                errors: [
                    {
                        field: "password",
                        error: "Password must be between 5 and 30 characters",
                    },
                ],
            };
        }
        const salt = Math.random().toString(36).substring(2, 15);
        const hashedPassword = await argon2.hash(options.password + salt);
        //Tries to create a user
        try {
            user = await User.create({
                username: options.username,
                email: options.email,
                salt: salt,
                password: hashedPassword,
            }).save();
        } catch (error) {
            switch (error.code) {
                //Duplicate field error
                case "23505":
                    if (error.detail.includes("username")) {
                        return {
                            errors: [
                                {
                                    field: "username",
                                    error: "That username is already taken",
                                },
                            ],
                        };
                    } else {
                        return {
                            errors: [
                                {
                                    field: "email",
                                    error: "That email is already taken",
                                },
                            ],
                        };
                    }
                default:
                    console.log(error.message);
                    return {
                        errors: [
                            {
                                field: "password",
                                error: "An unknown error occured",
                            },
                        ],
                    };
            }
        }

        //Logs the user in
        req.session.userId = user.id;

        return {
            user,
        };
    }

    //Logs a user in
    @Mutation(() => UserResponse)
    async login(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { req }: ContextType
    ): Promise<UserResponse> {
        const user = await User.findOne({ username: options.username });
        //Returns if no user is found
        if (!user) {
            return {
                errors: [
                    {
                        field: "username",
                        error: "User does not exist",
                    },
                ],
            };
        }
        //Validates the password
        const valid = await argon2.verify(
            user.password,
            options.password + user.salt
        );
        //Returns if the password is invalid
        if (!valid) {
            return {
                errors: [
                    {
                        field: "password",
                        error: "Invalid password",
                    },
                ],
            };
        }

        //Logs the user in
        req.session.userId = user.id;

        return {
            user,
        };
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: ContextType) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                if (err) {
                    console.log("Failed to destroy session:", err);
                    resolve(false);
                }
                res.clearCookie(COOKIE_NAME);
                resolve(true);
            })
        );
    }
}
