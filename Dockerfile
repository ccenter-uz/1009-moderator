# Указываем базовый образ с Node.js 22.11.0
FROM node:22.11.0-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

ARG VITE_APP_BASE_URL="https://1009.ccenter.uz/"
ARG VITE_APP_VERSION="1.0.0"
ARG VITE_APP_GITHUB_LINK="https://gitlab.ccenter.uz/"
ARG VITE_APP_RELEASES_LINK="https://gitlab.ccenter.uz/"

ENV VITE_APP_BASE_URL=${VITE_APPBASE_URL}
ENV VITE_APP_VERSION=${VITE_APP_VERSION}
ENV VITE_APP_GITHUB_LINK=${VITE_APP_GITHUB_LINK}
ENV VITE_APP_RELEASES_LINK=${VITE_APP_RELEASES_LINK}

# Копируем файл package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем приложение для продакшена
RUN npm run build

# Открываем порт для работы
EXPOSE 3000

# Запускаем приложение с помощью сервера
CMD ["npm", "run", "dev"]
