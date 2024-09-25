import {client} from "./_sanityClient";
import {formatDate, generateRichText, generateSlug, getReadingTime} from "./_utils";
import mql from "@microlink/mql";

export const getArticleArchiveData = async function () {
    const query = `*[_id == "articleArchive"][0] {
        _id,
        title,
        "slug": slug.current,
        leading,
        "articles":
        *[_type == "article"] | order(publishedDate desc) {
            _id,
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
                "slug": slug.current
            },
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
        }
    }`

    const data = await client.fetch(query);

    if (data.leading) {
        data.leading = generateRichText(data.leading);
    }

    for (let article of data.articles) {
        const slugData = await generateSlug(article._id);
        article.fullSlug = slugData.slug;
        article.readingTime = 1;
        if (article.body) {
            article.body = generateRichText(article.body);
            article.readingTime = getReadingTime(article.body);
        }

        if (article.publishedDate) {
            article.publishedDate = formatDate(article.publishedDate);
        }

        if (article.publishedExternally) {
            const {data}: any = await mql(article.publishedExternally.href);
            article.publishedExternally.image = data.logo.url;
        }

        if (article.tag) {
            const tagSlugData = await generateSlug(article.tag._id)
            article.tag.slug = tagSlugData.slug;
        }
    }

    return data;
}
