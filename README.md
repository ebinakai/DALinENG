# DAL in ENG

英語の勉強のために、デート・ア・ライブのスピンオフ「デート・ア・ライブ・アンコール」の巻頭部分の小説を英訳していました。その英訳結果をまとめるためのホームページです。NodeJSとVueJSで作成しています。

## setup

NodeJSを使用するのでインストールしてください。

### 依存関係のインストール

必要パッケージのインストールしてください。
また、新規ユーザを追加する機能がまだないので手動で設定します。パスワードはハッシュとして保存するので、コマンドを実行して生成します。

```[bash]
npm install
node api/password_generator.js your_password
```

### テーブルの作成

データベースマネージメントシステムは `'MySQL'` を使ってください。ここでの `password_hash` は先程生成したものです。

```[bash]
mysql -u root -p 
> SOURCE dal_in_eng.sql 
> INSERT INTO users( name, password ) VALUES( 'your_username', 'password_hash' ) ;
```

### 環境変数の設定

また、環境変数も適切に設定してください。

```[bash]
touch .env
echo 'SECRET_KEY="your_secret_key"' >> .env
echo 'DB_HOST="your_db_host"' >> .env
echo 'DB_USER="your_db_user"' >> .env
echo 'DB_PASS="your_db_passwd"' >> .env
echo 'DB_NAME="dal_in_eng"' >> .env
```

### プロジェクトの起動・ビルド

```[bash]
npm run dev     # 開発環境環境での起動
npm run build   # 本番環境用ソースコードをビルド
```

ビルドすると、`/dist`ディレクトリにソースコード群が作成されるので、各自Apacheのドキュメントルートなどに設置してください。

### バックエンドサーバの起動

```[bash]
node api_server.js
```

ログインや英訳結果をDBから持ってくるためのバックエンドサーバを起動します。`express` で作ってあります。
