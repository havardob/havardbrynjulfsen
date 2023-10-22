import { BiHome } from "react-icons/bi";
import { externalLinkUrl, internalLinkRef } from "./templates/linkObject";
import { richTextSimple } from "./templates/richText";

export default {
    name: 'frontPage',
    title: 'Forside',
    icon: BiHome,
    type: 'document',
    fields: [
        {
            title: "Page Title",
            name: "title",
            type: "string",
            initialValue: "Forsiden",
        },
        {
            title: "Hero",
            name: "hero",
            type: "object",
            fields: [
                {
                    title: "Heading",
                    name: "title",
                    type: "text",
                    rows: 2
                },
                {
                    ...richTextSimple,
                    title: "Intro",
                    name: "intro",
                }
            ]
        },
        {
            title: "Creations Section",
            name: "creations",
            type: "object",
            fields: [
                {
                    title: "Heading",
                    name: "title",
                    type: "string",
                },
                {
                    title: "Featured Creations",
                    name: "items",
                    type: "array",
                    of: [
                        {
                            title: "Creation",
                            type: "reference",
                            to: [{ type: "creation"}]
                        }
                    ]
                },
                {
                    title: "More Link",
                    name: "moreLink",
                    type: "object",
                    fields: [
                        {
                            title: "Link Text",
                            name: "text",
                            type: "string"
                        },
                        {
                            title: "Is External Page",
                            name: "isExternal",
                            type: "boolean",
                            initialValue: false,
                            options: {
                                layout: "checkbox" 
                            }
                        },
                        {
                            ...internalLinkRef,
                            hidden: ({ parent }: any) => parent?.isExternal === true,
                        },
                        {
                            ...externalLinkUrl,
                            hidden: ({ parent }: any) => parent?.isExternal !== true,
                        }
                    ]
                }
            ]
        },
        {
            title: "Articles Section",
            name: "articles",
            type: "object",
            fields: [
                {
                    title: "Heading",
                    name: "title",
                    type: "string",
                },
                {
                    title: "Featured Articles",
                    name: "items",
                    type: "array",
                    of: [
                        {
                            title: "Article",
                            type: "reference",
                            to: [{ type: "article" }]
                        }
                    ]
                },
                {
                    title: "More Link",
                    name: "moreLink",
                    type: "object",
                    fields: [
                        {
                            title: "Link Text",
                            name: "text",
                            type: "string"
                        },
                        {
                            title: "Is External Page",
                            name: "isExternal",
                            type: "boolean",
                            initialValue: false,
                            options: {
                                layout: "checkbox"
                            }
                        },
                        {
                            ...internalLinkRef,
                            hidden: ({ parent }: any) => parent?.isExternal === true,
                        },
                        {
                            ...externalLinkUrl,
                            hidden: ({ parent }: any) => parent?.isExternal !== true,
                        }
                    ]
                }
            ]
        }
    ],
}