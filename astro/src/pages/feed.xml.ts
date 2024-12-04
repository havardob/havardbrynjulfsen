import rss from '@astrojs/rss';
import {getCollection} from 'astro:content';
import {getSiteSettingsData} from "../data/siteSettings";

export async function GET(context: any) {
    const siteSettings = await getSiteSettingsData();
    const articles = await getCollection('articles');

    const rssObj = {
        title: siteSettings.metaTitle,
        description: siteSettings.metaDescription,
        site: context.site,
        items: articles.map((article: any) => ({
            title: article.data.title ?? '',
            description: article.data.leading ?? '',
            pubDate: article.data.rssDate.toISOString() ?? '',
            content: article.data.rawHtml ?? '',
            link: "/" + article.data.fullSlug
        }))
    }

    return rss(rssObj);
}