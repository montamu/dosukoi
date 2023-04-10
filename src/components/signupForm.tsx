
import styles from "../styles/userForm.module.css";
import { firebaseConfig, auth, db, storage } from "../firebase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

const SignupForm = () => {
  // 処理が終わったらホーム画面に飛ばすための準備
  const navigate = useNavigate();

  // プロフィール画像の設定
  const [ file, setFile ] = useState<File | null>(null);
  const [ imageURL, setImageURL ] = useState<string>("");

  const [ username, setUsername ] = useState<string>("");
  const [ email, setEmail ] = useState<string>("");
  const [ password, setPassword ] = useState<string>("");
  const [ birthday, setBirthday ] = useState<string>("");
  const [ gender, setGender ] = useState<string>("");
  const [ termsOfService, setTermsOfService ] = useState<string>("");

  const [ validation, setValidation ] = useState<boolean>(true);
  const [ error, setError ] = useState<boolean>(false);
  const [ weakPassword, setWeakPassword ] = useState<boolean>(false);

  // 必須項目が入力されているかのチェック。バリデーション処理は今後react-hook-formに置き換える予定。
  const validator = () => {
    if (username && email && password && birthday && gender && termsOfService) {
      setValidation(true);
      return true;
    }
    else {
      setValidation(false);
      return false;
    }
  };

  // パスワードの強度チェック（６文字未満はダメ）
  const passwordIsOk = () => {
    if (password.length < 6) {
      setWeakPassword(true);
      return false;
    }
    else {
      setWeakPassword(false);
      return true;
    }
  }

  const handleChangeUsername = (event: any) => {
    setUsername(event.currentTarget.value);
  };

  const handleChangeEmail = (event: any) => {
    setEmail(event.currentTarget.value);
  };

  const handleChangePassword = (event: any) => {
    setPassword(event.currentTarget.value);
  };

  const handleChangeBirthday = (event: any) => {
    setBirthday(event.currentTarget.value);
  };

  const handleChangeGender = (event: any) => {
    setGender(event.currentTarget.value);
  };

  const handleChangeTermsOfService = (event: any) => {
    setTermsOfService(event.currentTarget.value);
  };

  const gsReference = ref(storage, `gs://${firebaseConfig.storageBucket}/user-icon.png`);

  getDownloadURL(gsReference)
  .then((url) => {
    setImageURL(url);
  })
  .catch((error) => {
    console.error(error);  
  });

  // ファイル選択時にプレビューを表示するようにする
  const [ previewURL, setPreviewURL ] = useState<string>("");

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files[0]) {
      setFile(files[0]);
    }
  }

  useEffect(() => {
    if (file) {
      setPreviewURL(URL.createObjectURL(file));
    }
  }, [file]);

  // 送信ボタンを押した時のサインアップ処理
  const handleSubmit = (event: any) => {
    event.preventDefault();

    // 入力項目のチェック
    if (!validator()) {
      console.log("バリデーション失敗");
      return false;
    }

    //パスワードの強度チェック
    if (!passwordIsOk()) {
      console.log("パスワードが弱い")
      return false;
    }
  
    // プロフィール画像のアップロード
    if (file) {
      const userImageRef = ref(storage, "images/" + file.name);
      const uploadTask = uploadBytesResumable(userImageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on('state_changed',
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.error("画像のアップロードが失敗しました" + error);
          setError(true);
          return false;
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageURL(downloadURL);
            console.log('File available at', downloadURL);
          });
        });
      }
  
    // ユーザーの新規登録（サインアップ）
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
  
      // ユーザープロフィールの更新（名前、プロフィール画像URL）
      updateProfile(user, {
        displayName: username, photoURL: imageURL
      }).then(() => {
        console.log("Profile updated!");
      }).catch((error) => {
        console.error("An error occurred", error);
        setError(true);
        return false;
      });
      
      // 追加のユーザー情報の登録（ユーザーID、誕生日、性別）
      addDoc(collection(db, "users"), {
        userId: user.uid,
        birthday,
        gender
      })
      .then((docRef) => {
        console.log(docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        setError(true);
        return false;
      });
  
      // 全ての処理が成功したらホーム画面に飛ばす
      navigate("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("以下、サインアップエラーの内容");
      console.error(errorCode);
      console.error(errorMessage);
      console.log("以上、サインアップエラーの内容");
      setError(true);
      return false;
    });
  };

  return (
    <div className={styles.container}>
      {/* <form>を使うとfirebaseからサインアップ時にauth/network-request-failedのエラーが出るのであえて<form>は使わない 
        https://stackoverflow.com/questions/38860900/firebase-project-results-in-auth-network-request-failed-error-on-login
      */}
      <div className={styles.form}>
        <div className={styles.content}>
          <h3 className={styles.title}>新規登録</h3>
          <div className={styles.item}>
            <label htmlFor="username">ユーザー名</label>
            <input className={styles.input} type="text" id="username" name="username" required onChange={handleChangeUsername}/>
          </div>
          <div className={styles.item}>
            <label htmlFor="email">メールアドレス</label>
            <input className={styles.input} type="email" id="email" name="email" required onChange={handleChangeEmail}/>
          </div>
          <div className={styles.item}>
            <label htmlFor="password">パスワード</label>
            <input className={styles.input} type="password" id="password" name="password" required onChange={handleChangePassword}/>
          </div>
          <div className={styles.item}>
            <label htmlFor="profile-icon">プロフィールアイコン(任意)</label>
            <input type="file" id="profile-icon" name="profile-icon" accept="image/*" onChange={onChangeFile} />
            {file && <img id="preview" src={previewURL} alt="preview" className={styles.preview} width="140" height="140" />}
          </div>
          <div className={styles.item}>
            <label htmlFor="birthday">生年月日</label>
            <input className={styles.input} type="date" id="birthday" name="birthday" required onChange={handleChangeBirthday}/>
          </div>
          <div className={styles.item}>
            <label>性別</label>
              <div>
                <input className={styles.input} type="radio" id="male" name="gender" value="男性" required onChange={handleChangeGender}/>
                <label htmlFor="male">男性</label>
              </div>
              <div>
                <input className={styles.input} type="radio" id="female" name="gender" value="女性" required onChange={handleChangeGender}/>
                <label htmlFor="female">女性</label>
              </div> 
              <div>
                <input className={styles.input} type="radio" id="secret" name="gender" value="秘密" required onChange={handleChangeGender}/>
                <label htmlFor="secret">秘密</label>
              </div>
          </div>
          <div className={styles.item}>
            <div>
              <input className={styles.input} type="checkbox" id="terms-of-service" name="terms-of-service" value="ok" required onChange={handleChangeTermsOfService}/>
              <label htmlFor="terms-of-service">私は<a href='https://menherasenpai.notion.site/457df49475494671807673a0a3346451'>利用規約</a>の全ての項目について同意します</label>
            </div>
          </div>
          { !validation && <p className={styles.error}>※入力していない項目があります</p>}
          { error && <p className={styles.error}>※送信時にエラーが発生しました</p>}
          { weakPassword && <p className={styles.error}>※パスワードは６文字以上の英数字にしてください</p>}
          <button className={styles.button} onClick={handleSubmit}>登録する</button>
        </div>
      </div>
    </div>
  )
}

export default SignupForm;