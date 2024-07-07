// const googleTrends = require("google-trends-api");

// // function getRelatedTopics() {
// //   googleTrends
// //     .relatedTopics({ keyword: "Bot" })
// //     .then((results) => {
// //       let parsedResults = JSON.parse(results);
// //       let hashtags = parsedResults.default.rankedList[0].rankedKeyword.map((item) => `#${item.topic.title.replace(/\s+/g, "")}`);
// //       console.log(hashtags);
// //     })
// //     .catch((err) => console.error("Error fetching related topics:", err));
// // }

// // getRelatedTopics();

// // function getRelatedQueries() {
// //   googleTrends
// //     .relatedQueries({ keyword: "ipl 2024" })
// //     .then((results) => {
// //       let parsedResults = JSON.parse(results);
// //       let hashtags = parsedResults.default.rankedList[0].rankedKeyword.map((item) => `#${item.query.replace(/\s+/g, "")}`);
// //       console.log(hashtags);
// //     })
// //     .catch((err) => console.error("Error fetching related queries:", err));
// // }

// // getRelatedQueries();

// function fetchTrendingHashtags() {
//   googleTrends.realTimeTrends(
//     {
//       geo: "IN",
//       category: "all",
//     },
//     (err, results) => {
//       if (err) {
//         console.error("Error fetching real-time trends:", err);
//         return;
//       }
//       let parsedResults = JSON.parse(results);
//       let trends = parsedResults.storySummaries.trendingStories;
//       let hashtags = trends
//         .map((story) => {
//           return story.entityNames.map((name) => `#${name.replace(/\s+/g, "")}`);
//         })
//         .flat();

//       console.log(new Date().toISOString(), hashtags);
//     }
//   );
// }

// setInterval(fetchTrendingHashtags, 3600000);

// fetchTrendingHashtags();

// const axios = require("axios");
// const cheerio = require("cheerio");

// async function trendingHashtags() {
//   try {
//     const response = await axios.get("https://trends24.in/india/");
//     const html = response.data;

//     const $ = cheerio.load(html);

//     const trends = [];
//     $(".trend-card__list li a").each((index, element) => {
//       const trend = $(element).text().trim();
//       if (trend.startsWith("#")) {
//         trends.push(trend);
//       }
//     });

//     console.log(trends);
//   } catch (error) {
//     console.error("Error fetching trending data:", error);
//   }
// }

// trendingHashtags();

const axios = require("axios");
const cheerio = require("cheerio");

async function fetchTrends() {
  try {
    const response = await axios.get("https://trends24.in/india");
    const html = response.data;

    const $ = cheerio.load(html);

    const trends = [];
    $(".trend-card__list li a").each((index, element) => {
      const trending = $(element).text().trim();
      if (trending.startsWith("#")) {
        trends.push(trending);
      }
    });
    const hashtagConsole = trends.slice(0, 50);
    console.log(hashtagConsole);
  } catch (error) {
    console.error("Error fetching trending data:", error);
  }
}

fetchTrends();
