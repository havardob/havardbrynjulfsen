import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import deskStructure from './src/deskStructure'


export default defineConfig({
  name: 'default',
  title: 'Håvard Brynjulfsen',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "",

  plugins: [deskTool({
    structure: deskStructure,
    title: "Innhold"
  }), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
 