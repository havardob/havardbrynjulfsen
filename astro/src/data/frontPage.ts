import { client } from "./_sanityClient";
import {groqGetBody, groqGetSlug} from "../helpers/queries.ts";

const query = `*[_id == "frontPage"][0] {
    ...,
    hero { 
        title, 
        "intro": ${groqGetBody('intro')}
    },
    creations {
        title, 
        items[]-> {
            _id
        },
        moreLink {
            ...,
            internalDocument-> { ..., "href": ${groqGetSlug()} }
        }
    },
    articles { 
        title, 
        items[]-> { 
            _id
        },
        moreLink {
            ...,
            internalDocument-> { ..., "href": ${groqGetSlug()} }
        }
    } 
}`

export const getFrontPageData = async function () {
    const frontPage = await client.fetch(query);

    if (frontPage.creations.moreLink) {
        if (!frontPage.creations.moreLink.isExternal) {
            frontPage.creations.moreLink.href = frontPage.creations.moreLink.internalDocument.href;
        }
    }

    if (frontPage.articles.moreLink) {
        if (!frontPage.articles.moreLink.isExternal) {
            frontPage.articles.moreLink.href = frontPage.articles.moreLink.internalDocument.href;
        }
    }

    return frontPage;
} 