import { BiCog } from "react-icons/bi";
import { externalLinkUrl, internalLinkRef } from "./templates/linkObject";

export default {
    title: 'Site settings',
    name: 'siteSettings',
    type: 'document',
    icon: BiCog,
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
            title: "Metatitle",
            description: "This is the name that will appear in the top of the browser's tabs and in search results on e.g. Bing or Google",
            name: "metaTitle",
            type: "string",
        }
    ],
}