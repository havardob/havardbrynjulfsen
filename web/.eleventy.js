const config = function (eleventyConfig) {
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