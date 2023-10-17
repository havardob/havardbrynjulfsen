import { BiDetail } from "react-icons/bi";
import { externalLinkUrl, internalLinkRef } from "./linkObject";

export const descriptionList = {
    title: "Description List",
    name: "descriptionList",
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
}