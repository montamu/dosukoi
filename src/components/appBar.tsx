import styles from '../styles/appBar.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const AppBar = () => {
  const { user } = useAuth();

  // もっとスリムに書ける
  if (user && user.photoURL) {
    const links = [
      {
        id: 1,
        name: 'どすこい',
        to: '/',
      },
      {
        id: 2,
        name: 'ヘルプ',
        to: '/help',
      },
      {
        id: 3,
        name: 'ログアウト',
        to: '/logout',
      }
    ];

    return (
      <div className={styles.container}>
        {links.map((link) => (
          <div key={link.id} className={styles.element}>
            <Link to={link.to} className={styles.link}>{link.name}</Link>
          </div>
        ))}
        <div className={styles.element}>
          <Link to="/mypage">
            <img className={styles.user} src={user?.photoURL} alt="ユーザープロフィール画像" width="40" height="40"/>
          </Link>
        </div>
      </div>
    )
  }
  else {
    const links = [
      {
        id: 1,
        name: 'どすこい',
        to: '/',
      },
      {
        id: 2,
        name: 'ヘルプ',
        to: '/help',
      },
      {
        id: 3,
        name: 'ログイン',
        to: '/signin',
      },
      {
        id: 4, 
        name: '新規登録',
        to: '/signup',
      },
    ];

    return (
      <div className={styles.container}>
        {links.map((link) => (
          <div key={link.id} className={styles.element}>
            <Link to={link.to} className={styles.link}>{link.name}</Link>
          </div>
        ))}
      </div>
    )
  }
}

export default AppBar;