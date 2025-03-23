FROM node:18-slim

# 作業ディレクトリを設定
WORKDIR /backend

# npmを最新バージョンに更新
RUN npm install -g npm@10.8.3

# package.jsonとpackage-lock.jsonを先にコピーし、依存関係をインストール
COPY package*.json ./
RUN npm install

# 残りのソースコードをコピー
COPY . .

# サーバーを起動
CMD ["node", "api_server.js"]
