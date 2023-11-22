const client = require("./_sanityClient").client;
const toHTML = require('@portabletext/to-html').toHTML;
const portableTextToHtml = require('./_portableTextToHtml');
const mql = require('@microlink/mql');
const { generateRichText } = require("./_utils");

const query = `*[_id == "about"][0] {
    ...,
    "profileImage": profileImage.asset -> url,
    "parentSlug": parent -> slug.current, 
    "slug": slug.current,
}`  


const getAboutPageData = async function () {
    const data = await client.fetch(query);
    if (data.body !== undefined) {
        data.body = generateRichText(data.body);
    } 

    return data;
 
}

module.exports = getAboutPageData(); 