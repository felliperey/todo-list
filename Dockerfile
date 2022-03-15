# Imagem de Origem
FROM node:latest
# Diretório de trabalho(é onde a aplicação ficará dentro do container).
WORKDIR /app
# Adicionando `/app/node_modules/.bin` para o $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV CHOKIDAR_USEPOLLING=true
# Instalando dependências da aplicação e armazenando em cache.
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
# Inicializa a aplicação
CMD ["npm", "start"]