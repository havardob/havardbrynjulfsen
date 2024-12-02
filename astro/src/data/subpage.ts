import {client} from "./_sanityClient";
import {groqGetBody} from "../helpers/queries.ts";

export const getSubPageData = async function () {
    const query = `*[_type == "subPage"] {
        title, 
        leading,
        "slug": slug.current,
        "body": ${groqGetBody('body')} 
    }`

    return await client.fetch(query);
}