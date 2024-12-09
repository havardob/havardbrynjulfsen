import {
    BiCard,
    BiCheckShield,
    BiCode,
    BiCodeAlt,
    BiCodeBlock,
    BiDetail,
    BiImage,
    BiLinkAlt,
    BiLinkExternal, BiQuestionMark,
    BiReflectHorizontal, BiStar
} from "react-icons/bi";
import {externalLinkUrl, internalLinkRef} from "./linkObject";
import {descriptionList} from "./descriptionList";

export const richTextMain = {
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
        {
            title: 'Block',
            type: 'block',
            // Styles let you set what your user can mark up blocks with. These
            // correspond with HTML tags, but you can set any title or value
            // you want and decide how you want to deal with it where you want to
            // use your content.
            styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H1', value: 'h1'},
                {title: 'H2', value: 'h2'},
                {title: 'H3', value: 'h3'},
                {title: 'H4', value: 'h4'},
                {title: 'Quote', value: 'blockquote'},
            ],
            lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Number', value: 'number'}],
            // Marks let you mark up inline text in the block editor.
            marks: {
                // Decorators usually describe a single property – e.g. a typographic
                // preference or highlighting by editors.
                decorators: [
                    {title: 'Strong', value: 'strong'},
                    {title: 'Emphasis', value: 'em'},
                    {title: 'Code', value: 'code'},
                ],
                // Annotations can be any object structure – e.g. a link or a footnote.
                annotations: [
                    {
                        title: 'Internal Link',
                        name: 'internalLink',
                        icon: BiLinkAlt,
                        type: 'object',
                        fields: [
                            internalLinkRef
                        ],
                    },
                    {
                        title: 'External Link',
                        name: 'externalLink',
                        icon: BiLinkExternal,
                        type: 'object',
                        fields: [
                            externalLinkUrl
                        ],
                    },
                    {
                        title: 'Description tag',
                        name: 'descriptionTag',
                        icon: BiQuestionMark,
                        type: "object",
                        fields: [
                            {
                                title: "Text",
                                name: "text",
                                type: "text",
                                rows: 4
                            }
                        ]
                    }
                ],
            },
        },
        // You can add additional types here. Note that you can't use
        // primitive types such as 'string' and 'number' in the same array
        // as a block type.
        {
            type: "object",
            name: "horizontalRule",
            title: "HR",
            icon: BiReflectHorizontal,
            fields: [
                {
                    type: "boolean",
                    name: "isDashed",
                    title: "Dashed?",
                    initialValue: false
                }
            ],
        },
        {
            title: "Image",
            icon: BiImage,
            type: 'object',
            name: "imageBlock",
            fields: [
                {
                    title: "Image File",
                    name: "imageFile",
                    type: "image",
                    options: {hotspot: true},
                },
                {
                    title: "Text",
                    name: "text",
                    type: "text",
                    rows: 3
                },
                {
                    title: "Creditation",
                    name: "credits",
                    type: "string"
                },
                {
                    title: "Alternative Text",
                    name: "alt",
                    type: "text",
                    rows: 2,
                },
                {
                    title: "Show border",
                    name: "hasBorder",
                    type: "boolean",
                    options: {
                        layout: "checkbox"
                    },
                    initialValue: false
                },
                {
                    title: "Size",
                    name: "size",
                    type: "string",
                    options: {
                        list: [
                            {title: "Stretch", value: "stretch"},
                            {title: "Original size", value: "original"},
                            {title: "Full Bleed", value: "full-bleed"},
                        ],
                        layout: "radio"
                    },
                    initialValue: "stretch"
                }
            ]
        },
        {
            title: "Description List",
            type: "object",
            name: "descriptionListObject",
            icon: BiDetail,
            preview: {
                select: {
                    items: "descriptionList"
                },
                prepare(selection: any) {
                    const {items} = selection;
                    return {
                        title: `Description list — ${items?.length ? items.length : "0"} item(s)`,
                    }
                }
            },
            fields: [
                {
                    ...descriptionList,
                }
            ]
        },
        {
            type: "object",
            name: "codeBlock",
            title: "Code Snippet",
            icon: BiCode,
            fields: [
                {
                    title: "Code Snippet",
                    icon: BiCode,
                    type: "code",
                    name: "code",
                },
                {
                    title: "Language override",
                    name: "altTitle",
                    type: "string"
                },
                {
                    title: "Size",
                    name: "size",
                    type: "string",
                    options: {
                        list: [
                            {title: "Original size", value: "original"},
                            {title: "Full Bleed", value: "full-bleed"},
                        ],
                        layout: "radio"
                    },
                    initialValue: "original"
                }
            ]
        },
        {
            type: "object",
            name: "embedBlock",
            title: "Embed",
            icon: BiCodeBlock,
            fields: [
                {
                    title: "Embed code",
                    name: "code",
                    type: "text"
                },
                {
                    title: "Size",
                    name: "size",
                    type: "string",
                    options: {
                        list: [
                            {title: "Original size", value: "original"},
                            {title: "Full Bleed", value: "full-bleed"},
                        ],
                        layout: "radio"
                    },
                    initialValue: "original"
                }
            ]
        },
        {
            title: "Baseline Block",
            icon: BiCheckShield,
            name: "baselineBlock",
            type: "object",
            fields: [
                {
                    name: "baselineId",
                    type: "string",
                    title: "Baseline-ID"
                }
            ]
        },
        {
            title: "Review Block",
            icon: BiStar,
            name: "reviewBlock",
            type: "object",
            fields: [
                {
                    title: "Title",
                    name: "title",
                    type: "string"
                },
                {
                    title: "Subtitle",
                    name: "subtitle",
                    type: "string"
                },
                {
                    title: "Rating",
                    name: "rating",
                    type: "string",
                    initialValue: "5",
                    options: {
                        list: [
                            "0",
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10"
                        ]
                    }
                },
                {
                    title: "Image File",
                    name: "imageFile",
                    type: "image"
                },
                {
                    title: "Alternative Text",
                    name: "alt",
                    type: "text",
                    rows: 2
                },
                {
                    title: "Info",
                    name: "info",
                    type: "text",
                    rows: 3
                },
                {
                    title: "Link",
                    name: "link",
                    type: "object",
                    fields: [
                        {
                            title: "Text",
                            name: "text",
                            type: "string"
                        },
                        {
                            title: "URL",
                            name: "href",
                            type: "url"
                        }]
                }
            ]
        }
    ],
}


export const richTextSimple = {
    title: 'Block Content',
    name: 'blockContent',
    type: 'array',
    of: [
        {
            title: 'Block',
            type: 'block',
            // Styles let you set what your user can mark up blocks with. These
            // correspond with HTML tags, but you can set any title or value
            // you want and decide how you want to deal with it where you want to
            // use your content.
            styles: [
                {title: 'Normal', value: 'normal'},
                {title: 'H1', value: 'h1'},
                {title: 'H2', value: 'h2'},
                {title: 'H3', value: 'h3'},
                {title: 'H4', value: 'h4'},
                {title: 'Quote', value: 'blockquote'},
            ],
            lists: [],
            // Marks let you mark up inline text in the block editor.
            marks: {
                // Decorators usually describe a single property – e.g. a typographic
                // preference or highlighting by editors.
                decorators: [
                    {title: 'Strong', value: 'strong'},
                    {title: 'Emphasis', value: 'em'},
                ],
                // Annotations can be any object structure – e.g. a link or a footnote.
                annotations: [
                    {
                        title: 'Internal Link',
                        name: 'internalLink',
                        icon: BiLinkAlt,
                        type: 'object',
                        fields: [
                            internalLinkRef
                        ],
                    },
                    {
                        title: 'External Link',
                        name: 'externalLink',
                        icon: BiLinkExternal,
                        type: 'object',
                        fields: [
                            externalLinkUrl
                        ],
                    },
                ],
            },

        }
    ]
}
