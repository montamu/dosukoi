import styles from '../styles/help.module.css';
import AppBar from '../components/appBar';
import { Link } from 'react-router-dom';

const Help = () => {
  return (
    <>
      <AppBar />
      <div className={styles.container}>
        <div className={styles.text}>
          このサイトはReact(Typescript)とFirebaseで作られたWebアプリです<br /><br />

          現在Githubで全コードを公開しているので誰でも見ることが出来ます。
          <a href="https://github.com/montamu/dosukoi">(https://github.com/montamu/dosukoi)</a><br /><br />

          今のところサイトについている機能としては、以下の３つです。<br />
          １．ユーザー管理機能（新規登録、ログイン、ログアウト）<br />
          ２．ログインしているユーザーだけが<Link to="/mypage">マイページ</Link>にアクセスできる<br />
          ３．昨日のニュースのまとめをチェックできる。その記事をクリックすると直接見れます。<br /><br />

          今後は見た目をもっと良くしたり、各ユーザーにおすすめのニュースを表示させたりしようと思っています。<br /><br />
          また、別のプロジェクトとして「ゲーム募集ドットコム（仮）」というTwitter上で一緒にゲームする人を募集するアプリを企画中です。<br />
        </div>
      </div>
    </>
  );
}

export default Help;