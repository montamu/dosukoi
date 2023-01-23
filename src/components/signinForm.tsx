import styles from '../styles/userForm.module.css';

const SigninForm = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.content}>
          <h3 className={styles.title}>ログイン</h3>
          <div className={styles.item}>
            <label htmlFor="email">メールアドレス</label>
            <input className={styles.input} type="email" id="email" name="email" required />
          </div>
          <div className={styles.item}>
            <label htmlFor="password">パスワード</label>
            <input className={styles.input} type="password" id="password" name="password" required />
          </div>
          <button className={styles.button} type="submit">ログイン</button>
        </div>
      </form>
    </div>
  )
}

export default SigninForm;