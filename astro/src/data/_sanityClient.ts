import 'dotenv/config';
import { createClient } from "@sanity/client";

const config = {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || '',
    apiVersion: '2023-07-06',
    useCdn: false,
}

export const client = createClient(config);
