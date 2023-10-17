const sanityClient = require('@sanity/client');


const client = sanityClient.createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || '',
    dataset: process.env.SANITY_STUDIO_DATASET || '',
    apiVersion: '2023-07-06',
    useCdn: false,
});

module.exports = {
    client: client
};