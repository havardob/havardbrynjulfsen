import {client} from "./_sanityClient";
import {groqGetBody} from "../helpers/queries.ts";


export const getAboutPageData = async function () {
    const query = `*[_id == "about"][0] {
        title, 
        leading,
        "profileImage": profileImage.asset -> url,
        "profileImageRaw": profileImage,
        "slug": slug.current,
        "body": ${groqGetBody('body')}
    }`

    return await client.fetch(query);
}