FROM node:18

# 作業ディレクトリを設定
WORKDIR /backend

ARG DB_HOST
ARG DB_USER
ARG DB_PASS
ARG DB_NAME
ARG SECRET_KEY

# 環境変数として設定
ENV DB_HOST=${DB_HOST}
ENV DB_USER=${DB_USER}
ENV DB_PASS=${DB_PASS}
ENV DB_NAME=${DB_NAME}
ENV SECRET_KEY=${SECRET_KEY}

# npmを最新バージョンに更新
RUN npm install -g npm@10.8.3

# package.jsonとpackage-lock.jsonを先にコピーし、依存関係をインストール
COPY package*.json ./
RUN npm install

# 残りのソースコードをコピー
COPY . .

# サーバーを起動
CMD ["node", "api_server.js"]
