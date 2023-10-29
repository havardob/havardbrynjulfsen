const client = require("./_sanityClient").client;
const toHTML = require('@portabletext/to-html').toHTML;
const portableTextToHtml = require('./_portableTextToHtml');
const mql = require('@microlink/mql');

const generateSlug = async function (id) {
    const query = `*[_id == "${id}"][0] {
        title,
        "slug": slug.current,
        _type == "article" => {
            "slug": *[_type == "articleArchive"]{ "slug": slug.current }[0].slug + "/" + tag -> slug.current + "/" + slug.current
        },
        _type == "creation" => {
            "slug": *[_type == "creationArchive"]{ "slug": slug.current }[0].slug + "/" + tag -> slug.current + "/" + slug.current
        },
        _type == "subPage" => {
            "slug": slug.current
        },
        _type == "tag" => {
            type == "article" => {
                "slug": *[_type == "articleArchive"]{ "slug": slug.current }[0].slug + "/" + slug.current
            },
            type == "creation" => {
                "slug": *[_type == "creationArchive"]{ "slug": slug.current }[0].slug + "/" + slug.current
            },
        }
    }` 

    const data = await client.fetch(query);
    console.log(data);
    return data;
}

const query = `*[_type == "article"] { 
    _id,
    title,
    leading,
    publishedDate,
    publishedExternally,
    tag ->,
    "featuredImage": featuredImage.asset->url,
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

const formatDate = function (date) {
    const tempDate = new Date(date);
    const day = tempDate.getDate();
    const month = tempDate.getMonth();
    const year = tempDate.getFullYear();

    const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]

    const newDate = `${monthNames[month]} ${day}, ${year}`;

    return newDate;
}

const getReadingTime = function (bodyText) {
    const text = bodyText;
    const wpm = 265;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);

    return time; 
}

const generateRichText = async function (source) {
    if (source) {
        for (let block of source) {
            if (block.markDefs) {
                for (let mark of block.markDefs) {
                    if (mark.internalDocument) {
                        const document = await generateSlug(mark.internalDocument._ref);
                        mark.href = document.slug;
                    }
                }
            }
        }
        return source = toHTML(source, { components: portableTextToHtml });
    }
}


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