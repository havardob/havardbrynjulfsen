import { BiPurchaseTagAlt } from "react-icons/bi";
import { slug } from "./templates/slug";

export default {
    name: 'tag',
    title: 'Tags',
    type: 'document',
    icon: BiPurchaseTagAlt,
    fields: [
        {
            title: "Tag Name",
            name: "title",
            type: "string",
            validation: (Rule: any) => Rule.required()           
        },
        {
            ...slug
        },
        {
            title: "Type",
            name: "type",
            type: "string",
            options: {
                list: [{ value: "article", title: "Article"}, { value: "creation", title: "Creation"}],
                layout: "radio"
            },
            initialValue: "article",
            validation: (Rule: any) => Rule.required()           
        }
    ],
}