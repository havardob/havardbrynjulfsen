require("dotenv").config();
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");


const config = function (eleventyConfig) {
    eleventyConfig.addPlugin(eleventyNavigationPlugin);

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