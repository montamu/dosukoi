import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import AppBar from "../components/appBar";
import styles from "../styles/logout.module.css";

const Logout = () => {
  const navigate = useNavigate();

  const logout = () => {
    auth.signOut();
    console.log("ログアウトしました");
    navigate("/");
  };

  return (
    <>
      <AppBar />
      <div className={styles.container}>
        <h3>本当にログアウトしたい人は下のボタンを押してください</h3>
        <button onClick={logout} className={styles.button}>ログアウト</button>
      </div>
    </>
  )
}

export default Logout;