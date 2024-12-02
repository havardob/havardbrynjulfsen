import {client} from "./_sanityClient";
import {groqGetBody} from "../helpers/queries.ts";

export const getArticleArchiveData = async function () {
    const query = `*[_id == "articleArchive"][0] {
        _id,
        title,
        "slug": slug.current,
        "leading": ${groqGetBody('leading')}   
    }`

    return await client.fetch(query);
}
