import {
    LogoutMutation,
    CurrentUserQuery,
    CurrentUserDocument,
    LoginMutation,
    RegisterMutation,
} from "generated/graphql";
import { dedupExchange, fetchExchange } from "urql";
import { updateQueryWrapper } from "./updateQueryWrapper";
import { cacheExchange } from "@urql/exchange-graphcache";

//Creates an urql client with specified ssrExchange
export const createUrqlClient = (ssrExchange: any) => ({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
        credentials: "include" as const,
    },
    exchanges: [
        dedupExchange,
        cacheExchange({
            updates: {
                Mutation: {
                    logout: (_result, args, cache, info) => {
                        updateQueryWrapper<LogoutMutation, CurrentUserQuery>(
                            cache,
                            {
                                query: CurrentUserDocument,
                            },
                            _result,
                            () => ({
                                //Sets the current user to null
                                currentUser: null,
                            })
                        );
                    },
                    login: (_result, args, cache, info) => {
                        updateQueryWrapper<LoginMutation, CurrentUserQuery>(
                            cache,
                            {
                                query: CurrentUserDocument,
                            },
                            _result,
                            (result, query) => {
                                //Updates the current user on a successful login
                                if (result.login.errors) {
                                    return query;
                                } else {
                                    return {
                                        currentUser: result.login.user,
                                    };
                                }
                            }
                        );
                    },
                    register: (_result, args, cache, info) => {
                        updateQueryWrapper<RegisterMutation, CurrentUserQuery>(
                            cache,
                            {
                                query: CurrentUserDocument,
                            },
                            _result,
                            (result, query) => {
                                //Updates the current user on a successful register
                                if (result.register.errors) {
                                    return query;
                                } else {
                                    return {
                                        currentUser: result.register.user,
                                    };
                                }
                            }
                        );
                    },
                },
            },
        }),
        ssrExchange,
        fetchExchange,
    ],
});
