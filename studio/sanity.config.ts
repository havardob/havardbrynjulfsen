import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import deskStructure from './src/deskStructure'
import { codeInput } from '@sanity/code-input'


export default defineConfig({
  name: 'default',
  title: 'Håvard Brynjulfsen',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
  dataset: process.env.SANITY_STUDIO_DATASET || "",

  plugins: [
    structureTool({
      structure: deskStructure,
      title: "Innhold"
    }),
    visionTool(),
    codeInput()
  ],

  schema: {
    types: schemaTypes,
  },
})
