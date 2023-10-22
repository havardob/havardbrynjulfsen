import { BiPackage } from "react-icons/bi";
import { richTextSimple } from "./templates/richText";
import { slug } from "./templates/slug";

export default {
    name: 'creationArchive',
    title: 'Creations Landing',
    icon: BiPackage,
    type: 'document',
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