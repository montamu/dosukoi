import * as functions from "firebase-functions";
import axios from "axios";

exports.getNews = functions
  // 関数を実行するリージョンを大阪に設定
  .region("asia-northeast2")
  .runWith({secrets: ["NEWSAPIKEY"]})
  .https.onCall(async () => {
    return await axios.get(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWSAPIKEY}`)
      .then((result) => {
        return Promise.resolve(result.data.articles);
      });
  });
