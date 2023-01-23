import styles from '../styles/appBar.module.css';
import { Link } from 'react-router-dom';

const links = [
  {
    id: 1,
    name: 'どすこい',
    to: '/'
  },
  {
    id: 2,
    name: 'このサイトについて',
    to: '/'
  },
  {
    id: 3,
    name: 'ログイン',
    to: '/signin'
  },
  {
    id: 4, 
    name: '新規登録',
    to: '/signup'
  },
]

const AppBar = () => {
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

export default AppBar;