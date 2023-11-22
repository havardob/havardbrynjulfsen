const client = require("./_sanityClient").client;
const toHTML = require('@portabletext/to-html').toHTML;
const portableTextToHtml = require('./_portableTextToHtml');

const query = `*[_id == "creationArchive"] {
    _id,
    title,
    "slug": slug.current,
    leading,
    creationList[] {
        ...
    }
}[0]` 

const getCreationArchiveData = async function () {
    const data = await client.fetch(query);

    if (data.leading) {
        data.leading = toHTML(data.leading, { components: portableTextToHtml });
    }

    console.log(data.creationList[1]);

    return data; 
}

module.exports = getCreationArchiveData();     