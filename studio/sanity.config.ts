import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import deskStructure from './src/deskStructure'
import {codeInput} from '@sanity/code-input'
import {ProductionIcon} from "./ProductionIcon";
import {DevelopmentIcon} from "./DevelopmentIcon";


export default defineConfig([
    {
        name: 'production-workspace',
        basePath: '/production',
        title: 'havardbrynjulfsen.design',
        subtitle: 'Production',
        icon: ProductionIcon,

        projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
        dataset: "production",

        scheduledPublishing: {
            enabled: true
        },
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

    },
    {
        name: 'development-workspace',
        basePath: '/development',
        title: 'havardbrynjulfsen.design',
        subtitle: 'Development',
        icon: DevelopmentIcon,

        projectId: process.env.SANITY_STUDIO_PROJECT_ID || "",
        dataset: "development",

        scheduledPublishing: {
            enabled: true
        },
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
        }
    }])
