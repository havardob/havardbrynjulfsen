const client = require("./_sanityClient").client;
const { generateSlug, generateRichText } = require('./_utils')

const query = `*[_type == "creation"] { 
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

const getCreationData = async function () {
    const data = await client.fetch(query);
    for (let creation of data) {
        // Get fullSlug
        const fullSlug = await generateSlug(creation._id)
        creation.fullSlug = fullSlug.slug;

        // Convert body text to html
        if (creation.body) {
            creation.body = await generateRichText(creation.body);
        } 

        // Generate tag slug 
        if (creation.tag) {
            const tag = await generateSlug(creation.tag._id)
            creation.tagSlug = tag.slug;
        }  
 
        let breadcrumbs = [];
        const grandParent = await generateSlug('creationArchive');
        breadcrumbs.push({ title: grandParent.title, slug: grandParent.slug });
        breadcrumbs.push({ title: creation.tag.title, slug: creation.tagSlug });
        creation.breadcrumbs = breadcrumbs;
    }

    return data;
}  

module.exports = getCreationData();  