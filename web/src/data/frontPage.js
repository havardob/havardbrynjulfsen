const client = require("./_sanityClient").client;
const toHTML = require('@portabletext/to-html').toHTML;
const portableTextToHtml = require('./_portableTextToHtml');
const mql = require('@microlink/mql');

const getReadingTime = function (bodyText) {
    const text = bodyText;
    const wpm = 265;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);

    return time;
}

const formatDate = function (date) {
    const newDate = new Date(date);
    const month = newDate.getMonth();
    const day = newDate.getDate();
    const year = newDate.getFullYear();

    var monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    const formattedDate = `${monthNames[month]} ${day}, ${year}` 
    return formattedDate;
}


const query = `*[_id == "frontPage"][0] {
    ...
}`

const getFrontPageData = async function () {
    const data = await client.fetch(query);
    return data; 
}

module.exports = getFrontPageData(); 
 