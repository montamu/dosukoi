import * as functions from "firebase-functions";
import axios from "axios";

type Article = {
  author: string,
  content: string | null,
  description: string | null,
  publishedAt: string,
  source: {
    id: string,
    name: string
  },
  title: string,
  url: string,
  urlToImage: string | null,
};

exports.getNews = functions
  // 関数を実行するリージョンを大阪に設定
  .region("asia-northeast2")
  .runWith({secrets: ["NEWSAPIKEY"]})
  .https.onRequest((req, res) => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.NEWSAPIKEY}`)
      .then((response) => {
        const articles = response.data.articles.map((article: Article) =>{
          const articleDeepCopy = JSON.parse(JSON.stringify(article));
          articleDeepCopy.title = removeAuthorFromTitle(article.title);
          articleDeepCopy.publishedAt = shapingPublishedAt(article.publishedAt);
          return articleDeepCopy;
        });
        res.status(200).send(articles);
      });
    res.end();
  });

// タイトルから出版社の名前を消す関数
const removeAuthorFromTitle = (title: string): string => {
  if (title.includes("｜")) {
    return title.slice(0, title.indexOf("｜"));
  } else if (title.includes("-")) {
    return title.slice(0, title.indexOf("-")-1);
  } else {
    return title;
  }
};

// 発行日を年月日表示にする関数
const shapingPublishedAt = (publishedAt: string): string => {
  return (
    publishedAt.slice(0, 4) + "年" +
    publishedAt.slice(5, 7) + "月" +
    publishedAt.slice(8, 10) + "日"
  );
};
