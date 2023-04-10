import AppBar from '../components/appBar'
import styles from "../styles/mypage.module.css";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { collection, query, where, getDocs, DocumentData } from "firebase/firestore";

const Mypage = () => {
  const { user } = useAuth();
  // ユーザーのプロフィール情報
  const [ users, setUsers ] = useState<DocumentData[] | null>(null);

  // ログインユーザーのプロフィール情報を検索してGETする
  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("userId", "==", user?.uid));
    getDocs(q).then((querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => doc.data())
      );
      console.log(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, [user?.uid]);
  

  return (
    <>
      <AppBar />
      <div className={styles.container}>
        {user && users && user.photoURL &&
          <div className={styles.profile}>
            <div className={styles.imgdiv}>
              <img className={styles.usericon} src={user.photoURL} alt="プロフィール画像"></img>
            </div>
            <div className={styles.username}>{user.displayName}</div>
            <div className={styles.userdata}>誕生日：{users[0].birthday}</div>
            <div className={styles.userdata}>性別：{users[0].gender}</div>
          </div>
        }
      </div>
    </>
  );
}

export default Mypage;