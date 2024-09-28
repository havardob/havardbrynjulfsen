import {client} from "./_sanityClient";
import {generateRichText} from "./_utils";
import {groqGetBody} from "../helpers/queries.ts";

export const getArticleArchiveData = async function () {
    const query = `*[_id == "articleArchive"][0] {
        _id,
        title,
        "slug": slug.current,
        "leading": ${groqGetBody('leading')}   
    }`

    let data = await client.fetch(query);

    if (data.leading) {
        data.leading = generateRichText(data.leading);
    }

    return data;
}
