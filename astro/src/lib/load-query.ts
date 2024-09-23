// ./src/sanity/lib/load-query.ts
import { type QueryParams } from "@sanity/client";
import { client } from "../data/_sanityClient";

export async function loadQuery<QueryResponse>({ query, params }: {
    query: string;
    params?: QueryParams;
}) {
    const { result } = await client.fetch<QueryResponse>(
        query,
        params ?? {},
        { filterResponse: false }
    );

    return {
        data: result,
    };
}