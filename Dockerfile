# Usa una imagen base con Node.js para construir la aplicación
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Usa una imagen base de Nginx para servir la aplicación
FROM nginx:alpine

# Copia los archivos construidos al directorio de Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copia el archivo de configuración de Nginx
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 1000
CMD ["nginx", "-g", "daemon off;"]
