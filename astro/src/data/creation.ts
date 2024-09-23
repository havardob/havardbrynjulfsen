import { client } from "./_sanityClient";
import { generateSlug, generateRichText } from "./_utils";


export const getCreationData = async function (slug?: string) {
    const query = `*[_type == "creation" ${slug && `&& slug.current == "${slug}"`}][0] { 
        _id,
        title,
        tagline,
        leading,
        tag ->,
        "featuredImage": featuredImage.asset->url, 
        showAsBanner,
        "tagSlug": tag -> slug.current, 
        "tagTitle": tag -> title, 
        "slug": slug.current, 
        detailsList[] {      
            ...,  
        }, 
        body[] {  
            ..., 
            _type == "imageBlock" => {
                ...,
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

    // Get fullSlug
    const fullSlug = await generateSlug(data._id)
    data.fullSlug = fullSlug.slug;

    // Convert body text to html
    if (data.body) {
        data.body = await generateRichText(data.body);
    }

    // Generate tag slug 
    if (data.tag) {
        const tag = await generateSlug(data.tag._id)
        data.tagSlug = tag.slug;
    }

    let breadcrumbs = [];
    const grandParent = await generateSlug('creationArchive');
    breadcrumbs.push({ title: grandParent.title, slug: grandParent.slug });
    breadcrumbs.push({ title: data.tag.title, slug: data.tagSlug });
    data.breadcrumbs = breadcrumbs;

    return data;
} 