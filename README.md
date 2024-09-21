# DAL in ENG

英語の勉強のために、デート・ア・ライブのスピンオフ「デート・ア・ライブ・アンコール」の巻頭部分の小説を英訳していました。その英訳結果をまとめるためのホームページです。NodeJSとVueJSで作成しています。

## Demo

https://github.com/EbinaKai/DALinENG/assets/85666313/81346993-a377-44a7-9246-6032b99be7bd


## Setup

Docker-Composeを使用するのでインストールしてください。

### ビルド

環境変数を設定したあとに `docker-compose` を使用してビルドしてください。

```[bash]
cp .env.example .env
nano .env

# ビルド
docker-compose up 
```

### ユーザーの追加

また、新規ユーザを手動で設定します。パスワードはハッシュとして保存するので、コマンドを実行して生成します。

```bash
docker-compose exec backend /bin/bash

$ node api/password_generator.js password_here
ここにハッシュが出る
$ exit

docker-compose exec db mysql -u root -p
Enter password:

mysql> USE dal_in_eng;
mysql> INSERT INTO users (name, password) VALUES ('username_here', 'さっき表示されたハッシュ');
mysql> exit;
```

---

> © 橘公司・つなこ／KADOKAWA
> 当システムのコンテンツ内で使用している画像の著作権その他の知的財産権は、当該作品の提供元に帰属しています。  
> 当システムが掲載している画像等の無断使用・無断転載は固くお断りしております。
