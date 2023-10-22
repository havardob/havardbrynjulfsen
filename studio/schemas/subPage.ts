import { BiLayout } from "react-icons/bi";
import { slug } from "./templates/slug";
import { richTextMain, richTextSimple } from "./templates/richText";

export default {
    name: 'subPage',
    title: 'Sub Pages',
    type: 'document',
    icon: BiLayout,
    fields: [
        {
            title: "Title", 
            name: "title",
            type: "text",
            rows: 2,
        },
        {
            ...slug
        },
        {
            title: "Parent",
            name: "parent",
            type: "reference",
            to: [
                { type: "subPage"},
                { type: "about"},
            ],
            options: {
                disableNew: true,
            }
        },
        {
            title: "Leading",
            name: "leading",
            type: "text",
            rows: 3
        },
        {
            ...richTextMain,
            title: "Body",
            name: "body"    
        }
    ],
}