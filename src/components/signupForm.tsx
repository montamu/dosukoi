import styles from '../styles/userForm.module.css';

const SignupForm = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.content}>
          <h3 className={styles.title}>新規登録</h3>
          <div className={styles.item}>
            <label htmlFor="username">ユーザー名</label>
            <input className={styles.input} type="text" id="username" name="username" required />
          </div>
          <div className={styles.item}>
            <label htmlFor="email">メールアドレス</label>
            <input className={styles.input} type="email" id="email" name="email" required />
          </div>
          <div className={styles.item}>
            <label htmlFor="password">パスワード</label>
            <input className={styles.input} type="password" id="password" name="password" required />
          </div>
          <div className={styles.item}>
            <label htmlFor="profile-icon">プロフィールアイコン</label>
            <input type="file" id="profile-icon" name="profile-icon" />
          </div>
          <div className={styles.item}>
            <label htmlFor="birthday">生年月日</label>
            <input className={styles.input} type="date" id="birthday" name="birthday" required />
          </div>
          <div className={styles.item}>
            <label>性別</label>
              <div>
                <input className={styles.input} type="radio" id="male" name="gender" value="m"/>
                <label htmlFor="male">男性</label>
              </div>
              <div>
                <input className={styles.input} type="radio" id="female" name="gender" value="f"/>
                <label htmlFor="female">女性</label>
              </div> 
              <div>
                <input className={styles.input} type="radio" id="female" name="gender" value="f"/>
                <label htmlFor="female">ひみつ</label>
              </div>
              <div>
                <input className={styles.input} type="radio" id="female" name="gender" value="f"/>
                <label htmlFor="female">その他</label>
              </div>
          </div>
          <div className={styles.item}>
            <div>
              <input className={styles.input} type="checkbox" id="terms-of-service" name="terms-of-service" required />
              <label htmlFor="terms-of-service">私は<a href='https://menherasenpai.notion.site/457df49475494671807673a0a3346451'>利用規約</a>の全ての項目について同意します</label>
            </div>
          </div>
          <button className={styles.button} type="submit">登録する</button>
        </div>
      </form>
    </div>
  )
}

export default SignupForm;