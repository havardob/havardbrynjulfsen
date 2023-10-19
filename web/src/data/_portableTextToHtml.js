const mql = require('@microlink/mql');
const portableTextToHtml = async function () {
    return {
        marks: {
            externalLink: ({ children, value }) => {
                return `<a href="${value.href}">${children}</a>`;
            },
        },
        types: {
            callout: async ({ value }) => {
                const text = value.text;
                const href = value.href;
                const image = "";
                return `
                    <div class="[ cq--callout ]">
                        <a href="${href}" class="callout">
                            <img src="${image}" class="callout__image" />
                            <span class="callout__text">${text}</span>
                        </a>
                    </div>
            `
            }
        }
    };
}


const getMetadataFromSite = async function (url) {
    const { data } = await mql(url)
    return data.logo.url;
}

module.exports = portableTextToHtml;