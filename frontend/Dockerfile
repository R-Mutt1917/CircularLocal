# ----------- Build stage -----------
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# ----------- Runtime stage -----------
FROM nginx:alpine

# Limpiar contenido default
RUN rm -rf /usr/share/nginx/html/*

# Copiar build de Angular
COPY --from=build /app/dist/*/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]