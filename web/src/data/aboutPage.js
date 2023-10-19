const client = require("./_sanityClient").client;
const toHTML = require('@portabletext/to-html').toHTML;
const portableTextToHtml = require('./_portableTextToHtml');
const mql = require('@microlink/mql');

const query = `*[_id == "about"][0] {
    ...,
    "profileImage": profileImage.asset -> url,
    "parentSlug": parent -> slug.current, 
    "slug": slug.current,
}`  


const getAboutPageData = async function () {
    const data = await client.fetch(query);
    if (data.body) {
        data.body = toHTML(data.body, { components: portableTextToHtml });
    }
    const calloutImageData = await mql(data.callout.href);
    console.log(calloutImageData.data);
    data.callout.image = calloutImageData.data.logo.url;
    data.fullSlug = data.parentSlug + "/" + data.slug;
    return data;   
 
}

module.exports = getAboutPageData();