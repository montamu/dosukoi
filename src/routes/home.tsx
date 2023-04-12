import AppBar from '../components/appBar'
import dosukoi from "../images/kodomozumo.png";
import styles from "../styles/home.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

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

  const functions = getFunctions();
  const getNews = httpsCallable(functions, 'getNews');
  

  const callGetNews = () => {
    getNews()
    .then((result) => {
      const data = result.data;
      console.log(data);
    });
  }

  useEffect(callGetNews, []);

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