const hljs = require('highlight.js');


const portableTextToHtml = {
    marks: {
        externalLink: ({ children, value }) => {
            return `<a href="${value.href}">${children}</a>`;
        },
    },
    types: {
        codeBlock: ({ value }) => {
            const highlightedCode = hljs.highlight(
                `${value.code.code}`,
                { language: value.code.language }
            ).value

            return `<div class="code-block">
                <div class="code-block__code">
                    <span class="code-block__lang">
                        <span class="u-hidden">Language:</span>
                        ${value.code.language}
                    </span>
                    <pre>${highlightedCode}</pre>
                </div>
            </div>`
        },
        imageBlock: ({ value }) => {
            return `
                <figure class="image-block | ${value.size}">
                    <div class="image-block__frame">
                        <img src="${value.imageFile}" alt="" loading="lazy" />
                    </div>
                    ${value.text || value.credits ? `
                        <figcaption class="image-block__caption">
                            ${!value.text ? "" : `<span class="image-block__description">${value.text}</span>`}
                            ${!value.credits ? "" : `<span class="image-block__source">${value.credits}</span>`}
                        </figcaption>
                    ` : ''}
                </figure>`
        }
    }
};

module.exports = portableTextToHtml;