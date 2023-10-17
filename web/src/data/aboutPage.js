const client = require("./_sanityClient").client;
const toHTML = require('@portabletext/to-html').toHTML;
const portableTextToHtml = require('./_portableTextToHtml');

const query = `*[_id == "about"][0] {
    ...,
    "profileImage": profileImage.asset -> url 
}`  


const getAboutPageData = async function () {
    const data = await client.fetch(query);
    if (data.body) {
        data.body = toHTML(data.body, { components: portableTextToHtml });
    }

    console.log(data);
    return data;  
 
}

module.exports = getAboutPageData();