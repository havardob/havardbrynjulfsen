import {client} from "./_sanityClient";
import {groqGetBody, groqGetGrandparent, groqGetSlug} from "../helpers/queries.ts";


export const getCreationData = async function () {
    const query = `*[_type == "creation"] { 
        _id,
        _type,
        title,
        "fullSlug": ${groqGetSlug()}, 
        "grandparent": ${groqGetGrandparent()},       
        tagline,
        leading,
        tag -> {
            _id,
            title,
            "slug": ${groqGetSlug()}
        },
        "featuredImage": featuredImage.asset->url, 
        showAsBanner, 
        detailsList[] {      
            ...,  
        }, 
        "body": ${groqGetBody('body')}
    }`

    const result = await client.fetch(query);

    for (let creation of result) {
        let breadcrumbs = [];
        breadcrumbs.push({title: creation.grandparent.title, slug: creation.grandparent.slug});
        if (creation.tag.title) {
            breadcrumbs.push({title: creation.tag.title, slug: creation.tag.slug});
        }
        creation.breadcrumbs = breadcrumbs;
    }
    return result;
} 
