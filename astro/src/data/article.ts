import {client} from "./_sanityClient";
import mql from "@microlink/mql";
import {generateRichText, getReadingTime, formatDate} from "./_utils";
import {groqGetBody, groqGetGrandparent, groqGetSlug} from "../helpers/queries.ts";

export const getArticleData = async function () {
    const query = `*[_type == "article"] | order(publishedDate desc) { 
        _id,
        _type,
        "fullSlug": ${groqGetSlug()}, 
        "grandparent": ${groqGetGrandparent()},
        title,
        leading,
        publishedDate,
        publishedExternally {
            text, 
            href,
            image
        },
        tag -> {
            _id,
            title,
            "slug": ${groqGetSlug()}
        },
        "featuredImage": featuredImage.asset->url, 
        showAsBanner,
        "body": ${groqGetBody('body')}      
    }`

    const data = await client.fetch(query);

    for (let article of data) {

        // Get reading time
        if (article.body) {
            article.rawHtml = generateRichText(article.body);
            article.readingTime = getReadingTime(article.rawHtml);
        } else {
            article.readingTime = 1;
        }

        // Get external article with MQL
        if (article.publishedExternally) {
            const {data}: any = await mql(article.publishedExternally.href);
            article.publishedExternally.image = data.logo.url ?? '';
        }

        // Get a sortable date format and a formatted date
        if (article.publishedDate) {
            const dateForSorting = new Date(article.publishedDate);
            article.rssDate = new Date(article.publishedDate);
            article.dateForSorting = dateForSorting.getTime();
            article.publishedDate = formatDate(article.publishedDate);
        }

        let breadcrumbs = [];
        breadcrumbs.push({title: article.grandparent.title, slug: article.grandparent.slug});
        breadcrumbs.push({title: article.tag.title, slug: article.tag.slug});
        article.breadcrumbs = breadcrumbs;
    }

    return data;
}
