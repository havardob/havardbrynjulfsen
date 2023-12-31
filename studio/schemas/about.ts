import { BiUser } from "react-icons/bi";
import { slug } from "./templates/slug";
import { richTextMain } from "./templates/richText";

export default {
    name: 'about',
    title: 'About',
    icon: BiUser,
    type: 'document',
    preview: {
        select: {
            title: "title"
        }
    },
    fields: [
        {
            title: "Page Title",
            name: "title",
            type: "text",
            rows: 2,
        },
        {
            title: "Parent Page",
            name: "parent",
            type: "reference",
            to: [
                { type: "frontPage" },
                { type: "article" },
                { type: "creation" },
            ]
        },
        {
            ...slug
        },
        {
            title: "Leading",
            name: "leading",
            type: "text",
            rows: 3
        },
        {
            title: "Profile Image",
            name: "profileImage",
            type: "image",
            options: {
                hotspot: true
            }
        },
        {
            ...richTextMain,
            title: "Body Text",
            name: "body",
        }
    ],
}