const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function trendingHashtags() {
  try {
    const response = await fetch("https://trends24.in/india/");
    const html = await response.text();

    const dom = new JSDOM(html);
    const document = dom.window.document;
    const links = document.querySelectorAll("a");

    const hashtags = [];

    links.forEach((link) => {
      const url = link.href;
      if (url.includes("%23")) {
        const hashtagIndex = url.indexOf("%23");
        const hashtag = url.substring(hashtagIndex);
        if (hashtag) {
          hashtags.push(decodeURIComponent(hashtag));
        }
      }
    });
    const trends = hashtags.slice(2, 52);
    console.log(trends);
  } catch (error) {
    console.error(error);
  }
}

module.exports = { trendingHashtags };
