import {client} from "./_sanityClient";
import {generateRichText, generateSlug} from "./_utils";

export const getCreationArchiveData = async function () {
    const query = `*[_id == "creationArchive"][0] {
        _id,
        title,
        "slug": slug.current,
        leading,
        creationList[]-> {
            _id,
            title,
            tagline,
            leading,
            tag -> {
                title,
                "slug": slug.current
            },
            "featuredImage": featuredImage.asset->url, 
        }
    }`
    const data = await client.fetch(query);

    if (data.leading) {
        data.leading = generateRichText(data.leading);
    }

    if (data.creationList) {
        for (const item of data.creationList) {
            item.fullSlug = await generateSlug(item._id);
        }
    }

    return data;
}