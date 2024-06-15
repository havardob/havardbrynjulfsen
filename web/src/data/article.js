const client = require("./_sanityClient").client;
const mql = require('@microlink/mql');
const { generateSlug, formatDate, getReadingTime, generateRichText} = require('./_utils')


const query = `*[_type == "article"] { 
    _id,
    title,
    leading,
    publishedDate,
    publishedExternally,
    tag ->, 
    "featuredImage": featuredImage.asset->url, 
    showAsBanner,
    "tagSlug": tag -> slug.current, 
    "tagTitle": tag -> title, 
    "slug": slug.current, 
    body[] {  
        ..., 
        _type == "imageBlock" => {
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

const getArticleData = async function () {  
    const data = await client.fetch(query);
    for (let article of data) {
        // Get fullSlug
        const fullSlug = await generateSlug(article._id)
        article.fullSlug = fullSlug.slug;

        // Convert body text to html
        if (article.body) {
            article.body = await generateRichText(article.body);
            article.readingTime = getReadingTime(article.body);
        } else {
            article.readingTime = 1;
        }

        // Get external data with MQL
        if (article.publishedExternally) {
            const externalSiteData = await mql(article.publishedExternally.href);
            article.publishedExternally.image = externalSiteData.data.logo.url;  
        }   

        // Get a sortable date format and a formatted date
        if (article.publishedDate) {
            const dateForSorting = new Date(article.publishedDate);
            const rssDate = new Date(article.publishedDate);
            article.rssDate = rssDate;
            article.dateForSorting = dateForSorting.getTime();
            article.publishedDate = formatDate(article.publishedDate);
        }

        // Generate tag slug 
        if (article.tag) {
            const tag = await generateSlug(article.tag._id)
            article.tagSlug = tag.slug; 
        }

        let breadcrumbs = [];
        const grandParent = await generateSlug('articleArchive');
        breadcrumbs.push({ title: grandParent.title, slug: grandParent.slug});
        breadcrumbs.push({ title: article.tag.title, slug: article.tagSlug});
        article.breadcrumbs = breadcrumbs; 
    }

    return data;      
} 
 
module.exports = getArticleData();             