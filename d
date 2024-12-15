# Usa una imagen oficial de Node.js como base
FROM node:18

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala Git para clonar el repositorio
RUN apt-get update && apt-get install -y git && apt-get clean

# Clona el repositorio dentro del contenedor
RUN git clone https://github.com/[coltonsini]/[hello-insights-test].git .

# Instala las dependencias del proyecto
RUN npm install

# Expone el puerto que Angular usa por defecto (4200)
EXPOSE 4200

# Comando por defecto para ejecutar el servidor de desarrollo de Angular
CMD ["npm", "start"]
