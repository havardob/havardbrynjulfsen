import { client } from "./_sanityClient";
import mql from "@microlink/mql";
import { generateSlug, generateRichText, getReadingTime, formatDate } from "./_utils";


export const getArticleData = async function (slug?: string) {
    const query = `*[_type == "article" ${slug && `&& slug.current == "${slug}"`}][0] { 
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

    const result = await client.fetch(query);
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
        const { data }: any = await mql(result.publishedExternally.href);
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
        const tag = await generateSlug(result.tag._id)
        result.tagSlug = tag.slug;
    }

    let breadcrumbs = [];
    const grandParent = await generateSlug('articleArchive');
    breadcrumbs.push({ title: grandParent.title, slug: grandParent.slug });
    breadcrumbs.push({ title: result.tag.title, slug: result.tagSlug });
    result.breadcrumbs = breadcrumbs;

    return result;
} 