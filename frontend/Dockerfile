FROM node:18 AS build-stage

WORKDIR /frontend

ARG VITE_BACKEND_URL
ARG VITE_DASHBOARD_URL

# 環境変数として設定
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_DASHBOARD_URL=${VITE_DASHBOARD_URL}

# npmを最新バージョンに更新
RUN npm install -g npm@10.8.3

# package.jsonとpackage-lock.jsonを先にコピーし、依存関係をインストール
COPY package*.json ./
RUN npm install

# 残りのソースコードをコピー
COPY . .

# パッケージインストール
RUN npm install

# Viteでビルド
RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /frontend/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
