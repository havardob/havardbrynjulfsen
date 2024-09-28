import { client } from "./_sanityClient";
import { generateRichText } from "./_utils";
import {groqGetBody} from "../helpers/queries.ts";


export const getAboutPageData = async function () {
    const query = `*[_id == "about"][0] {
        title, 
        leading,
        "profileImage": profileImage.asset -> url,
        "slug": slug.current,
        "body": ${groqGetBody('body')}
    }`

    const data = await client.fetch(query);

    if (data.body !== undefined) {
        data.body = generateRichText(data.body);
    }

    return data;

}