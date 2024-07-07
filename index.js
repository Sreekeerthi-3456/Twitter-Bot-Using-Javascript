require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;
const { download } = require("./utilities");
const { trendingHashtags } = require("./random");
var fs = require("fs");
const { exit } = require("process");
const promise = fs.promises.readFile("./chart.png");

async function run() {
  var buffer = await Promise.resolve(promise);
  console.log("buffer", buffer);
  try {
    const mediaId = await twitterClient.v1.uploadMedia(buffer, { mimeType: "image/png" });
    console.log(buffer);
    console.log(mediaId);
    const hashtags = await trendingHashtags();
    console.log(hashtags);
    return await twitterClient.v2.tweet({
      text: `Hello all, ${hashtags}`,
      media: {
        media_ids: [mediaId],
      },
    });
  } catch (e) {
    console.log(e);
  }
}

run();

// const tweet = async () => {
//   // const uri = "https://www.businessinsider.in/photo/54660201.cms";
//   const uri = "./chart.png";

//   try {
//     const imageBuffer = await download(uri);
//     const mediaId = await twitterClient.v1.uploadMedia(imageBuffer, { mimeType: "image/png" });
//     console.log(imageBuffer);
//     console.log(mediaId);
//     await twitterClient.v2.tweet({
//       text: "Hello all, #SRHvskkr #RRR #chart",
//       media: {
//         media_ids: [mediaId],
//       },
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

// const cronTweet = new CronJob("30 * * * * *", async () => {
//   tweet();
// });

// cronTweet.start();
