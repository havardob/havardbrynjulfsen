import { client } from "./_sanityClient";
import { generateSlug } from "./_utils";

export const getTagPageData = async function (slug: string) {
    const query = `*[_type == "tag" ${slug && `&& slug.current == "${slug}"`}][0] {
        _id,
        title, 
        "slug": slug.current,
        type
    }`

    const data = await client.fetch(query);

    let breadcrumbs = [];
    let parentType = "articleArchive";

    if (data.type === "creation") {
        parentType = "creationArchive";
    }

    const parent = await generateSlug(parentType);
    breadcrumbs.push({ title: parent.title, slug: parent.slug });
    data.breadcrumbs = breadcrumbs;

    return data;
}   