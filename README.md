# DAL in ENG

英語の勉強のために、デート・ア・ライブのスピンオフ「デート・ア・ライブ・アンコール」の巻頭部分の小説を英訳していました。その英訳結果をまとめるためのホームページです。NodeJSとVueJSで作成しています。

## Demo

https://github.com/EbinaKai/DALinENG/assets/85666313/81346993-a377-44a7-9246-6032b99be7bd


## Setup

Docker-Composeを使用するのでインストールしてください。

### デプロイ

```[bash]
# ビルド
docker build -t registry.kb/datealive/frontend:1.0.5 ./frontend --build-arg VITE_BACKEND_URL=/api
docker build ./backend -t registry.kb/datealive/backend:1.0.4

# プッシュ
docker push registry.kb/datealive/frontend:1.0.5
docker push registry.kb/datealive/backend:1.0.4

# デプロイ
kubectl apply -k ./k8s
```

### ユーザーの追加

また、新規ユーザを手動で設定します。パスワードはハッシュとして保存するので、コマンドを実行して生成します。

```bash
# ここをnodeを使用してマウントとrunコマンドでの実行方法に変更
docker run --rm -it datealive/backend:1.0.0 /bin/bash
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
