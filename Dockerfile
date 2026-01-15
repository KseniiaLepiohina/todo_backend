# Етап 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Етап 2: Production
FROM node:20-alpine
WORKDIR /app
# Копіюємо результати збірки та package.json
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Встановлюємо лише необхідні бібліотеки для роботи
RUN npm install --omit=dev

EXPOSE 5000
CMD ["node", "dist/main.js"]