import { client } from "./_sanityClient";
import { generateRichText } from "./_utils";

export const getArticleArchiveData = async function () {
    const query = `*[_id == "articleArchive"][0] {
        _id,
        title,
        "slug": slug.current,
        leading
    }`
    const data = await client.fetch(query);

    if (data.leading) {
        data.leading = generateRichText(data.leading);
    }

    return data;
}
