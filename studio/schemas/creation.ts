import { BiDetail, BiPen } from "react-icons/bi";
import { slug } from "./templates/slug";
import { richTextMain } from "./templates/richText";
import { descriptionList } from "./templates/descriptionList";
import { externalLinkUrl, internalLinkRef } from "./templates/linkObject";

export default {
    name: 'creation',
    title: 'Creations',
    icon: BiPen,
    type: 'document',
    preview: {
        select: {
            title: "title",
            subtitle: "tagline",
            media: "featuredImage"
        }
    },
    fields: [
        {
            title: "Title", 
            name: "title",
            type: "text",
            rows: 2,
            validation: (Rule: any) => Rule.required()
        },
        {
            title: "Tagline",
            name: "tagline",
            type: "text",
            rows: 2
        },
        {
            ...slug
        },
        {
            title: "Featured Image",
            description: "The image you chose here will show in the preview for this page, as well as in sharing widgets",
            name: "featuredImage",
            type: "image",
            options: {
                hotspot: true
            }
        },
        {
            title: "Show Image As Banner",
            description: "Decide if you want to also show this image as a banner on this page",
            name: "showAsBanner",
            type: "boolean",
            options: {
                layout: "checkbox"
            },
            initialValue: false
        },
        {
            title: "Tag",
            name: "tag",
            type: "reference",
            to: [{ type: "tag" }],
        },
        {
            title: "Intro",
            name: "leading",
            type: "text",
            rows: 4
        },
        {
            title: "Details",
            name: "detailsList",
            type: "array",
            of: [
                {
                    title: "List Item",
                    name: "item",
                    type: "object",
                    icon: BiDetail,
                    preview: {
                        select: {
                            title: "title",
                            subtitle: "subtitle",
                        }
                    },
                    fields: [

                        {
                            title: "Term",
                            name: "title",
                            type: "string",
                        },
                        {
                            title: "Details",
                            name: "subtitle",
                            type: "string"
                        },
                        {
                            title: "Is Linked",
                            name: "isLinked",
                            type: "boolean",
                            initialValue: false,
                            options: {
                                layout: "checkbox"
                            }
                        },
                        {
                            title: "Is External Page",
                            name: "isExternal",
                            type: "boolean",
                            initialValue: true,
                            options: {
                                layout: "checkbox"
                            },
                            hidden: ({ parent }: any) => parent?.isLinked !== true,
                        },
                        {
                            ...internalLinkRef,
                            hidden: ({ parent }: any) => parent?.isLinked !== true || parent?.isExternal === true,
                        },
                        {
                            ...externalLinkUrl,
                            hidden: ({ parent }: any) => parent?.isLinked !== true || parent?.isExternal !== true,
                        }
                    ]
                }
            ]
        },
        {
            ...richTextMain,
            title: "Body Text",
            name: "body",
        }
    ],
}