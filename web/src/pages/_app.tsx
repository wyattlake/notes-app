import "../styles/globals.css";
import React from "react";
import { createClient, Provider, dedupExchange, fetchExchange } from "urql";
import { cacheExchange, QueryInput, Cache } from "@urql/exchange-graphcache";
import { env } from "process";
import {
    CurrentUserDocument,
    CurrentUserQuery,
    LoginMutation,
    RegisterMutation,
} from "generated/graphql";

//Types for update query
function updateQueryWrapper<Result, Query>(
    cache: Cache,
    queryInput: QueryInput,
    result: any,
    fn: (result: Result, query: Query) => Query
) {
    return cache.updateQuery(
        queryInput,
        (data) => fn(result, data as any) as any
    );
}

const client = createClient({
    url: "http://localhost:4000/graphql",
    fetchOptions: {
        credentials: "include",
    },
    exchanges: [
        dedupExchange,
        cacheExchange({
            updates: {
                Mutation: {
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
        fetchExchange,
    ],
});

function MyApp({ Component, pageProps }: any) {
    return (
        <Provider value={client}>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
