const client = require("./_sanityClient").client;
const toHTML = require('@portabletext/to-html').toHTML;
const portableTextToHtml = require('./_portableTextToHtml');
const mql = require('@microlink/mql');

const query = `*[_type == "article"] { 
    ...,
    tag ->,
    "featuredImage": featuredImage.asset->url,
    "tagSlug": tag -> slug.current, 
    "slug": slug.current,
    body[] {
        ...,
        _type == "imageBlock" => {
            "imageFile": imageFile.asset->url,
        },
    } 
}`

const getReadingTime = function (bodyText) {
    const text = bodyText;
    const wpm = 265;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm); 

    return time;    
}   


const getArticleData = async function () {
    const data = await client.fetch(query); 
    for (let article of data) {
        if (article.body) {
            article.body = toHTML(article.body, { components: portableTextToHtml });
            article.readingTime = getReadingTime(article.body);
        }

        if (article.tagSlug) {
            article.fullSlug = article.tagSlug + "/" + article.slug;
        } else {
            article.fullSlug = article.slug;  
        }
    }  
    console.log(data); 
    return data; 
}

module.exports = getArticleData();  