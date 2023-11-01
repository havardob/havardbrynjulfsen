const client = require("./_sanityClient").client;
const toHTML = require('@portabletext/to-html').toHTML;
const portableTextToHtml = require('./_portableTextToHtml');
const mql = require('@microlink/mql');
const { generateRichText, generateSlug } = require("./_utils");

const query = `*[_type == "subPage"] {
    ...,
    "parentSlug": parent -> slug.current, 
    "slug": slug.current,
    body[] { 
        ...
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