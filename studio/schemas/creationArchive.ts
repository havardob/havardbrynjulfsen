import { BiPackage } from "react-icons/bi";
import { richTextSimple } from "./templates/richText";
import { slug } from "./templates/slug";

export default {
    name: 'creationArchive',
    title: 'Creations Landing',
    icon: BiPackage,
    type: 'document',
    preview: {
        select: {
            title: "title"
        }
    },
    fields: [
        {
            title: "Title",
            name: "title",
            type: "text",
            rows: 2
        }, 
        {
            ...slug
        },
        {
            ...richTextSimple,
            title: "Leading",
            name: "leading",
        },
        {
            title: "Order creations",
            name: "creationList",
            type: "array",
            of: [
                {
                    type: "reference",
                    to: [{type: "creation"}]
                }
            ]
        }
    ],
} 