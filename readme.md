### E-Klaim Web Service

Launch dev environment

```
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

and for prod environment

```
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Global Environment

```
# Environment Configuration
NODE_PORT=9007
API_KEY=

# E-Klaim Configuration
EKLAIM_DEBUG=false
EKLAIM_URI=http://{ip_eklaim}/E-Klaim/ws.php
EKLAIM_ENCRYPTION_KEY=
```
Dockerfile

```
# Dockerfile
# Pull official Node.js image from Docker Hub
FROM node:18.20.5-alpine

# Create app directory
RUN mkdir -p /usr/src/eklaim-ws && chown -R node:node /usr/src/eklaim-ws
WORKDIR /usr/src/eklaim-ws

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY .env ./

RUN npm install
RUN npm install pm2 -g
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

USER node

# Run "server" script in package.json
ENTRYPOINT [ "npm", "run" ]
```

docker-compose.yml

```
version: '3.3'
services:
  webservice:
    build:
      context: .
      dockerfile: Dockerfile
```

docker-compose.dev.yml

```
version: '3.3'
services:
  webservice:
    hostname: server-dev
    image: eklaim-ws-dev:1.0.0
    container_name: eklaim-rest-dev
    restart: always
    env_file: .env
    ports:
      - '${NODE_PORT}:${NODE_PORT}'
    volumes:
      - .:/usr/src/eklaim-ws # named volume
      - /usr/src/eklaim-ws/node_modules # anonymous volume for node_modules only
    networks:
      - app-network
    command: dev

networks:
  app-network:
    driver: bridge

volumes:
  node_modules:
```

docker-compose.prod.yml

```
version: '3.3'
services:
  webservice:
    hostname: server-prod
    image: eklaim-ws-prod:1.0.0
    container_name: eklaim-rest-prod
    restart: always
    env_file: .env
    ports:
      - '${NODE_PORT}:${NODE_PORT}'
    volumes:
      - .:/usr/src/eklaim-ws # named volume
      - /usr/src/eklaim-ws/node_modules # anonymous volume for node_modules only
    networks:
      - app-network
    command: prod

networks:
  app-network:
    driver: bridge

volumes:
  node_modules:
```