import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  studioHost: 'havardbrynjulfsen',
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
    dataset: process.env.SANITY_STUDIO_DATASET || ""
  }
})
