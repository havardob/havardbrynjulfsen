const client = require("./_sanityClient").client;
const { generateRichText, generateSlug } = require("./_utils");

const query = `*[_type == "subPage"] {
    ...,
    "parentSlug": parent -> slug.current, 
    "slug": slug.current,
    body[] { 
        ...,
        _type == "imageBlock" => {
            "imageFile": imageFile.asset->url,
        }, 
        markDefs[] {    
            ..., 
            _type == "internalLink" => {
                "href": internalDocument-> slug.current  
            }
        } 
    }  
}`

const getSubPageData = async function () {
    const data = await client.fetch(query);
    for (let page of data) {
        const fullSlug = await generateSlug(page._id)
        page.fullSlug = fullSlug.slug;

        if (page.body) {
            page.body = await generateRichText(page.body); 
        } 
    }

    return data;  
}

module.exports = getSubPageData();  