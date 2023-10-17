const portableTextToHtml = {
    marks: {
        externalLink: ({ children, value }) => {
            return `<a href="${value.href}">${children}</a>`;
        },
    },
    types: {

    }
};

module.exports = portableTextToHtml;