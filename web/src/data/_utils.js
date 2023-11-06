const toHTML = require('@portabletext/to-html').toHTML;
const portableTextToHtml = require('./_portableTextToHtml');
const client = require("./_sanityClient").client;

const generateSlug = async function (id) {
    const query = `*[_id == "${id}"][0] {
        title,
        "slug":  "/" + slug.current,
        _type == "frontPage" => {
            "slug":  "/",
        },
        _type == "article" => {
            "slug": "/" + *[_type == "articleArchive"]{ "slug": slug.current }[0].slug + "/" + tag -> slug.current + "/" + slug.current
        },
        _type == "creation" => {
            "slug": "/" + *[_type == "creationArchive"]{ "slug": slug.current }[0].slug + "/" + tag -> slug.current + "/" + slug.current
        },
        _type == "subPage" => {
            "slug": "/" + slug.current
        }, 
        _type == "tag" => {
            type == "article" => {
                "slug": "/" + *[_type == "articleArchive"]{ "slug": slug.current }[0].slug + "/" + slug.current
            },
            type == "creation" => {
                "slug": "/" + *[_type == "creationArchive"]{ "slug": slug.current }[0].slug + "/" + slug.current
            },
        }
    }`

    const data = await client.fetch(query);
    return data;
}

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

module.exports = { generateSlug, formatDate, getReadingTime, generateRichText }; 