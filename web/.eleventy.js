require("dotenv").config();
const pluginRss = require('@11ty/eleventy-plugin-rss');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");


const config = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.addPlugin(pluginRss)
    
    eleventyConfig.addPassthroughCopy("./src/assets/**/**");
    return {
        dir: {
            input: "src",
            output: "public",
            data: "data",
            includes: "includes",
            layouts: "layouts"
        },
    };
}

module.exports = config;