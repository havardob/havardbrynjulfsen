import { createClient } from "@sanity/client";

const config = {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'ut8rd85x',
    dataset: process.env.SANITY_STUDIO_DATASET || 'production',
    apiVersion: '2023-07-06',
    useCdn: false,
}

export const client = createClient(config);
