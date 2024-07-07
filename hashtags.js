const googleTrends = require("google-trends-api");

// function getTrendingSearches() {
//   googleTrends.dailyTrends(
//     {
//       geo: "US",
//       hl: "en-US",
//     },
//     (err, results) => {
//       if (err) {
//         console.error("Error fetching trends:", err);
//         return;
//       }
//       let parsedResults = JSON.parse(results);
//       let trends = parsedResults.default.trendingSearchesDays[0].trendingSearches;
//       let hashtags = trends.map((trend) => `#${trend.title.query.replace(/\s+/g, "")}`);
//       console.log(hashtags);
//     }
//   );
// }

// getTrendingSearches();

// function getRealTimeTrends() {
//   googleTrends.realTimeTrends(
//     {
//       geo: "IN",
//       category: "all",
//       hl: "en",
//     },
//     function (err, results) {
//       if (err) {
//         console.error("Error fetching real-time trends:", err);
//         return;
//       }
//       let parsedResults = JSON.parse(results);
//       let trends = parsedResults.storySummaries.trendingStories;
//       let hashtags = trends.map((story) => `#${story.title.replace(/\s+/g, "")}`);
//       console.log(hashtags);
//     }
//   );
// }

// getRealTimeTrends();

// const googleTrends = require("google-trends-api");

function getTrendingSearches() {
  googleTrends.dailyTrends(
    {
      geo: "IN",
      hl: "en",
      category: "all",
    },
    (err, results) => {
      if (err) {
        console.error("Error fetching trends:", err);
        return;
      }
      let parsedResults = JSON.parse(results);
      let trends = parsedResults.default.trendingSearchesDays[0].trendingSearches;
      let hashtags = trends.map((trend) => `#${trend.title.query.replace(/\s+/g, "")}`);
      console.log(hashtags);
    }
  );
}

getTrendingSearches();

setInterval(getTrendingSearches, 3600000);
