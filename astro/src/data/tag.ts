import {client} from "./_sanityClient";
import {groqGetSlug} from "../helpers/queries.ts";

export const getTagPageData = async function () {
    const query = `*[_type == "tag"] {
        _id,
        title,
        "fullSlug": ${groqGetSlug()},
        type,
        "parent": select(
            type == "creation" => *[_id == "creationArchive"][0] { title, "slug": "/" + slug.current },
            type == "article" =>  *[_id == "articleArchive"][0] { title, "slug": "/" + slug.current },
            null
        )
    }`

    const data = await client.fetch(query);

    for (let tagPage of data) {
        let breadcrumbs = [];
        breadcrumbs.push({title: tagPage.parent.title, slug: tagPage.parent.slug});
        tagPage.breadcrumbs = breadcrumbs;
    }

    return data;
}   