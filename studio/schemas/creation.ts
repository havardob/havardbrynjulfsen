import { BiPen } from "react-icons/bi";
import { slug } from "./templates/slug";
import { richTextMain } from "./templates/richText";

export default {
    name: 'creation',
    title: 'Creations',
    icon: BiPen,
    type: 'document',
    fields: [
        {
            title: "Title",
            name: "title",
            type: "text",
            rows: 3,
            validation: (Rule: any) => Rule.required()
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
            intialValue: false
        },
        {
            title: "Intro",
            name: "leading",
            type: "text",
            rows: 4   
        },
        {
            ...richTextMain,
            title: "Body Text",
            name: "body",
        }
    ],
}