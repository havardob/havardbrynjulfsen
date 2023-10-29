const client = require("./_sanityClient").client;
const toHTML = require('@portabletext/to-html').toHTML;
const portableTextToHtml = require('./_portableTextToHtml');
const mql = require('@microlink/mql');

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
        if (page.body) {
            page.body = toHTML(page.body, { components: portableTextToHtml });
        }


        if (page.parentSlug) {
            page.fullSlug = page.parentSlug + "/" + page.slug;
        } else {
            page.fullSlug = page.slug;
        }
    }

    return data; 
}

module.exports = getSubPageData(); 