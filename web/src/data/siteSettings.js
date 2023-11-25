const { generateSlug } = require("./_utils");

const client = require("./_sanityClient").client;

const query = `*[_id == "siteSettings"][0]{
    metaTitle,
    metaDescription,
    "metaImageUrl": metaImage.asset->url,
    mainNav[] {
        ...,
        internalDocument {
            ...
        }
    },
    someLinks[] {
        isExternal,
        label,
        icon,
        isExternal,
        href,
        internalDocument {
            ... 
        }
    }, 
    footerNav[] {
        ...,
        internalDocument {
            ...
        }
    }, 
    topBanner
}`

const getSiteSettingsData = async function() {
    const data = await client.fetch(query);
    for (let link of data.mainNav) { 
        if (link._type == "internalLink") {
            const internalLink = await generateSlug(link.internalDocument._ref);
            link.href = internalLink.slug
        }
    } 

    for (let link of data.someLinks) {
        if (!link.isExternal) {
            const internalLink = await generateSlug(link.internalDocument._ref);
            link.href = internalLink.slug
        }
    }

    for (let link of data.footerNav) {
        if (link._type == "internalLink") {
            const internalLink = await generateSlug(link.internalDocument._ref);
            link.href = internalLink.slug
        }
    }
    return data; 
} 

module.exports = getSiteSettingsData();