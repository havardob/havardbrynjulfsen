import {client} from "./_sanityClient";
import mql from "@microlink/mql";
import {generateSlug, generateRichText, getReadingTime, formatDate} from "./_utils";

export const getArticleData = async function () {
    const query = `*[_type == "article"] { 
        _id,
        title,
        leading,
        publishedDate,
        publishedExternally,
        tag -> {
            _id,
            title,
            "slug": slug.current
        },
        "featuredImage": featuredImage.asset->url, 
        showAsBanner,
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

    const data = await client.fetch(query);

    for (let result of data) {
        // Get fullSlug
        const fullSlug = await generateSlug(result._id)
        result.fullSlug = fullSlug.slug;

        // Convert body text to html
        if (result.body) {
            result.body = await generateRichText(result.body);
            result.readingTime = getReadingTime(result.body);
        } else {
            result.readingTime = 1;
        }

        // Get external result with MQL
        if (result.publishedExternally) {
            const {data}: any = await mql(result.publishedExternally.href);
            result.publishedExternally.image = data.logo.url;
        }

        // Get a sortable date format and a formatted date
        if (result.publishedDate) {
            const dateForSorting = new Date(result.publishedDate);
            const rssDate = new Date(result.publishedDate);
            result.rssDate = rssDate;
            result.dateForSorting = dateForSorting.getTime();
            result.publishedDate = formatDate(result.publishedDate);
        }

        // Generate tag slug
        if (result.tag) {
            const tagSlugData = await generateSlug(result.tag._id)
            result.tag.slug = tagSlugData.slug;
        }

        let breadcrumbs = [];
        const grandParent = await generateSlug('articleArchive');
        breadcrumbs.push({title: grandParent.title, slug: grandParent.slug});
        breadcrumbs.push({title: result.tag.title, slug: result.tag.slug});
        result.breadcrumbs = breadcrumbs;
    }

    return data;
}
