const client = require("./_sanityClient").client;
const toHTML = require('@portabletext/to-html').toHTML;
const portableTextToHtml = require('./_portableTextToHtml');

const query = `*[_id == "articleArchive"] {
    _id,
    title,
    "slug": slug.current,
    leading
}[0]` 
 
const getArticleArchiveData = async function () {
    const data = await client.fetch(query);

    if (data.leading) {
        data.leading = toHTML(data.leading, { components: portableTextToHtml });
    }

    return data;  
}

module.exports = getArticleArchiveData();  