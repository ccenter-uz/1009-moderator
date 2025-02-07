# Указываем базовый образ с Node.js 22.11.0
FROM node:22.11.0-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем файл package.json и package-lock.json (если есть)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все файлы проекта в контейнер
COPY . .

# Собираем приложение для продакшена
RUN npm run build

# Устанавливаем HTTP-сервер для обслуживания собранного React-приложения
RUN npm install -g serve

# Открываем порт для работы
EXPOSE 3000

# Запускаем приложение с помощью сервера
CMD ["serve", "-s", "build"]
