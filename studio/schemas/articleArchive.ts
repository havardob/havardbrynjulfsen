
import { BiArchive } from "react-icons/bi";
import { richTextSimple } from "./templates/richText";
import { slug } from "./templates/slug";

export default {
    name: 'articleArchive',
    title: 'Articles Landing',
    icon: BiArchive,
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
        }
    ],
}