import { client } from "./_sanityClient";
import { generateRichText } from "./_utils";

export const getCreationArchiveData = async function () {
    const query = `*[_id == "creationArchive"][0] {
        _id,
        title,
        "slug": slug.current,
        leading,
        creationList[]-> {
            ...,
            "slug": slug.current
        }
    }`
    const data = await client.fetch(query);

    if (data.leading) {
        data.leading = generateRichText(data.leading);
    }

    return data;
}