import { BiFile } from "react-icons/bi";
import { richTextMain } from "./templates/richText";
import { externalLinkUrl, internalLinkRef } from "./templates/linkObject";

export default {
  title: 'Articles',
  name: 'article',
  type: 'document',
  icon: BiFile,
  preview: {
    select: {
      title: "title",
      subtitle: "publishedDate",
      media: "featuredImage"
    }
  },
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: "Write in CamelCase",
      type: 'text',
      rows: 2,
      validation: (Rule: any) => Rule.required()
    },
    {
      ...externalLinkUrl
    },
    {
      ...internalLinkRef, 
    },
    {
      name: "publishedDate",
      title: "Published Date",
      description: "Set the date you want this to appear as published",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD"
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      title: "Featured Image",
      description: "Pick an image you'd want to show as a preview for this article",
      name: "featuredImage",
      type: "image"
    },
    {
      title: "Leading Text",
      description: "Write a short introduction that summarizes this article in maxiumum one or two sentences. This will also show in any preview, either on the front page or when sharing to SoMe",
      name: "leading",
      type: "text",
      rows: 4
    },
    {
      ...richTextMain,
      title: "Body Text",
      description: "The body text of this article. Format text, insert images, links or other blocks",
      name: "body",
    }
  ]
}
