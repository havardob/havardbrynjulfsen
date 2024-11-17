import { BiCog, BiDockBottom, BiDockTop, BiInfoCircle, BiLink, BiLogoMedium, BiShare } from "react-icons/bi";
import { externalLinkUrl, internalLinkRef } from "./templates/linkObject";

export default {
    title: 'Site settings',
    name: 'siteSettings',
    type: 'document',
    icon: BiCog,
    groups: [
        {
            title: "Header",
            name: "headerGroup",
            icon: BiDockTop,
            default: true,
        },
        {
            title: "Footer",
            name: "footerGroup",
            icon: BiDockBottom
        },
        {
            title: "Metadata",
            name: "metaGroup",
            icon: BiShare
        },
        {
            title: "Banner",
            name: "bannerGroup",
            icon: BiInfoCircle
        }
    ],
    fields: [
        {
            name: "title",
            type: "string",
            initialValue: "Site settings",
            readOnly: true,
            hidden: true,
        },
        {
            title: "Main navigation",
            type: "array",
            group: "headerGroup",
            name: "mainNav",
            of: [
                {
                    title: "Internal Link",
                    name: "internalLink",
                    type: "object",
                    fields: [
                        {
                            title: "Text",
                            name: "text",
                            type: "string"
                        },
                        {
                            title: "Open in new tab",
                            name: "openInNewTab",
                            type: "boolean",
                            initialValue: false,
                            options: {
                                layout: "checkbox"
                            }
                        },
                        {
                            ...internalLinkRef,
                        }
                    ]
                },
                {
                    title: "External Link",
                    name: "externalLink",
                    type: "object",
                    fields: [
                        {
                            title: "Text",
                            name: "text",
                            type: "string"
                        },
                        {
                            ...externalLinkUrl
                        },
                        {
                            title: "Open in new tab",
                            name: "openInNewTab",
                            type: "boolean",
                            initialValue: false,
                            options: {
                                layout: "checkbox"
                            }
                        }
                    ]
                }
            ]
        },
        {
            title: "Banner Text",
            group: "bannerGroup",
            name: "topBanner",
            type: "text",
            rows: 2,
        },
        {
            title: "SoMe Links",
            group: "footerGroup",
            name: "someLinks",
            type: "array",
            of: [
                {
                    title: "Link",
                    name: "link",
                    type: "object",
                    icon: BiLink,
                    fields: [
                        {
                            title: "Label",
                            name: "label",
                            type: "string",
                        },
                        {
                            title: "Icon",
                            name: "icon",
                            type: "string",
                            options: {
                                list: [
                                    {
                                        title: "Medium",
                                        value: "medium",
                                    },
                                    {
                                        title: "Twitter / X",
                                        value: "x",
                                    },
                                    {
                                        title: "Github",
                                        value: "github"
                                    },
                                    {
                                        title: "Sanity",
                                        value: "sanity",
                                    },
                                    {
                                        title: "Codepen",
                                        value: "codepen"
                                    },
                                    {
                                        title: "Feed",
                                        value: "rss"
                                    },
                                    {
                                        title: "Mastodon",
                                        value: "mastodon"
                                    },
                                    {
                                        title: "Bluesky",
                                        value: "bluesky",
                                    }
                                ],
                            }
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
            title: "Footer Navigation",
            type: "array",
            group: "footerGroup",
            name: "footerNav",
            of: [
                {
                    title: "Internal Link",
                    name: "internalLink",
                    type: "object",
                    fields: [
                        {
                            title: "Text",
                            name: "text",
                            type: "string"
                        },
                        {
                            title: "Open in new tab",
                            name: "openInNewTab",
                            type: "boolean",
                            initialValue: false,
                            options: {
                                layout: "checkbox"
                            }
                        },
                        {
                            ...internalLinkRef,
                        }
                    ]
                },
                {
                    title: "External Link",
                    name: "externalLink",
                    type: "object",
                    fields: [
                        {
                            title: "Text",
                            name: "text",
                            type: "string"
                        },
                        {
                            ...externalLinkUrl
                        },
                        {
                            title: "Open in new tab",
                            name: "openInNewTab",
                            type: "boolean",
                            initialValue: false,
                            options: {
                                layout: "checkbox"
                            }
                        }
                    ]
                }
            ]
        },
        {
            title: "Meta Title",
            group: "metaGroup",
            description: "This is the name that will appear in the top of the browser's tabs and in search results on e.g. Bing or Google",
            name: "metaTitle",
            type: "string",
        },
        {
            title: "Meta Description",
            group: "metaGroup",
            name: "metaDescription",
            description: "The following text will appear in SoMe share-previews and in search results on e.g Bing or Google",
            type: "text",
            rows: 3
        },
        {
            title: "Meta Image",
            group: "metaGroup",
            name: "metaImage",
            description: "The following image will appear in SoMe share-previews, IF no other image is found. Consider this a fallback. Dimensions should be 1200x600",
            type: "image",
        }
    ],
}