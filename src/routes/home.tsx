import AppBar from '../components/appBar'
import dosukoi from "../images/kodomozumo.png";
import styles from "../styles/home.module.css";
import { useState, useEffect } from "react";
import { httpsCallable, /* connectFunctionsEmulator */ } from "firebase/functions";
import { functions } from "../firebase";

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

const Home = () => {
  const [ articles, setArticles ] = useState<Article[]>();
  // author, publishedAt, title, url 

  const getNews = httpsCallable(functions, 'getNews');

  useEffect(() => {
    getNews()
      .then(response => {
        const data: any = response.data;
        const articles = data.map((article: Article) =>{
          const articleDeepCopy = JSON.parse(JSON.stringify(article));
          articleDeepCopy.title = removeAuthorFromTitle(article.title);
          articleDeepCopy.publishedAt = shapingPublishedAt(article.publishedAt);
          return articleDeepCopy;
        });
        setArticles(articles);
        console.log("GET NEWS");
      })
      .catch(error => {
        console.log(error);
      });
      // eslintの警告を無視
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AppBar />
      <div className={styles.container}>
        <h1>ここはトップページだよ！</h1>
        <h4>昨日のニュースを確認できるよ！<br/>今後のアップデート予定については「ヘルプ」を見てね！</h4>
        <img className={styles.dosukoi} src={dosukoi} alt="dosukoi"/>
        <div className={styles.news}>
          {articles && 
            articles.map(article => { 
              return(
                <a href={article.url} key={article.title}>
                  <div className={styles.article} >
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