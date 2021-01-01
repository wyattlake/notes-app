import { QueryInput, Cache } from "@urql/exchange-graphcache";

//Types for update query
export function updateQueryWrapper<Result, Query>(
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
