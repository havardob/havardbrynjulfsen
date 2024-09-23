import { client } from "./_sanityClient";
import { generateRichText } from "./_utils";

export const getSubPageData = async function (slug: string) {
    const query = `*[_type == "subPage" ${slug && `&& slug.current == "${slug}"`}][0] {
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

    const data = await client.fetch(query);

    if (data.body) {
        data.body = await generateRichText(data.body);
    }

    console.log(data)

    return data;
}