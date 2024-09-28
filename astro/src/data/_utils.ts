import { toHTML } from '@portabletext/to-html';
import { portableTextToHtml } from './_portableTextToHtml';
import { client } from './_sanityClient';


export const generateSlug = async function (id: string) {
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

    return await client.fetch(query);
}

export const formatDate = function (date: any) {
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

export const getReadingTime = function (bodyText: any) {
    const text = bodyText;
    const wpm = 265;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);

    return time;
}

export function generateRichText(source: any) {
    if (source) {
        for (let block of source) {
            if (block.markDefs) {
                for (let mark of block.markDefs) {
                    if (mark.internalDocument) {
                        mark.href = mark.internalDocument.href;
                    }
                }
            }
        }  
        return toHTML(source, { components: portableTextToHtml });
    } else {
        return;
    }
}