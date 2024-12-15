# Usa una imagen oficial de Node.js como base
FROM node:lts

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia únicamente los archivos necesarios para instalar las dependencias
COPY package*.json ./

# Elimina node_modules y package-lock.json si existen
RUN rm -rf node_modules package-lock.json

# Instala las dependencias necesarias
RUN npm install --omit=optional

# Instala Angular CLI globalmente
RUN npm install -g @angular/cli

# Copia el resto del proyecto después de instalar las dependencias
COPY . .

# Ejecuta npm install nuevamente para asegurar que todas las dependencias estén instaladas correctamente
RUN npm install

# Expone el puerto que Angular usa por defecto (4200)
EXPOSE 4200

# Comando por defecto para ejecutar el servidor de desarrollo de Angular
CMD ["npm", "start"]