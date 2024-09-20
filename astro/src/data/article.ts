import { client } from "./_sanityClient";
import mql from "@microlink/mql";
import { generateSlug, generateRichText, getReadingTime, formatDate } from "./_utils";


export const getArticleData = async function (slug: any) {
    const query = `*[_type == "article" && slug.current == "${slug}"][0] { 
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

    const data = await client.fetch(query);
    // Get fullSlug
    const fullSlug = await generateSlug(data._id)
    data.fullSlug = fullSlug.slug;

    // Convert body text to html
    if (data.body) {
        data.body = await generateRichText(data.body);
        data.readingTime = getReadingTime(data.body);
    } else {
        data.readingTime = 1;
    }

    // Get external data with MQL
    if (data.publishedExternally) {
        const externalSiteData = await mql(data.publishedExternally.href);
        data.publishedExternally.image = externalSiteData.data.logo.url;
    }

    // Get a sortable date format and a formatted date
    if (data.publishedDate) {
        const dateForSorting = new Date(data.publishedDate);
        const rssDate = new Date(data.publishedDate);
        data.rssDate = rssDate;
        data.dateForSorting = dateForSorting.getTime();
        data.publishedDate = formatDate(data.publishedDate);
    }

    // Generate tag slug 
    if (data.tag) {
        const tag = await generateSlug(data.tag._id)
        data.tagSlug = tag.slug;
    }

    let breadcrumbs = [];
    const grandParent = await generateSlug('articleArchive');
    breadcrumbs.push({ title: grandParent.title, slug: grandParent.slug });
    breadcrumbs.push({ title: data.tag.title, slug: data.tagSlug });
    data.breadcrumbs = breadcrumbs;

    return data;
} 