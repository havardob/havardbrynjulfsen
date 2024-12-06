import hljs from "highlight.js";

export const portableTextToHtml = {
    marks: {
        externalLink: ({ children, value }: any) => {
            return `<a href="${value.href}">${children}</a>`;
        },
        internalLink: ({ children, value }: any) => {
            return `<a href="${value.href}">${children}</a>`;
        },
    },
    types: {
        horizontalRule: ({ value }: any) => {
            return `
                <hr class="${value.isDashed ? 'dashed' : ''}" />
            `
        },
        codeBlock: ({ value }: any) => {
            const highlightedCode = hljs.highlight(
                `${value.code.code}`,
                { language: value.code.language }
            ).value


            return `<div class="code-block ${value.size}">
                <span class="code-block__lang">
                    <span class="u-hidden">Language:</span>
                    ${value.altTitle ? value.altTitle : value.code.language}
                </span>
                <div class="code-block__code">
                    <pre>${highlightedCode}</pre> 
                </div>
            </div>`
        },
        imageBlock: ({ value }: any) => {
            return `
                <figure class="image-block | ${value.size}">
                    <div class="image-block__frame"> 
                        <img src="${value.imageFile}" alt="" loading="lazy" class="${value.hasBorder && "has-border"}" data-dialog-trigger />
                        <dialog class="image-dialog">
                            <figure>
                                <img src="${value.imageFile}" alt="" />
                                <button class="image-dialog__close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24""><path fill="currentColor" d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path></svg>
                                </button>
                                ${value.text || value.credits ? `
                                    <figcaption>
                                        ${!value.text ? "" : `<span>${value.text}</span>`}
                                        ${!value.credits ? "" : `<span><span class="u-hidden">Credit:</span>${value.credits}</span>`}
                                    </figcaption>
                                ` : ''}
                            </figure>
                        </dialog>
                    </div>
                    ${value.text || value.credits ? `
                        <figcaption class="image-block__caption">
                            ${!value.text ? "" : `<span class="image-block__description">${value.text}</span>`}
                            ${!value.credits ? "" : `<span class="image-block__source"><span class="u-hidden">Credit:</span>${value.credits}</span>`}
                        </figcaption>
                    ` : ''}
                </figure>`
        },
        embedBlock: ({ value }: any) => {
            return `
                <div class="embed-block ${value.size}">
                    ${value.code}
                </div>
            `
        },
        reviewBlock: () => {
            return ''
        },
        baselineBlock: () => {
            return ''
        }
    }
};

