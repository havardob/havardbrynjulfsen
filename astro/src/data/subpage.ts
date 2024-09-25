import {client} from "./_sanityClient";
import {generateRichText} from "./_utils";
import {groqGetBody} from "../helpers/queries.ts";

export const getSubPageData = async function () {
    const query = `*[_type == "subPage"] {
        title, 
        leading,
        "slug": slug.current,
        "body": ${groqGetBody()} 
    }`

    const data = await client.fetch(query);

    for (let subPage of data) {
        if (subPage.body) {
            subPage.body = generateRichText(subPage.body);
        }
    }

    return data;
}