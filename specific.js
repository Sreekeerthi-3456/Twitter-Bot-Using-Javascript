const googleTrends = require("google-trends-api");

function getHashtags() {
  googleTrends
    .relatedTopics({ keyword: "bitcoin" })
    .then((results) => {
      let parsedResults = JSON.parse(results);
      let hashtags = parsedResults.default.rankedList[0].rankedKeyword.map((item) => `#${item.topic.title.replace(/\s+/g, "")}`);
      console.log(hashtags);
    })
    .catch((err) => console.error("Error fetching related topics:", err));
}

getHashtags();
