export const slug = {
    name: "slug",
    title: "Slug",
    description: "Generate a unique slug (the text that comes after the / in the URL)",
    type: "slug",
    options: {
        source: "title"
    },
    validation: (Rule: any) => Rule.required()
}