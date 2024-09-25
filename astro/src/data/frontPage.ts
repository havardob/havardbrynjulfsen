import mql from "@microlink/mql";
import { client } from "./_sanityClient";
import { generateSlug, generateRichText, formatDate, getReadingTime } from "./_utils";

const query = `*[_id == "frontPage"][0] {
    ...,
    hero { 
        title, 
        intro[] {
            ...,
            markDefs[] {
                ...,
                _type == "internalLink" => {
                    "href": internalDocument-> slug.current
                }
            }
        } 
    },
    creations {
        title, 
        items[]-> {
            ...,
            tag ->, 
            "featuredImage": featuredImage.asset->url, 
            showAsBanner,
            "tagSlug": tag -> slug.current, 
            "tagTitle": tag -> title, 
            "slug": slug.current
        },
        moreLink {
            ...,
            internalDocument { 
                ...
            }
        }
    },
    articles { 
        title, 
        items[]-> { 
            ...,
            tag ->, 
            "featuredImage": featuredImage.asset->url, 
            showAsBanner,
            "tagSlug": tag -> slug.current, 
            "tagTitle": tag -> title, 
            "slug": slug.current
        },
        moreLink {
            ...,
            internalDocument {
                ...
            }
        }
    } 
}`

export const getFrontPageData = async function () {
    const data = await client.fetch(query);
    if (data.hero.intro !== undefined) {
        data.hero.intro = generateRichText(data.hero.intro);
    }

    if (data.creations.moreLink) {
        const moreLink = await generateSlug(data.creations.moreLink.internalDocument._ref);
        data.creations.moreLink.href = moreLink.slug;
    }

    if (data.articles.moreLink) {
        const moreLink = await generateSlug(data.articles.moreLink.internalDocument._ref);
        data.articles.moreLink.href = moreLink.slug;
    }

    for (let article of data.articles.items) {
        const fullSlug = await generateSlug(article._id)
        article.fullSlug = fullSlug.slug;

        // Convert body text to html
        if (article.body) {
            article.body = generateRichText(article.body);
            article.readingTime = getReadingTime(article.body);
        } else {
            article.readingTime = 1;
        }

        // Get external data with MQL
        if (article.publishedExternally) {
            const { data }: any = await mql(article.publishedExternally.href);
            article.publishedExternally.image = data.logo.url;
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

        if (article.publishedDate) {
            const dateForSorting = new Date(article.publishedDate);
            const rssDate = new Date(article.publishedDate);
            article.rssDate = rssDate;
            article.dateForSorting = dateForSorting.getTime();
            article.publishedDate = formatDate(article.publishedDate);
        }
    }

    for (let creation of data.creations.items) {
        const fullSlug = await generateSlug(creation._id)
        creation.fullSlug = fullSlug.slug;

        // Generate tag slug 
        if (creation.tag) {
            const tag = await generateSlug(creation.tag._id)
            creation.tagSlug = tag.slug;
        }
    }

    return data;
} 