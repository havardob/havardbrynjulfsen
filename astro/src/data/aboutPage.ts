import { client } from "./_sanityClient";
import { generateRichText } from "./_utils";


export const getAboutPageData = async function () {
    const query = `*[_id == "about"][0] {
        ...,
        "profileImage": profileImage.asset -> url,
        "parentSlug": parent -> slug.current, 
        "slug": slug.current,
    }`

    const data = await client.fetch(query);
    if (data.body !== undefined) {
        data.body = generateRichText(data.body);
    }

    return data;

}