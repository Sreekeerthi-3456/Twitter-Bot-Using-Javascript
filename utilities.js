const request = require("request");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

const download = async function (uri) {
  if (uri.startsWith("http://") || uri.startsWith("https://")) {
    try {
      const response = await axios.get(uri, { responseType: "arraybuffer" });
      return Buffer.from(response.data);
    } catch (axiosError) {
      console.error("Axios failed to download, trying request:", axiosError.message);
      return new Promise((resolve, reject) => {
        const buffer = [];
        request
          .get(uri)
          .on("error", reject)
          .on("data", (data) => buffer.push(data))
          .on("end", () => {
            try {
              resolve(Buffer.concat(buffer));
            } catch (error) {
              reject(error);
            }
          });
      });
    }
  } else {
    try {
      return await fs.promises.readFile(path.resolve(uri));
    } catch (error) {
      console.error("Failed to read local file:", error);
      throw error;
    }
  }
};

module.exports = { download };
