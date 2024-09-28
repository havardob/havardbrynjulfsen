import { defineCollection } from 'astro:content';
import {getArticleData} from "../data/article.ts";
import {getCreationData} from "../data/creation.ts";
import {getSiteSettingsData} from "../data/siteSettings.ts";

const siteSettingsCollection = defineCollection({
    loader: async () => {
        const siteSettings = await getSiteSettingsData();
        return [{
            id: siteSettings._id,
            ...siteSettings
        }];
    }
});

const articles = defineCollection({
    loader: async () => {
        const response = await getArticleData();
        return response.map((article: any) => ({
            id: article._id,
            ...article
        }));
    }
});

const creations = defineCollection({
    loader: async () => {
        const response = await getCreationData();
        return response.map((creation: any) => ({
            id: creation._id,
            ...creation
        }));
    }
});

export const collections = { "siteSettings": siteSettingsCollection, "articles": articles, "creations": creations };