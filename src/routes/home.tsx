import AppBar from '../components/appBar'
import dosukoi from "../images/kodomozumo.png";
import styles from "../styles/home.module.css";
import axios from "axios";
import { useState, useEffect } from "react";

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
  urlToImage: string | null
};

const Home = () => {
  const [ articles, setArticles ] = useState<Article[]>();
  // author, publishedAt, title, url 

  const getNews = () => {
    axios.get(`https://newsapi.org/v2/top-headlines?country=jp&apiKey=${process.env.REACT_APP_FIREBASE_NEWSAPIKEY}`)
    .then(res => {
      console.log("元の記事");
      console.log(res.data.articles);
      const articles = res.data.articles.map((article: Article) =>{
        const article_deepcopy = JSON.parse(JSON.stringify(article));
        article_deepcopy.title = removeAuthorFromTitle(article.title);
        article_deepcopy.publishedAt = shapingPublishedAt(article.publishedAt);
        return article_deepcopy;
      })
      console.log("タイトル修正後の記事");
      console.log(articles);
      setArticles(articles);
    });
  }

  // タイトルから出版社の名前を消す関数
  const removeAuthorFromTitle = (title: string): string => {
    if (title.includes("｜")) {
      return title.slice(0, title.indexOf("｜"));
    }
    else if (title.includes("-")) {
      return title.slice(0, title.indexOf("-")-1);
    }
    else {
      return title;
    }
  }


  // 発行日を年月日表示にする関数
  const shapingPublishedAt = (publishedAt: string): string => {
    return publishedAt.slice(0, 4) + "年" + publishedAt.slice(5, 7) + "月" + publishedAt.slice(8, 10) + "日";
  }

  useEffect(getNews, []);

  return (
    <>
      <AppBar />
      <div className={styles.container}>
        <h1>ここはトップページだよ！</h1>
        <h4>まだこのサイトは開発途中です！<br/>今後の予定については「ヘルプ」を見てね！</h4>
        <img className={styles.dosukoi} src={dosukoi} alt="dosukoi"/>
        <div className={styles.news}>
          {articles && 
            articles.map(article => { 
              return(
                <a href={article.url}>
                  <div className={styles.article} key={article.title}>
                    <div className={styles.sub}>
                      <div className={styles.element}>{article.publishedAt}</div>
                      <div className={styles.element}>{article.author}</div>
                    </div>
                    <div className={styles.title}>{article.title}</div>
                  </div>
                </a>
              )
            })
          }
        </div>
      </div>
    </>
  );
}

export default Home;