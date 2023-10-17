const mql = require('@microlink/mql');

const getPageMeta = async function() {
    // const { data } = await mql('https://css-tricks.com')
    // console.log(data.description);

    const data = { logo: { url: "https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/07/star.png?fit=180%2C180&ssl=1"}}
    return data;
}

module.exports = getPageMeta(); 
