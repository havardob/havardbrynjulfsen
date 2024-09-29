import {defineCollection} from 'astro:content';
import {getArticleData} from "../data/article.ts";
import {getCreationData} from "../data/creation.ts";
import {getSiteSettingsData} from "../data/siteSettings.ts";
import {getFrontPageData} from "../data/frontPage.ts";
import {getArticleArchiveData} from "../data/articleArchive.ts";
import {getCreationArchiveData} from "../data/creationArchive.ts";
import {getTagPageData} from "../data/tag.ts";

const siteSettingsCollection = defineCollection({
    loader: async () => {
        const siteSettings = await getSiteSettingsData();
        return [{
            id: siteSettings._id,
            ...siteSettings
        }];
    }
});

const frontPageCollection = defineCollection({
    loader: async () => {
        const frontPage = await getFrontPageData();
        return [{
            id: frontPage._id,
            ...frontPage
        }];
    }
});

const articleArchiveCollection = defineCollection({
    loader: async () => {
        const articleArchive = await getArticleArchiveData();
        return [{
            id: articleArchive._id,
            ...articleArchive
        }];
    }
});

const creationArchiveCollection = defineCollection({
    loader: async () => {
        const creationArchive = await getCreationArchiveData();
        return [{
            id: creationArchive._id,
            ...creationArchive
        }];
    }
});

const tagPageCollection = defineCollection({
    loader: async () => {
        const response = await getTagPageData();
        return response.map((tagPage: any) => ({
            id: tagPage._id,
            ...tagPage
        }));
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

export const collections = {
    "siteSettings": siteSettingsCollection,
    "frontPage": frontPageCollection,
    "articleArchive": articleArchiveCollection,
    "creationArchive": creationArchiveCollection,
    "tags": tagPageCollection,
    "articles": articles,
    "creations": creations
};