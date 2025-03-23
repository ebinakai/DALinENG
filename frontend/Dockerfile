FROM node:18-slim AS build-stage

WORKDIR /frontend

# npmを最新バージョンに更新
RUN npm install -g npm@10.8.3

# package.jsonとpackage-lock.jsonを先にコピーし、依存関係をインストール
COPY package*.json ./
RUN npm install

# 残りのソースコードをコピー
COPY . .

# パッケージインストール
RUN npm install

# 環境変数として設定
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

# Viteでビルド
RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /frontend/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
