FROM node:20-alpine

WORKDIR /app

# Instalación de dependencias
COPY package*.json ./
RUN npm install

# Copia del código
COPY . .

# Construcción de la aplicación
RUN npm run build

# Servidor estático ligero
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]