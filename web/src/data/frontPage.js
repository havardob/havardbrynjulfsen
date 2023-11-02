const client = require("./_sanityClient").client;
const { generateRichText, generateSlug } = require('./_utils')


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
    articles {
        title, 
        items[] {
            ...,
        },
        moreLink {
            ...,
            internalDocument {
                ...
            }
        }
    } 
}` 

const getFrontPageData = async function () {
    const data = await client.fetch(query);
    if (data.hero.intro !== undefined) {
        data.hero.intro = generateRichText(data.hero.intro);
    }

    if (data.articles.moreLink) {
        const moreLink = await generateSlug(data.articles.moreLink.internalDocument._ref);
        data.articles.moreLink.href = moreLink.slug;
    }

    console.log(data.articles.moreLink);
    return data;
} 

module.exports = getFrontPageData();
