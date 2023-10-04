export const externalLinkUrl = {
    title: "Website address (URL)",
    description: "Paste in or write the website's URL that you want to link to. Remember to add 'http://' or 'https://' at the beginning",
    name: "href",
    type: "url",
    validation: (Rule: any) => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel', '#']
    })
}

export const internalLinkRef = {
    title: "Internal Document",
    description: "Choose the internal document you want to link to",
    name: "internalDocument",
    type: "reference",
    to: [{type: "article"}],
    options: {
        disableNew: true,
    }
}

