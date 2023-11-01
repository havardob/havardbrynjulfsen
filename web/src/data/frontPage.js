const client = require("./_sanityClient").client;
const { generateRichText } = require('./_utils')


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
    }  
}` 

const getFrontPageData = async function () {
    const data = await client.fetch(query);
    if (data.hero.intro !== undefined) {
        data.hero.intro = generateRichText(data.hero.intro);
    }
    return data;
} 

module.exports = getFrontPageData();
