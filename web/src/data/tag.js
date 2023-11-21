const client = require("./_sanityClient").client;
const { generateRichText, generateSlug } = require("./_utils");

const query = `*[_type == "tag"] {
    _id,
    title, 
    "slug": slug.current,
    type
}`

const getTagPageData = async function () {
    const data = await client.fetch(query);
    
    for (let tagPage of data) {
        const fullSlug = await generateSlug(tagPage._id);
        tagPage.fullSlug = fullSlug.slug;
    }

    return data;
}
 
module.exports = getTagPageData();     