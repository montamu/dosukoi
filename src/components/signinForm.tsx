import styles from '../styles/userForm.module.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SigninForm = () => {
  // 処理が終わったらホーム画面に飛ばすための準備
  const navigate = useNavigate();

  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ submitError, setSubmitError ] = useState<boolean>(false);

  const handleChangeEmail = (event: any) => {
    setEmail(event.currentTarget.value);
  };

  const handleChangePassword = (event: any) => {
    setPassword(event.currentTarget.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setSubmitError(true);
      });
    
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div className={styles.content}>
          <h3 className={styles.title}>ログイン</h3>
          <div className={styles.item}>
            <label htmlFor="email">メールアドレス</label>
            <input className={styles.input} type="email" id="email" name="email" required onChange={e => handleChangeEmail(e)}/>
          </div>
          <div className={styles.item}>
            <label htmlFor="password">パスワード</label>
            <input className={styles.input} type="password" id="password" name="password" required onChange={e => handleChangePassword(e)}/>
          </div>
          { submitError && <p className={styles.error}>入力に誤りがあります。もう一度試してください。</p>}
          <button className={styles.button} onClick={handleSubmit}>ログイン</button>
        </div>
      </div>
    </div>
  )
}

export default SigninForm;