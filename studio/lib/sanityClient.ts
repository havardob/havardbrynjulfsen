import { createClient } from '@sanity/client'

export const client = createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
    dataset: process.env.SANITY_STUDIO_DATASET || "",
    apiVersion: '2023-07-06',
    useCdn: false,
});