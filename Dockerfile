FROM node:22

RUN mkdir /nexus

WORKDIR /nexus

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 3000

ENTRYPOINT [ "node", ".output/server/index.mjs" ]
