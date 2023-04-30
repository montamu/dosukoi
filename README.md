### このアプリで使っている技術の説明
React(Typescript)とFirebaseを使って作ったアプリです。

CSSはCSS Modulesを使っています。

バージョン管理にはGit(Github)を使っています。

ホスティングはFirebase Hostingを使用しています。

[NewsAPI](https://newsapi.org/s/japan-news-api)から日本国内のニュース（無料版のため１日遅れ）を取得して表示しています。

### このアプリに実装されている機能（実装予定のものも含む）
* ユーザーの新規登録、ログイン  
（Firebase Authで実装済み）  
（メールアドレス認証方式を現在採用、Google,Twitter認証も検討中）
* ユーザーのプロフィール情報（生年月日、性別、プロフィール画像）  
（Firestore, Storageで実装済み）
* 国内ニュースを表示  
（Firebase Functionsで実装済み）
* ユーザーが気になるキーワードに関連するニュースだけを表示  
(未実装)
